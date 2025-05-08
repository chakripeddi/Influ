export enum CampaignStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

export enum CampaignPlatform {
  INSTAGRAM = 'INSTAGRAM',
  YOUTUBE = 'YOUTUBE',
  FACEBOOK = 'FACEBOOK',
  TIKTOK = 'TIKTOK',
  TWITTER = 'TWITTER'
}

export enum CampaignCategory {
  FASHION = 'FASHION',
  BEAUTY = 'BEAUTY',
  LIFESTYLE = 'LIFESTYLE',
  TECHNOLOGY = 'TECHNOLOGY',
  FOOD = 'FOOD',
  TRAVEL = 'TRAVEL',
  FITNESS = 'FITNESS',
  EDUCATION = 'EDUCATION',
  OTHER = 'OTHER'
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  detailed_description?: string;
  budget: number;
  rate_per_post?: number;
  platforms: CampaignPlatform[];
  campaign_type: string;
  category: CampaignCategory;
  status: CampaignStatus;
  deadline?: string;
  urgent: boolean;
  created_by: string;
  brand_id: string;
  created_at: string;
  updated_at: string;
  brand?: Brand;
  applications?: CampaignApplication[];
}

export interface Brand {
  id: string;
  name: string;
  logo_url?: string;
  description?: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

export interface CampaignApplication {
  id: string;
  campaign_id: string;
  influencer_id: string;
  status: ApplicationStatus;
  pitch?: string;
  created_at: string;
  updated_at: string;
  influencer?: Influencer;
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN'
}

export interface Influencer {
  id: string;
  user_id: string;
  name: string;
  bio?: string;
  profile_image_url?: string;
  social_media_links?: {
    instagram?: string;
    youtube?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CampaignCreateInput {
  title: string;
  description: string;
  detailed_description?: string;
  budget: number;
  rate_per_post?: number;
  platforms: CampaignPlatform[];
  campaign_type: string;
  category: CampaignCategory;
  deadline?: string;
  urgent?: boolean;
  brand_id: string;
}

export interface CampaignUpdateInput {
  title?: string;
  description?: string;
  detailed_description?: string;
  budget?: number;
  rate_per_post?: number;
  platforms?: CampaignPlatform[];
  campaign_type?: string;
  category?: CampaignCategory;
  deadline?: string;
  urgent?: boolean;
  status?: CampaignStatus;
}

export interface CampaignFilters {
  status?: CampaignStatus;
  brandId?: string;
  category?: CampaignCategory;
  platform?: CampaignPlatform;
  search?: string;
  minBudget?: number;
  maxBudget?: number;
  urgent?: boolean;
}

export interface CampaignPagination {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} 