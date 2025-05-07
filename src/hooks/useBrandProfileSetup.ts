
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useBrandProfileSetup = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveBusinessIdentity = async (data: any) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('brand_profiles')
        .upsert({
          id: user.id,
          business_name: data.brandName,
          industry: data.industryCategory,
          website: data.websiteUrl,
          logo_url: data.logo,
          description: data.brandTagline || '',
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });
        
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Error saving business identity:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveContactDetails = async (data: any) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('brand_profiles')
        .update({
          contact_email: data.businessEmail,
          contact_phone: `${data.countryCode}${data.phoneNumber}`,
          address: data.officeAddress,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Error saving contact details:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveSocialMedia = async (data: any) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    try {
      setIsSubmitting(true);
      
      const socialMedia = {
        instagram: data.instagramUrl || null,
        facebook: data.facebookUrl || null,
        linkedin: data.linkedinUrl || null,
        youtube: data.youtubeUrl || null
      };
      
      const { error } = await supabase
        .from('brand_profiles')
        .update({
          social_media: socialMedia,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Error saving social media:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveCampaignPreferences = async (data: any) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    try {
      setIsSubmitting(true);
      
      const campaignPreferences = {
        influencer_tier: data.influencerTier,
        budget_range: data.budgetRange,
        platforms: data.platforms,
        campaign_goals: data.campaignGoals,
        target_region: data.targetRegion
      };
      
      const { error } = await supabase
        .from('brand_profiles')
        .update({
          campaign_preferences: campaignPreferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Error saving campaign preferences:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveAIPreferences = async (data: any) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    try {
      setIsSubmitting(true);
      
      const aiPreferences = {
        ai_matching_enabled: data.aiMatchingEnabled,
        ai_suggestions_enabled: data.aiSuggestionsEnabled,
        brand_voice: data.brandVoice || ''
      };
      
      const { error } = await supabase
        .from('brand_profiles')
        .update({
          ai_preferences: aiPreferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Error saving AI preferences:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const completeSetup = async () => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('brand_profiles')
        .update({
          setup_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Error completing setup:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const skipSetup = async () => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    try {
      // Check if user already has a profile
      const { data, error: fetchError } = await supabase
        .from('brand_profiles')
        .select('id')
        .eq('id', user.id)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }
      
      // If no profile exists, create a minimal one
      if (!data) {
        const { error } = await supabase
          .from('brand_profiles')
          .insert({
            id: user.id,
            business_name: 'My Brand',
            industry: 'Other',
            setup_completed: false,
          });
          
        if (error) throw error;
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error skipping setup:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  };

  return {
    isSubmitting,
    saveBusinessIdentity,
    saveContactDetails,
    saveSocialMedia,
    saveCampaignPreferences,
    saveAIPreferences,
    completeSetup,
    skipSetup
  };
};
