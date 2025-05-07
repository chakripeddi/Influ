
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

// Contexts
import { AuthProvider } from "@/hooks/useAuth";
import { ReferralProvider } from "./contexts/ReferralContext";
import { NotificationProvider } from "./contexts/NotificationContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Campaigns from "./pages/campaigns/Campaigns";
import CampaignDetail from "./pages/campaigns/CampaignDetail";
import CampaignCreate from "./pages/campaigns/CampaignCreate";
import CampaignDetailPage from "./pages/campaigns/CampaignDetailPage";
import DeliverableSubmissionPage from "./pages/campaigns/DeliverableSubmissionPage";
import InfluencerDashboard from "./pages/influencer/InfluencerDashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import HowItWorks from "./pages/HowItWorks";
import ReferralPage from "./pages/referral/ReferralPage";
import CampaignerDashboardPage from "./pages/campaigner/CampaignerDashboardPage";
import NotificationCenter from "./pages/notifications/NotificationCenter";
import NotificationSettings from "./pages/settings/NotificationSettings";
import WalletPage from "./pages/wallet/WalletPage";
import BrandHomePage from "./pages/brand/BrandHomePage";
import BrandProfileSetupPage from "./pages/brand/BrandProfileSetupPage";
import ProfileSetupPage from "./pages/influencer/ProfileSetupPage";

// Admin Panel
import AdminPanel from "./pages/admin/AdminPanel";
import Dashboard from "./pages/admin/Dashboard";
import UsersManagement from "./pages/admin/UsersManagement";
import CampaignsManagement from "./pages/admin/CampaignsManagement";
import AIAlerts from "./pages/admin/AIAlerts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Helmet defaultTitle="Influencer Adsense" titleTemplate="%s | Influencer Adsense" />
        <AuthProvider>
          <ReferralProvider>
            <NotificationProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/brand" element={<BrandHomePage />} />
                  <Route path="/brand/setup" element={<BrandProfileSetupPage />} />
                  <Route path="/campaigns" element={<Campaigns />} />
                  <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
                  <Route path="/campaigns/detail/:id" element={<CampaignDetail />} />
                  <Route path="/campaigns/create" element={<CampaignCreate />} />
                  <Route path="/campaigns/:id/submit" element={<DeliverableSubmissionPage />} />
                  <Route path="/dashboard" element={<InfluencerDashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/referrals" element={<ReferralPage />} />
                  <Route path="/campaigner-dashboard" element={<CampaignerDashboardPage />} />
                  <Route path="/notifications" element={<NotificationCenter />} />
                  <Route path="/settings/notifications" element={<NotificationSettings />} />
                  <Route path="/wallet" element={<WalletPage />} />
                  <Route path="/influencer/profile-setup" element={<ProfileSetupPage />} />
                  
                  {/* Admin Panel Routes */}
                  <Route path="/admin" element={<AdminPanel />}>
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<UsersManagement />} />
                    <Route path="campaigns" element={<CampaignsManagement />} />
                    <Route path="ai-alerts" element={<AIAlerts />} />
                    {/* Additional admin routes will be added here */}
                  </Route>
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </NotificationProvider>
          </ReferralProvider>
        </AuthProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
