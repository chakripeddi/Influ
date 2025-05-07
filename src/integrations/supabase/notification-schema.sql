
-- Notifications tables for Supabase

-- Table for user notification preferences
CREATE TABLE public.notification_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  in_app_enabled BOOLEAN DEFAULT true,
  email_enabled BOOLEAN DEFAULT true,
  whatsapp_enabled BOOLEAN DEFAULT false,
  sound_enabled BOOLEAN DEFAULT true,
  vibration_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Table for notification types
CREATE TABLE public.notification_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  applicable_roles VARCHAR(255)[] NOT NULL, -- Array of roles: ['brand', 'influencer', 'campaigner']
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type_id UUID NOT NULL REFERENCES public.notification_types(id),
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Table to track email notifications sent
CREATE TABLE public.email_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  notification_id UUID NOT NULL REFERENCES public.notifications(id) ON DELETE CASCADE,
  email_to VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  html_content TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivery_status VARCHAR(50) DEFAULT 'pending'
);

-- RLS Policies
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_notifications ENABLE ROW LEVEL SECURITY;

-- Users can view and update their own preferences
CREATE POLICY "Users can view their own notification preferences" 
ON public.notification_preferences 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notification preferences" 
ON public.notification_preferences 
FOR UPDATE USING (auth.uid() = user_id);

-- Users can view their own notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE USING (auth.uid() = user_id);

-- Anyone can view notification types
CREATE POLICY "Anyone can view notification types" 
ON public.notification_types 
FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at);
CREATE INDEX idx_notification_preferences_user_id ON public.notification_preferences(user_id);

-- Insert default notification types
INSERT INTO public.notification_types (code, name, description, applicable_roles) VALUES
-- Brand notifications
('brand_new_influencer_application', 'New Influencer Application', 'A new influencer has applied to your campaign', ARRAY['brand']),
('brand_deliverable_submitted', 'Deliverable Submitted', 'An influencer has submitted a deliverable for your campaign', ARRAY['brand']),
('brand_campaign_approval_status', 'Campaign Approval Status', 'Your campaign has been approved or rejected by admin', ARRAY['brand']),
('brand_payment_reminder', 'Payment Reminder', 'Reminder to complete payment for campaigns', ARRAY['brand']),

-- Influencer notifications
('influencer_application_status', 'Application Status Update', 'Your application to a campaign has been accepted or rejected', ARRAY['influencer']),
('influencer_matching_campaign', 'Matching Campaign', 'New campaign matching your category is available', ARRAY['influencer']),
('influencer_payment_released', 'Payment Released', 'Payment for your campaign has been released', ARRAY['influencer']),
('influencer_deadline_reminder', 'Deadline Reminder', 'A campaign deadline is approaching', ARRAY['influencer']),

-- Campaigner notifications
('campaigner_new_referral_signup', 'New Referral Signup', 'Someone signed up using your referral link', ARRAY['campaigner']),
('campaigner_referral_converted', 'Referral Converted', 'One of your referrals converted', ARRAY['campaigner']),
('campaigner_monthly_points', 'Monthly Points Report', 'Your monthly points report is available', ARRAY['campaigner']),
('campaigner_leaderboard_update', 'Leaderboard Update', 'There has been an update to the leaderboard', ARRAY['campaigner']),

-- General notifications
('general_account_update', 'Account Update', 'Your account has been updated', ARRAY['brand', 'influencer', 'campaigner']),
('general_system_announcement', 'System Announcement', 'Important system announcement', ARRAY['brand', 'influencer', 'campaigner']);

-- Create a function to automatically create default preferences for new users
CREATE OR REPLACE FUNCTION public.create_default_notification_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notification_preferences (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create default preferences when a new user is created
CREATE TRIGGER create_user_notification_preferences
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.create_default_notification_preferences();
