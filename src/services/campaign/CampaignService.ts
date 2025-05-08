import { supabase } from '@/integrations/supabase/client';
import { Campaign, CampaignStatus, CampaignCreateInput, CampaignUpdateInput } from '@/types/campaign';
import { AppError } from '@/utils/errors';
import { UserRole } from '@/types/user';

export class CampaignService {
  private static instance: CampaignService;

  private constructor() {}

  public static getInstance(): CampaignService {
    if (!CampaignService.instance) {
      CampaignService.instance = new CampaignService();
    }
    return CampaignService.instance;
  }

  /**
   * Create a new campaign
   */
  async createCampaign(input: CampaignCreateInput, userId: string): Promise<Campaign> {
    try {
      // Validate input
      this.validateCampaignInput(input);

      // Check user permissions
      await this.checkUserPermissions(userId, UserRole.BRAND);

      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          ...input,
          status: CampaignStatus.DRAFT,
          created_by: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw new AppError('Failed to create campaign', error);
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update an existing campaign
   */
  async updateCampaign(
    campaignId: string,
    input: CampaignUpdateInput,
    userId: string
  ): Promise<Campaign> {
    try {
      // Validate input
      this.validateCampaignUpdate(input);

      // Check campaign ownership and permissions
      await this.checkCampaignAccess(campaignId, userId);

      const { data, error } = await supabase
        .from('campaigns')
        .update({
          ...input,
          updated_at: new Date().toISOString(),
        })
        .eq('id', campaignId)
        .select()
        .single();

      if (error) throw new AppError('Failed to update campaign', error);
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get campaign by ID
   */
  async getCampaign(campaignId: string, userId: string): Promise<Campaign> {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*, brand:brands(*), applications(*)')
        .eq('id', campaignId)
        .single();

      if (error) throw new AppError('Failed to fetch campaign', error);
      if (!data) throw new AppError('Campaign not found', { statusCode: 404 });

      // Check access permissions
      await this.checkCampaignAccess(campaignId, userId);

      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * List campaigns with filtering and pagination
   */
  async listCampaigns(
    filters: {
      status?: CampaignStatus;
      brandId?: string;
      category?: string;
      search?: string;
    },
    pagination: {
      page: number;
      limit: number;
    },
    userId: string
  ): Promise<{ data: Campaign[]; total: number }> {
    try {
      let query = supabase
        .from('campaigns')
        .select('*, brand:brands(*)', { count: 'exact' });

      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.brandId) {
        query = query.eq('brand_id', filters.brandId);
      }
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      if (filters.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }

      // Apply pagination
      const from = (pagination.page - 1) * pagination.limit;
      const to = from + pagination.limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw new AppError('Failed to fetch campaigns', error);
      return { data: data || [], total: count || 0 };
    } catch (error) {
      throw this.handleError(error);
    }
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
      await this.checkCampaignAccess(campaignId, userId);

      // Validate status transition
      await this.validateStatusTransition(campaignId, status);

      const { data, error } = await supabase
        .from('campaigns')
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', campaignId)
        .select()
        .single();

      if (error) throw new AppError('Failed to update campaign status', error);
      return data;
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
      await this.checkCampaignAccess(campaignId, userId);

      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', campaignId);

      if (error) throw new AppError('Failed to delete campaign', error);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Private helper methods

  private async checkUserPermissions(userId: string, requiredRole: UserRole): Promise<void> {
    const { data: user, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) throw new AppError('Failed to check user permissions', error);
    if (!user || user.role !== requiredRole) {
      throw new AppError('Insufficient permissions', { statusCode: 403 });
    }
  }

  private async checkCampaignAccess(campaignId: string, userId: string): Promise<void> {
    const { data: campaign, error } = await supabase
      .from('campaigns')
      .select('created_by, brand_id')
      .eq('id', campaignId)
      .single();

    if (error) throw new AppError('Failed to check campaign access', error);
    if (!campaign) throw new AppError('Campaign not found', { statusCode: 404 });

    // Check if user is the creator or has admin role
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (!user) throw new AppError('User not found', { statusCode: 404 });

    if (user.role === UserRole.ADMIN) return;
    if (campaign.created_by === userId) return;

    throw new AppError('Insufficient permissions', { statusCode: 403 });
  }

  private async validateStatusTransition(
    campaignId: string,
    newStatus: CampaignStatus
  ): Promise<void> {
    const { data: campaign } = await supabase
      .from('campaigns')
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
    if (error instanceof AppError) return error;
    return new AppError('An unexpected error occurred', error);
  }
} 