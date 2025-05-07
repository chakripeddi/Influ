
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useBrandProfileSetup } from "@/hooks/useBrandProfileSetup";
import { AuthStatus } from "@/components/auth/AuthStatus";

import BusinessIdentityForm from "@/components/brand/setup/BusinessIdentityForm";
import ContactDetailsForm from "@/components/brand/setup/ContactDetailsForm";
import SocialMediaForm from "@/components/brand/setup/SocialMediaForm";
import CampaignPreferencesForm from "@/components/brand/setup/CampaignPreferencesForm";
import AIPreferencesForm from "@/components/brand/setup/AIPreferencesForm";
import ReferralForm from "@/components/brand/setup/ReferralForm";
import BrandAssetsForm from "@/components/brand/setup/BrandAssetsForm";
import ProfileSetupProgress from "@/components/brand/setup/ProfileSetupProgress";

// Define the steps of the setup process
const SETUP_STEPS = [
  { id: "business-identity", label: "Business Identity" },
  { id: "contact-details", label: "Contact Details" },
  { id: "social-media", label: "Social Media" },
  { id: "campaign-preferences", label: "Campaign Preferences" },
  { id: "ai-preferences", label: "AI & Collaboration" },
  { id: "referral", label: "Referral & Rewards" },
  { id: "brand-assets", label: "Brand Assets" },
];

// Content component for the Brand Profile Setup page
const BrandProfileSetupContent = () => {
  const [activeStep, setActiveStep] = useState("business-identity");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    isSubmitting, 
    skipSetup, 
    completeSetup 
  } = useBrandProfileSetup();

  // Animation variants for the sections
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  // Handle tab change with animation
  const handleTabChange = (value: string) => {
    setActiveStep(value);
    const currentIndex = SETUP_STEPS.findIndex(step => step.id === value);
    setProgress(Math.round((currentIndex / (SETUP_STEPS.length - 1)) * 100));
  };

  // Skip setup and go to dashboard
  const handleSkip = async () => {
    const result = await skipSetup();
    if (result.success) {
      toast.info("Setup skipped. You can complete your profile later.");
      navigate("/brand");
    } else {
      toast.error(`Failed to skip setup: ${result.error}`);
    }
  };

  // Complete setup and go to dashboard
  const handleComplete = async () => {
    const result = await completeSetup();
    if (result.success) {
      toast.success("Brand profile setup complete! Welcome aboard.");
      navigate("/brand");
    } else {
      toast.error(`Failed to complete setup: ${result.error}`);
    }
  };

  // Get previous and next step IDs
  const currentStepIndex = SETUP_STEPS.findIndex(step => step.id === activeStep);
  const prevStep = currentStepIndex > 0 ? SETUP_STEPS[currentStepIndex - 1].id : null;
  const nextStep = currentStepIndex < SETUP_STEPS.length - 1 ? SETUP_STEPS[currentStepIndex + 1].id : null;

  return (
    <div className="container max-w-5xl py-8 px-4 md:px-6">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">Set Up Your Brand Profile</h1>
        <p className="text-muted-foreground">
          Complete your brand profile to start collaborating with perfect-fit influencers
        </p>
      </motion.div>

      <ProfileSetupProgress progress={progress} steps={SETUP_STEPS} activeStep={activeStep} />

      <Card className="mt-6">
        <CardHeader className="pb-4">
          <CardTitle>Brand Profile Setup</CardTitle>
          <CardDescription>
            Tell us about your brand to help us match you with the right influencers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeStep} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
              {SETUP_STEPS.map((step) => (
                <TabsTrigger 
                  key={step.id} 
                  value={step.id}
                  className="text-xs md:text-sm"
                >
                  {step.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Business Identity Section */}
            <TabsContent value="business-identity">
              <motion.div 
                key="business-identity"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
              >
                <BusinessIdentityForm />
              </motion.div>
            </TabsContent>

            {/* Contact Details Section */}
            <TabsContent value="contact-details">
              <motion.div 
                key="contact-details"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
              >
                <ContactDetailsForm />
              </motion.div>
            </TabsContent>

            {/* Social Media Section */}
            <TabsContent value="social-media">
              <motion.div 
                key="social-media"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
              >
                <SocialMediaForm />
              </motion.div>
            </TabsContent>

            {/* Campaign Preferences Section */}
            <TabsContent value="campaign-preferences">
              <motion.div 
                key="campaign-preferences"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
              >
                <CampaignPreferencesForm />
              </motion.div>
            </TabsContent>

            {/* AI & Collaboration Preferences Section */}
            <TabsContent value="ai-preferences">
              <motion.div 
                key="ai-preferences"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
              >
                <AIPreferencesForm />
              </motion.div>
            </TabsContent>

            {/* Referral & Rewards Section */}
            <TabsContent value="referral">
              <motion.div 
                key="referral"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
              >
                <ReferralForm />
              </motion.div>
            </TabsContent>

            {/* Brand Assets Upload Section */}
            <TabsContent value="brand-assets">
              <motion.div 
                key="brand-assets"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
              >
                <BrandAssetsForm />
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6 gap-4">
        <div>
          {prevStep && (
            <Button 
              variant="outline" 
              onClick={() => handleTabChange(prevStep)}
              disabled={isSubmitting}
            >
              Back
            </Button>
          )}
        </div>
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            onClick={handleSkip}
            disabled={isSubmitting}
          >
            Skip for now
          </Button>
          
          {nextStep ? (
            <Button 
              onClick={() => handleTabChange(nextStep)}
              disabled={isSubmitting}
            >
              Continue
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Complete Setup"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main component with authentication check
const BrandProfileSetupPage = () => {
  return (
    <MainLayout>
      <AuthStatus requireAuth={true}>
        <BrandProfileSetupContent />
      </AuthStatus>
    </MainLayout>
  );
};

export default BrandProfileSetupPage;
