import { CampaignService } from '../CampaignService';
import { CampaignStatus, CampaignPlatform, CampaignCategory } from '@/types/campaign';
import { UserRole } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';
import { AppError } from '@/utils/errors';

// Mock Supabase client
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      select: jest.fn(),
      eq: jest.fn(),
      single: jest.fn(),
      range: jest.fn(),
      ilike: jest.fn(),
    })),
  },
}));

describe('CampaignService', () => {
  let campaignService: CampaignService;
  const mockUserId = 'user-123';
  const mockCampaignId = 'campaign-123';

  beforeEach(() => {
    campaignService = CampaignService.getInstance();
    jest.clearAllMocks();
  });

  describe('createCampaign', () => {
    const validInput = {
      title: 'Test Campaign',
      description: 'Test Description',
      budget: 1000,
      platforms: [CampaignPlatform.INSTAGRAM],
      campaign_type: 'Product Review',
      category: CampaignCategory.FASHION,
      brand_id: 'brand-123',
    };

    it('should create a campaign successfully', async () => {
      const mockCampaign = { ...validInput, id: mockCampaignId, status: CampaignStatus.DRAFT };
      (supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockCampaign, error: null }),
      });

      const result = await campaignService.createCampaign(validInput, mockUserId);
      expect(result).toEqual(mockCampaign);
    });

    it('should throw error for invalid input', async () => {
      const invalidInput = { ...validInput, title: '' };
      await expect(campaignService.createCampaign(invalidInput, mockUserId)).rejects.toThrow(AppError);
    });
  });

  describe('updateCampaign', () => {
    const updateInput = {
      title: 'Updated Campaign',
      budget: 2000,
    };

    it('should update a campaign successfully', async () => {
      const mockUpdatedCampaign = { id: mockCampaignId, ...updateInput };
      (supabase.from as jest.Mock).mockReturnValue({
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockUpdatedCampaign, error: null }),
      });

      const result = await campaignService.updateCampaign(mockCampaignId, updateInput, mockUserId);
      expect(result).toEqual(mockUpdatedCampaign);
    });

    it('should throw error for invalid update input', async () => {
      const invalidInput = { budget: -100 };
      await expect(
        campaignService.updateCampaign(mockCampaignId, invalidInput, mockUserId)
      ).rejects.toThrow(AppError);
    });
  });

  describe('getCampaign', () => {
    it('should get a campaign successfully', async () => {
      const mockCampaign = {
        id: mockCampaignId,
        title: 'Test Campaign',
        status: CampaignStatus.ACTIVE,
      };
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockCampaign, error: null }),
      });

      const result = await campaignService.getCampaign(mockCampaignId, mockUserId);
      expect(result).toEqual(mockCampaign);
    });

    it('should throw error when campaign not found', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: null }),
      });

      await expect(campaignService.getCampaign(mockCampaignId, mockUserId)).rejects.toThrow(AppError);
    });
  });

  describe('listCampaigns', () => {
    const filters = {
      status: CampaignStatus.ACTIVE,
      category: CampaignCategory.FASHION,
    };
    const pagination = { page: 1, limit: 10 };

    it('should list campaigns successfully', async () => {
      const mockCampaigns = [
        { id: 'campaign-1', title: 'Campaign 1' },
        { id: 'campaign-2', title: 'Campaign 2' },
      ];
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        range: jest.fn().mockReturnThis(),
        ilike: jest.fn().mockReturnThis(),
        count: jest.fn().mockResolvedValue({
          data: mockCampaigns,
          error: null,
          count: mockCampaigns.length,
        }),
      });

      const result = await campaignService.listCampaigns(filters, pagination, mockUserId);
      expect(result.data).toEqual(mockCampaigns);
      expect(result.total).toBe(mockCampaigns.length);
    });
  });

  describe('updateCampaignStatus', () => {
    it('should update campaign status successfully', async () => {
      const newStatus = CampaignStatus.ACTIVE;
      const mockUpdatedCampaign = { id: mockCampaignId, status: newStatus };
      (supabase.from as jest.Mock).mockReturnValue({
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockUpdatedCampaign, error: null }),
      });

      const result = await campaignService.updateCampaignStatus(mockCampaignId, newStatus, mockUserId);
      expect(result.status).toBe(newStatus);
    });

    it('should throw error for invalid status transition', async () => {
      const invalidStatus = CampaignStatus.ARCHIVED;
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: { status: CampaignStatus.DRAFT },
          error: null,
        }),
      });

      await expect(
        campaignService.updateCampaignStatus(mockCampaignId, invalidStatus, mockUserId)
      ).rejects.toThrow(AppError);
    });
  });

  describe('deleteCampaign', () => {
    it('should delete a campaign successfully', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      });

      await expect(campaignService.deleteCampaign(mockCampaignId, mockUserId)).resolves.not.toThrow();
    });

    it('should throw error when deletion fails', async () => {
      (supabase.from as jest.Mock).mockReturnValue({
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: new Error('Deletion failed') }),
      });

      await expect(campaignService.deleteCampaign(mockCampaignId, mockUserId)).rejects.toThrow(AppError);
    });
  });
}); 