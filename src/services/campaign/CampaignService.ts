import { supabase } from '@/integrations/supabase/client';
import { Campaign, CampaignStatus, CampaignCreateInput, CampaignUpdateInput, CampaignCategory, CampaignPlatform } from '@/types/campaign';
import { AppError } from '@/utils/errors';
import { UserRole } from '@/types/user';
import Redis from 'ioredis';
import { Database } from '@/integrations/supabase/types';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

type CampaignDetails = Database['public']['Tables']['campaign_details']['Row'];
type BrandProfile = Database['public']['Tables']['brand_profiles']['Row'];
type DateRange = { start: string; end: string };

export class CampaignService {
  private static instance: CampaignService;

  private constructor() {
    // Initialize any other necessary properties
  }

  public static getInstance(): CampaignService {
    if (!CampaignService.instance) {
      CampaignService.instance = new CampaignService();
    }
    return CampaignService.instance;
  }

  /**
   * Create a new campaign
   */
  async createCampaign(input: {
    title: string;
    description: string;
    budget: number;
    platforms: CampaignPlatform[];
    campaign_type: string;
    category: CampaignCategory;
    brand_id: string;
    target_audience: {
      age_range: number[];
      interests: string[];
      regions: string[];
    };
    deadline: string;
  }): Promise<Campaign> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new AppError('Unauthorized', 401);

    await this.checkUserPermissions(user.id);

    const { data, error } = await supabase
      .from('campaign_details')
      .insert({
        title: input.title,
        description: input.description,
        budget: input.budget,
        platforms: input.platforms,
        type: input.campaign_type,
        category: input.category,
        brand_id: input.brand_id,
        age_range: input.target_audience.age_range,
        interests: input.target_audience.interests,
        regions: input.target_audience.regions,
        deadline: input.deadline,
        status: CampaignStatus.DRAFT,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        content_types: [],
        date_range: { start: new Date().toISOString(), end: input.deadline },
        payment_terms: 'NET30',
        payout_model: 'FIXED',
        num_deliverables: 1,
        enable_ai_matching: true,
        enable_referral: false,
        require_nda: false,
        require_preapproval: false,
        optimization_focus: 'ENGAGEMENT'
      })
      .select('*, brand_profiles(*)')
      .single();

    if (error) throw new AppError(error.message, 400);
    return this.mapCampaignDetailsToCampaign(data);
  }

  /**
   * Update an existing campaign
   */
  async updateCampaign(id: string, input: Partial<Campaign>): Promise<Campaign> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new AppError('Unauthorized', 401);

    await this.checkCampaignAccess(id);

    const { data, error } = await supabase
      .from('campaign_details')
      .update({
        title: input.title,
        description: input.description,
        budget: input.budget,
        platforms: input.platforms,
        type: input.campaign_type,
        category: input.category,
        status: input.status,
        content_types: input.deliverables,
        require_preapproval: input.urgent,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select('*, brand_profiles(*)')
      .single();

    if (error) throw new AppError(error.message, 400);
    return this.mapCampaignDetailsToCampaign(data);
  }

  /**
   * Get campaign by ID
   */
  async getCampaign(id: string): Promise<Campaign> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new AppError('Unauthorized', 401);

    const { data, error } = await supabase
      .from('campaign_details')
      .select('*, brand_profiles(*)')
      .eq('id', id)
      .single();

    if (error) throw new AppError(error.message, 400);
    if (!data) throw new AppError('Campaign not found', 404);

    return this.mapCampaignDetailsToCampaign(data);
  }

  /**
   * List campaigns with advanced filtering, sorting, and pagination
   */
  async listCampaigns(params: {
    status?: CampaignStatus;
    category?: CampaignCategory;
    platform?: CampaignPlatform;
    minBudget?: number;
    maxBudget?: number;
    targetAudience?: {
      ageRange?: number[];
      interests?: string[];
      regions?: string[];
    };
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }): Promise<{ data: Campaign[]; total: number; hasMore: boolean }> {
    const {
      status,
      category,
      platform,
      minBudget,
      maxBudget,
      targetAudience,
      search,
      sortBy = 'created_at',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = params;

    const cacheKey = `campaigns:${JSON.stringify(params)}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new AppError('Unauthorized', 401);

    await this.checkUserPermissions(user.id);

    let query: any = supabase
      .from('campaign_details')
      .select('*, brand_profiles(*)', { count: 'exact' });

    if (status) query = query.eq('status', status);
    if (category) query = query.eq('category', category);
    if (platform) query = query.contains('platforms', [platform]);
    if (minBudget) query = query.gte('budget', minBudget);
    if (maxBudget) query = query.lte('budget', maxBudget);
    if (targetAudience?.ageRange) query = query.overlaps('age_range', targetAudience.ageRange);
    if (targetAudience?.interests) query = query.overlaps('interests', targetAudience.interests);
    if (targetAudience?.regions) query = query.overlaps('regions', targetAudience.regions);
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const offset = (page - 1) * limit;
    query = query
      .order(sortBy, { ascending: sortOrder === 'asc' })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw new AppError(error.message, 400);

    const campaigns = data.map(this.mapCampaignDetailsToCampaign);
    const result = {
      data: campaigns,
      total: count || 0,
      hasMore: (offset + limit) < (count || 0)
    };

    await redis.setex(cacheKey, 300, JSON.stringify(result)); // Cache for 5 minutes
    return result;
  }

  /**
   * Update campaign status
   */
  async updateCampaignStatus(
    campaignId: string,
    status: CampaignStatus,
    userId: string
  ): Promise<Campaign> {
    try {
      // Check campaign ownership and permissions
      await this.checkCampaignAccess(campaignId);

      // Validate status transition
      await this.validateStatusTransition(campaignId, status);

      const { data, error } = await supabase
        .from('campaign_details')
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', campaignId)
        .select()
        .single();

      if (error) throw new AppError('Failed to update campaign status', error);
      return this.mapCampaignDetailsToCampaign(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete a campaign
   */
  async deleteCampaign(campaignId: string, userId: string): Promise<void> {
    try {
      // Check campaign ownership and permissions
      await this.checkCampaignAccess(campaignId);

      const { error } = await supabase
        .from('campaign_details')
        .delete()
        .eq('id', campaignId);

      if (error) throw new AppError('Failed to delete campaign', error);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get campaign recommendations for an influencer
   */
  async getRecommendations(influencerId: string): Promise<Campaign[]> {
    const cacheKey = `campaign_recommendations:${influencerId}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new AppError('Unauthorized', 401);

    await this.checkUserPermissions(user.id);

    const { data: influencer } = await supabase
      .from('influencer_profiles')
      .select('*')
      .eq('id', influencerId)
      .single();

    if (!influencer) throw new AppError('Influencer not found', 404);

    const { data, error } = await supabase
      .from('campaign_details')
      .select('*, brand_profiles(*)')
      .eq('status', CampaignStatus.ACTIVE)
      .overlaps('interests', influencer.categories || [])
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw new AppError(error.message, 400);

    const campaigns = data.map(this.mapCampaignDetailsToCampaign);
    await redis.setex(cacheKey, 3600, JSON.stringify(campaigns)); // Cache for 1 hour
    return campaigns;
  }

  // Private helper methods

  private async checkUserPermissions(userId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new AppError('Unauthorized', 401);
  }

  private async checkCampaignAccess(campaignId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new AppError('Unauthorized', 401);

    const { data: campaign, error } = await supabase
      .from('campaign_details')
      .select('brand_id')
      .eq('id', campaignId)
      .single();

    if (error || !campaign) {
      throw new AppError('Campaign not found', 404);
    }
  }

  private async validateStatusTransition(
    campaignId: string,
    newStatus: CampaignStatus
  ): Promise<void> {
    const { data: campaign } = await supabase
      .from('campaign_details')
      .select('status')
      .eq('id', campaignId)
      .single();

    if (!campaign) throw new AppError('Campaign not found', { statusCode: 404 });

    const validTransitions: Record<CampaignStatus, CampaignStatus[]> = {
      [CampaignStatus.DRAFT]: [CampaignStatus.PUBLISHED],
      [CampaignStatus.PUBLISHED]: [CampaignStatus.ACTIVE, CampaignStatus.ARCHIVED],
      [CampaignStatus.ACTIVE]: [CampaignStatus.COMPLETED, CampaignStatus.ARCHIVED],
      [CampaignStatus.COMPLETED]: [CampaignStatus.ARCHIVED],
      [CampaignStatus.ARCHIVED]: [],
    };

    if (!validTransitions[campaign.status].includes(newStatus)) {
      throw new AppError('Invalid status transition', { statusCode: 400 });
    }
  }

  private validateCampaignInput(input: CampaignCreateInput): void {
    if (!input.title) throw new AppError('Title is required', { statusCode: 400 });
    if (!input.description) throw new AppError('Description is required', { statusCode: 400 });
    if (!input.budget) throw new AppError('Budget is required', { statusCode: 400 });
    if (!input.category) throw new AppError('Category is required', { statusCode: 400 });
    if (!input.platforms || input.platforms.length === 0) {
      throw new AppError('At least one platform is required', { statusCode: 400 });
    }
  }

  private validateCampaignUpdate(input: CampaignUpdateInput): void {
    if (input.title && input.title.length < 3) {
      throw new AppError('Title must be at least 3 characters long', { statusCode: 400 });
    }
    if (input.budget && input.budget <= 0) {
      throw new AppError('Budget must be greater than 0', { statusCode: 400 });
    }
  }

  private handleError(error: any): Error {
    console.error('CampaignService Error:', error);
    return new AppError(
      error.message || 'An error occurred in the campaign service',
      error.status || 500
    );
  }

  private mapCampaignDetailsToCampaign(details: CampaignDetails & { brand_profiles?: BrandProfile | null }): Campaign {
    const brand = details.brand_profiles || {};
    const dateRange = details.date_range as DateRange;
    return {
      id: details.id,
      title: details.title,
      description: details.description,
      detailed_description: details.description,
      budget: details.budget,
      platforms: details.platforms.map(p => p as CampaignPlatform),
      campaign_type: details.type,
      category: CampaignCategory.OTHER, // Default to OTHER if not matching
      status: details.status as CampaignStatus,
      deadline: dateRange?.end || new Date(details.created_at || '').toISOString(),
      deliverables: details.content_types || [],
      brand: (brand as BrandProfile)?.business_name || '',
      brand_logo: (brand as BrandProfile)?.logo_url || undefined,
      created_at: details.created_at || undefined,
      updated_at: details.updated_at || undefined,
      requirements: details.interests || [],
      urgent: details.require_preapproval || false,
      created_by: details.brand_id,
      brand_id: details.brand_id
    };
  }
} 