import { Router } from 'express';
import { CampaignService } from '@/services/campaign/CampaignService';
import { authenticate } from '@/middleware/auth';
import { validateRequest } from '@/middleware/validation';
import { z } from 'zod';
import { CampaignStatus, CampaignCategory } from '@/types/campaign';
import { AppError } from '@/utils/errors';

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
});

const updateCampaignSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(1000).optional(),
  budget: z.number().positive().optional(),
  platforms: z.array(z.string()).optional(),
  campaign_type: z.string().optional(),
  category: z.nativeEnum(CampaignCategory).optional(),
});

const campaignFiltersSchema = z.object({
  status: z.nativeEnum(CampaignStatus).optional(),
  category: z.nativeEnum(CampaignCategory).optional(),
  search: z.string().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

// Create campaign
router.post(
  '/',
  authenticate,
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

// Update campaign
router.patch(
  '/:id',
  authenticate,
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

// Get campaign
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const campaign = await campaignService.getCampaign(req.params.id, req.user.id);
    res.json(campaign);
  } catch (error) {
    next(error);
  }
});

// List campaigns
router.get(
  '/',
  authenticate,
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

// Update campaign status
router.patch(
  '/:id/status',
  authenticate,
  validateRequest({
    body: z.object({
      status: z.nativeEnum(CampaignStatus),
    }),
  }),
  async (req, res, next) => {
    try {
      const campaign = await campaignService.updateCampaignStatus(
        req.params.id,
        req.body.status,
        req.user.id
      );
      res.json(campaign);
    } catch (error) {
      next(error);
    }
  }
);

// Delete campaign
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    await campaignService.deleteCampaign(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

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