
-- This file contains schema for Supabase tables related to the referral system
-- This can be executed in the Supabase SQL editor

-- Table for storing user referral codes
CREATE TABLE public.user_referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL UNIQUE,
  brand_referral_code TEXT UNIQUE,
  influencer_referral_code TEXT UNIQUE,
  referrals_count INTEGER DEFAULT 0,
  brand_referrals_count INTEGER DEFAULT 0,
  influencer_referrals_count INTEGER DEFAULT 0,
  points_earned INTEGER DEFAULT 0,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Table for tracking individual referrals
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID NOT NULL REFERENCES auth.users(id),
  referred_id UUID NOT NULL REFERENCES auth.users(id),
  referral_code TEXT NOT NULL,
  referral_type TEXT DEFAULT 'general', -- 'general', 'brand', or 'influencer'
  status TEXT NOT NULL CHECK (status IN ('pending', 'verified', 'rejected')),
  points_awarded INTEGER DEFAULT 0,
  role TEXT NOT NULL,
  campaign_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(referred_id)
);

-- Create index for faster queries
CREATE INDEX idx_referrals_referrer_id ON public.referrals(referrer_id);
CREATE INDEX idx_referrals_referred_id ON public.referrals(referred_id);
CREATE INDEX idx_user_referrals_user_id ON public.user_referrals(user_id);
CREATE INDEX idx_user_referrals_referral_code ON public.user_referrals(referral_code);
CREATE INDEX idx_referrals_referral_type ON public.referrals(referral_type);

-- RLS Policies for security
ALTER TABLE public.user_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Users can read their own referral code
CREATE POLICY "Users can view their own referral code" 
ON public.user_referrals 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can view referrals they've made
CREATE POLICY "Users can view referrals they've made" 
ON public.referrals 
FOR SELECT 
USING (auth.uid() = referrer_id);

-- Function to update referral stats when a new referral is verified
CREATE OR REPLACE FUNCTION public.update_referral_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'verified' AND OLD.status != 'verified' THEN
    -- Update the referrer's stats
    IF NEW.referral_type = 'brand' THEN
      UPDATE public.user_referrals
      SET 
        referrals_count = referrals_count + 1,
        brand_referrals_count = brand_referrals_count + 1,
        points_earned = points_earned + NEW.points_awarded
      WHERE user_id = NEW.referrer_id;
    ELSIF NEW.referral_type = 'influencer' THEN
      UPDATE public.user_referrals
      SET 
        referrals_count = referrals_count + 1,
        influencer_referrals_count = influencer_referrals_count + 1,
        points_earned = points_earned + NEW.points_awarded
      WHERE user_id = NEW.referrer_id;
    ELSE
      UPDATE public.user_referrals
      SET 
        referrals_count = referrals_count + 1,
        points_earned = points_earned + NEW.points_awarded
      WHERE user_id = NEW.referrer_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update stats when a referral is verified
CREATE TRIGGER update_referral_stats_trigger
AFTER UPDATE ON public.referrals
FOR EACH ROW
EXECUTE FUNCTION public.update_referral_stats();

-- Function to update points for influencer when they complete first campaign
CREATE OR REPLACE FUNCTION public.update_influencer_campaign_completion()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.campaign_completed = TRUE AND OLD.campaign_completed = FALSE THEN
    -- Find the referrer and award additional points if this is an influencer referral
    IF NEW.role = 'influencer' AND NEW.referral_type = 'influencer' THEN
      UPDATE public.user_referrals
      SET points_earned = points_earned + 50
      WHERE user_id = NEW.referrer_id;
      
      -- Also update the points_awarded in the referrals table
      UPDATE public.referrals
      SET points_awarded = points_awarded + 50
      WHERE id = NEW.id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for influencer campaign completion
CREATE TRIGGER update_influencer_campaign_completion_trigger
AFTER UPDATE ON public.referrals
FOR EACH ROW
EXECUTE FUNCTION public.update_influencer_campaign_completion();
