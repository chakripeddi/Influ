
import { z } from 'zod';

export const campaignFormSchema = z.object({
  title: z.string().min(5, { message: "Campaign title must be at least 5 characters" }),
  type: z.string().min(1, { message: "Please select a campaign type" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  media: z.array(z.any()).optional(),
  
  // Target Audience
  regions: z.array(z.string()).min(1, { message: "Please select at least one region" }),
  ageRange: z.array(z.number()).length(2).default([18, 65]),
  interests: z.array(z.string()).min(1, { message: "Please select at least one interest" }),
  
  // Platform Selection
  platforms: z.array(z.string()).min(1, { message: "Please select at least one platform" }),
  contentTypes: z.array(z.string()).min(1, { message: "Please select at least one content type" }),
  
  // Influencer Criteria
  minFollowers: z.number().min(500, { message: "Minimum followers must be at least 500" }).default(1000),
  engagementRate: z.number().min(0).max(100).default(2),
  preferPastCollaborators: z.boolean().default(false),
  
  // Deliverables & Timeline
  numDeliverables: z.number().min(1, { message: "Number of posts must be at least 1" }).default(1),
  dateRange: z.object({
    from: z.date(),
    to: z.date()
  }),
  requirePreapproval: z.boolean().default(true),
  
  // Budget & Compensation
  budget: z.number().min(1, { message: "Budget must be greater than 0" }),
  payoutModel: z.string().min(1, { message: "Please select a payout model" }),
  paymentTerms: z.string().min(1, { message: "Please select payment terms" }),
  
  // Referral System
  enableReferral: z.boolean().default(false),
  referralReward: z.number().optional(),
  
  // AI-Powered Assistance
  enableAiMatching: z.boolean().default(true),
  optimizationFocus: z.string().default("engagement"),
  
  // Compliance
  termsFile: z.array(z.any()).optional(),
  requireNda: z.boolean().default(false),
});

export type CampaignFormValues = z.infer<typeof campaignFormSchema>;
