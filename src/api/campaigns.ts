import { Router } from 'express';
import { CampaignService } from '@/services/campaign/CampaignService';
import { authenticate } from '@/middleware/auth';
import { validateRequest } from '@/middleware/validation';
import { z } from 'zod';
import { CampaignStatus, CampaignCategory } from '@/types/campaign';
import { AppError } from '@/utils/errors';
import { rateLimit } from '@/middleware/rateLimit';

const router = Router();
const campaignService = CampaignService.getInstance();

// Validation schemas
const createCampaignSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  budget: z.number().positive(),
  platforms: z.array(z.string()),
  campaign_type: z.string(),
  category: z.nativeEnum(CampaignCategory),
  brand_id: z.string().uuid(),
  target_audience: z.object({
    regions: z.array(z.string()),
    age_range: z.string(),
    language: z.string(),
    interests: z.array(z.string()).optional(),
  }),
  deadline: z.string().datetime(),
});

const updateCampaignSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(1000).optional(),
  budget: z.number().positive().optional(),
  platforms: z.array(z.string()).optional(),
  campaign_type: z.string().optional(),
  category: z.nativeEnum(CampaignCategory).optional(),
  target_audience: z.object({
    regions: z.array(z.string()),
    age_range: z.string(),
    language: z.string(),
    interests: z.array(z.string()).optional(),
  }).optional(),
  deadline: z.string().datetime().optional(),
});

const campaignFiltersSchema = z.object({
  status: z.nativeEnum(CampaignStatus).optional(),
  category: z.nativeEnum(CampaignCategory).optional(),
  platform: z.array(z.string()).optional(),
  minBudget: z.number().positive().optional(),
  maxBudget: z.number().positive().optional(),
  targetAudience: z.object({
    regions: z.array(z.string()).optional(),
    ageRange: z.string().optional(),
    language: z.string().optional(),
  }).optional(),
  search: z.string().optional(),
  sortBy: z.enum(['created_at', 'budget', 'deadline', 'ai_score']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

// Create campaign
router.post(
  '/',
  authenticate,
  rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }), // 10 requests per 15 minutes
  validateRequest({ body: createCampaignSchema }),
  async (req, res, next) => {
    try {
      const campaign = await campaignService.createCampaign(req.body, req.user.id);
      res.status(201).json(campaign);
    } catch (error) {
      next(error);
    }
  }
);

// List campaigns with advanced filtering
router.get(
  '/',
  authenticate,
  rateLimit({ windowMs: 60 * 1000, max: 30 }), // 30 requests per minute
  validateRequest({ query: campaignFiltersSchema }),
  async (req, res, next) => {
    try {
      const { page = 1, limit = 10, ...filters } = req.query;
      const result = await campaignService.listCampaigns(
        filters,
        { page: Number(page), limit: Number(limit) },
        req.user.id
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

// Get campaign recommendations for influencer
router.get(
  '/recommendations',
  authenticate,
  rateLimit({ windowMs: 60 * 1000, max: 20 }), // 20 requests per minute
  async (req, res, next) => {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const recommendations = await campaignService.getRecommendations(
        req.user.id,
        limit
      );
      res.json(recommendations);
    } catch (error) {
      next(error);
    }
  }
);

// Get campaign by ID
router.get(
  '/:id',
  authenticate,
  rateLimit({ windowMs: 60 * 1000, max: 30 }), // 30 requests per minute
  async (req, res, next) => {
    try {
      const campaign = await campaignService.getCampaignById(req.params.id);
      if (!campaign) {
        throw new AppError('Campaign not found', 404);
      }
      res.json(campaign);
    } catch (error) {
      next(error);
    }
  }
);

// Update campaign
router.patch(
  '/:id',
  authenticate,
  rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }), // 10 requests per 15 minutes
  validateRequest({ body: updateCampaignSchema }),
  async (req, res, next) => {
    try {
      const campaign = await campaignService.updateCampaign(
        req.params.id,
        req.body,
        req.user.id
      );
      res.json(campaign);
    } catch (error) {
      next(error);
    }
  }
);

// Delete campaign
router.delete(
  '/:id',
  authenticate,
  rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }), // 5 requests per 15 minutes
  async (req, res, next) => {
    try {
      await campaignService.deleteCampaign(req.params.id, req.user.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

// Error handling middleware
router.use((error: Error, req: any, res: any, next: any) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
      details: error.details,
    });
  }

  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
  });
});

export default router; 