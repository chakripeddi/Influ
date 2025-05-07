import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import MainLayout from '@/components/layout/MainLayout';
import { Form } from '@/components/ui/form';

import CampaignFormHeader from '@/components/campaign/create/CampaignFormHeader';
import MobileNavigation from '@/components/campaign/create/MobileNavigation';
import CampaignDetailsSection from '@/components/campaign/create/CampaignDetailsSection';
import TargetAudienceSection from '@/components/campaign/create/TargetAudienceSection';
import PlatformSelectionSection from '@/components/campaign/create/PlatformSelectionSection';
import InfluencerCriteriaSection from '@/components/campaign/create/InfluencerCriteriaSection';
import DeliverablesTimelineSection from '@/components/campaign/create/DeliverablesTimelineSection';
import BudgetCompensationSection from '@/components/campaign/create/BudgetCompensationSection';
import ReferralSystemSection from '@/components/campaign/create/ReferralSystemSection';
import AiAssistanceSection from '@/components/campaign/create/AiAssistanceSection';
import ComplianceSection from '@/components/campaign/create/ComplianceSection';
import CampaignNavigationSidebar from '@/components/campaign/create/CampaignNavigationSidebar';
import FormFooter from '@/components/campaign/create/FormFooter';

import { campaignFormSchema, type CampaignFormValues } from './schema';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const CampaignCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [brandId, setBrandId] = useState<string | null>(null);
  
  // Initialize form with default values
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      title: "",
      type: "",
      description: "",
      media: [],
      regions: [],
      ageRange: [18, 45],
      interests: [],
      platforms: [],
      contentTypes: [],
      minFollowers: 1000,
      engagementRate: 2,
      preferPastCollaborators: false,
      numDeliverables: 1,
      dateRange: {
        from: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        to: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
      },
      requirePreapproval: true,
      budget: 0,
      payoutModel: "",
      paymentTerms: "",
      enableReferral: false,
      referralReward: 0,
      enableAiMatching: true,
      optimizationFocus: "engagement",
      termsFile: [],
      requireNda: false,
    }
  });

  // Fetch brand ID on component mount
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchBrandProfile = async () => {
      const { data, error } = await supabase
        .from('brand_profiles')
        .select('id')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching brand profile:', error);
        toast.error('Error loading brand profile. Please ensure you have set up your brand profile.');
        return;
      }
      
      if (data) {
        setBrandId(data.id);
      }
    };
    
    fetchBrandProfile();
  }, [user]);

  // Mutation to create or update campaign
  const saveCampaignMutation = useMutation({
    mutationFn: async ({ values, status }: { values: CampaignFormValues; status: 'draft' | 'published' }) => {
      if (!user?.id || !brandId) {
        throw new Error('User or brand profile not found');
      }
      
      // Convert dates to ISO strings for Supabase compatibility
      const dateRange = {
        from: values.dateRange.from ? values.dateRange.from.toISOString() : null,
        to: values.dateRange.to ? values.dateRange.to.toISOString() : null
      };
      
      // Prepare the data to be inserted
      const campaignData = {
        brand_id: brandId,
        title: values.title,
        type: values.type,
        description: values.description,
        // Media would be handled separately with Storage
        
        // Target Audience
        regions: values.regions,
        age_range: values.ageRange,
        interests: values.interests,
        
        // Platform Selection
        platforms: values.platforms,
        content_types: values.contentTypes,
        
        // Influencer Criteria
        min_followers: values.minFollowers,
        engagement_rate: values.engagementRate,
        prefer_past_collaborators: values.preferPastCollaborators,
        
        // Deliverables & Timeline
        num_deliverables: values.numDeliverables,
        date_range: dateRange, // Use the converted dateRange
        require_preapproval: values.requirePreapproval,
        
        // Budget & Compensation
        budget: values.budget,
        payout_model: values.payoutModel,
        payment_terms: values.paymentTerms,
        
        // Referral System
        enable_referral: values.enableReferral,
        referral_reward: values.enableReferral ? values.referralReward : null,
        
        // AI Assistance
        enable_ai_matching: values.enableAiMatching,
        optimization_focus: values.optimizationFocus,
        
        // Status and timestamps
        status: status,
        published_at: status === 'published' ? new Date().toISOString() : null,
      };
      
      const { data, error } = await supabase
        .from('campaign_details')
        .insert(campaignData)
        .select('id')
        .single();
      
      if (error) throw error;
      return data;
    },
    onError: (error) => {
      console.error('Error saving campaign:', error);
      toast.error('Failed to save campaign. Please try again.');
    },
  });
  
  const handleFormSubmit = async (values: CampaignFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Save media files to storage first if needed
      // This would require additional code to handle file uploads
      
      // Create or update the campaign
      const result = await saveCampaignMutation.mutateAsync({
        values,
        status: 'published'
      });
      
      toast.success('Campaign published successfully!', {
        description: 'Your campaign is now live and visible to influencers.'
      });
      
      // Navigate to campaigns list or detail view
      navigate('/campaigns');
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const saveDraft = async () => {
    try {
      const values = form.getValues();
      
      // Validate form data before saving
      const validationResult = campaignFormSchema.safeParse(values);
      if (!validationResult.success) {
        // If validation fails, show warnings but still save
        toast.warning('Some fields have errors', {
          description: 'Campaign saved as draft, but please check form for errors before publishing.'
        });
      }
      
      const result = await saveCampaignMutation.mutateAsync({
        values,
        status: 'draft'
      });
      
      toast.success('Campaign draft saved', {
        description: 'Your campaign draft has been saved successfully.'
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft. Please try again.');
    }
  };
  
  const handlePreview = () => {
    const values = form.getValues();
    // Could save to localStorage or state management before showing preview
    toast.info("Preview feature", { description: "Campaign preview is coming soon" });
  };
  
  const handleAiSuggestions = () => {
    toast.info("AI Generating Suggestions", { 
      description: "Our AI is analyzing your inputs to suggest improvements..." 
    });
    
    // Simulate AI processing
    setTimeout(() => {
      form.setValue("title", "Summer Fashion Collection Launch 2025");
      form.setValue(
        "description", 
        "# Summer Collection Launch 2025\n\nWe're excited to introduce our new summer collection featuring sustainable fabrics and vibrant designs perfect for the beach season.\n\n## Key Points:\n- Eco-friendly materials\n- Limited edition pieces\n- 20% of profits go to ocean cleanup\n\nWe're looking for creative influencers to showcase these pieces in authentic settings that highlight summer adventures."
      );
      
      toast.success("AI Suggestions Generated", {
        description: "Check the campaign title and description for our suggestions!"
      });
    }, 2000);
  };
  
  // Campaign form options
  const campaignTypes = [
    "Sponsored Post", "Product Review", "UGC", "Giveaway", 
    "Affiliate", "Brand Ambassador", "Event Promotion"
  ];
  
  const regions = [
    "North America", "South America", "Europe", "Africa", 
    "Asia", "Australia/Oceania", "Global"
  ];
  
  const interestOptions = [
    "Fashion", "Tech", "Travel", "Food", "Beauty", "Fitness", "Gaming",
    "Lifestyle", "Parenting", "Business", "Education", "Entertainment"
  ];
  
  const platformOptions = [
    "Instagram", "YouTube", "TikTok", "Facebook", "Twitter", 
    "LinkedIn", "Pinterest", "Twitch", "Snapchat"
  ];
  
  const contentTypeOptions = [
    "Post", "Story", "Reel", "Video", "Short", "Review", 
    "Live Stream", "Blog", "Podcast"
  ];
  
  const payoutModelOptions = [
    "Fixed Fee", "Per Engagement", "Per Click", 
    "Product-based", "Revenue Share", "Hybrid"
  ];
  
  const paymentTermOptions = [
    "Prepaid", "On Completion", "Net-15", "Net-30", "Milestone-based"
  ];
  
  const optimizationOptions = [
    { value: "reach", label: "Reach" },
    { value: "engagement", label: "Engagement" },
    { value: "conversions", label: "Conversions" },
    { value: "awareness", label: "Brand Awareness" }
  ];

  // Show message if brand profile is not set up
  if (!brandId && user) {
    return (
      <MainLayout>
        <div className="container py-12">
          <div className="max-w-md mx-auto text-center space-y-6">
            <h1 className="text-2xl font-bold">Complete Your Brand Profile</h1>
            <p className="text-muted-foreground">
              To create campaigns, you need to set up your brand profile first.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/brand/setup')}
            >
              Set Up Brand Profile
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>Create Campaign | Influencer Adsense</title>
      </Helmet>
      
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            <CampaignFormHeader 
              isSubmitting={isSubmitting}
              saveDraft={saveDraft}
              handleSubmit={form.handleSubmit(handleFormSubmit)}
              showPreview={handlePreview}
            />
            
            <MobileNavigation 
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
                <CampaignDetailsSection 
                  control={form.control}
                  campaignTypes={campaignTypes}
                />

                <TargetAudienceSection 
                  control={form.control}
                  regions={regions}
                  interestOptions={interestOptions}
                />

                <PlatformSelectionSection 
                  control={form.control}
                  platformOptions={platformOptions}
                  contentTypeOptions={contentTypeOptions}
                />

                <InfluencerCriteriaSection 
                  control={form.control}
                />

                <DeliverablesTimelineSection 
                  control={form.control}
                />

                <BudgetCompensationSection 
                  control={form.control}
                  payoutModelOptions={payoutModelOptions}
                  paymentTermOptions={paymentTermOptions}
                />

                <ReferralSystemSection 
                  control={form.control}
                />

                <AiAssistanceSection 
                  control={form.control}
                  optimizationOptions={optimizationOptions}
                  handleAiSuggestions={handleAiSuggestions}
                />

                <ComplianceSection 
                  control={form.control}
                />

                <FormFooter 
                  isSubmitting={isSubmitting}
                  saveDraft={saveDraft}
                  handleSubmit={form.handleSubmit(handleFormSubmit)}
                  showPreview={handlePreview}
                />
              </form>
            </Form>
          </div>
          
          {/* Sidebar */}
          <CampaignNavigationSidebar className="hidden lg:block" />
        </div>
      </div>
    </MainLayout>
  );
};

export default CampaignCreate;
