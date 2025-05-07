
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import { AuthStatus } from '@/components/auth/AuthStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid2X2, List, Search, Award, Wallet, BarChart2, User } from 'lucide-react';
import { Instagram, Youtube, Facebook } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import MetricCard from '@/components/dashboard/MetricCard';
import CampaignCard from '@/components/dashboard/CampaignCard';
import ApplicationStatusCard from '@/components/dashboard/ApplicationStatusCard';
import MiniChart from '@/components/dashboard/MiniChart';

const InfluencerDashboard = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Mock data for dashboard metrics
  const metrics = [
    { title: "Total Earnings", value: "$2,350", icon: Wallet, trend: { value: 12.5, isPositive: true } },
    { title: "Active Campaigns", value: "4", icon: Award, trend: { value: 2, isPositive: true } },
    { title: "Pending Submissions", value: "2", icon: User },
    { title: "Profile Score", value: "87/100", icon: Award, description: "Top 15% of influencers" },
  ];
  
  // Mock data for campaigns
  const campaigns = [
    {
      id: "1",
      title: "Summer Fashion Showcase",
      brandName: "StyleVogue",
      brandLogo: "",
      budget: "$800-$1,200",
      description: "Looking for fashion influencers to showcase our summer collection with natural lifestyle photos and short-form videos.",
      platforms: ["Instagram", "TikTok"],
      deadline: "Jun 15, 2025",
      category: "Fashion",
    },
    {
      id: "2",
      title: "Fitness App Review",
      brandName: "FitLife",
      brandLogo: "",
      budget: "$500-$800",
      description: "Need fitness enthusiasts to try our new workout app for 2 weeks and share honest reviews with your audience.",
      platforms: ["YouTube", "Instagram"],
      deadline: "Jun 10, 2025",
      category: "Fitness",
    },
    {
      id: "3",
      title: "Travel Vlog Series",
      brandName: "WanderLuxe Hotels",
      brandLogo: "",
      budget: "$2,000-$3,000",
      description: "Looking for travel content creators for a 3-part vlog series showcasing our luxury hotels in tropical destinations.",
      platforms: ["YouTube", "Instagram"],
      deadline: "Jun 30, 2025",
      category: "Travel",
    },
    {
      id: "4",
      title: "Gaming Peripheral Review",
      brandName: "TechGear",
      brandLogo: "",
      budget: "$400-$700",
      description: "Seeking gaming influencers to review our latest keyboard and mouse combo with detailed gameplay footage.",
      platforms: ["Twitch", "YouTube"],
      deadline: "Jun 20, 2025",
      category: "Gaming",
    },
  ];
  
  // Mock data for applications
  const applications = [
    {
      id: "1",
      campaignTitle: "Beauty Products Review",
      brandName: "GlowUp Cosmetics",
      currentStep: "approved" as const,
      notes: {
        submitted: "Your application was received on May 1, 2025",
        in_review: "Brand reviewing your profile and past content",
        approved: "Congratulations! You've been selected for this campaign",
        deliverables: "Please submit your content by June 15, 2025",
        completed: "",
        rejected: "",
      }
    },
    {
      id: "2",
      campaignTitle: "Tech Gadget Unboxing",
      brandName: "TechWorld",
      currentStep: "in_review" as const,
      notes: {
        submitted: "Your application was received on May 5, 2025",
        in_review: "Under review by the marketing team",
        approved: "",
        deliverables: "",
        completed: "",
        rejected: "",
      }
    },
    {
      id: "3",
      campaignTitle: "Healthy Snack Promotion",
      brandName: "NutriSnack",
      currentStep: "rejected" as const,
      notes: {
        submitted: "Your application was received on April 28, 2025",
        in_review: "Review completed on May 3, 2025",
        approved: "",
        deliverables: "",
        completed: "",
        rejected: "Thank you for your interest, but we are looking for different audience demographics at this time",
      }
    },
  ];
  
  // Analytics data
  const analyticsData = {
    followers: [
      { name: 'Jan', value: 4200 },
      { name: 'Feb', value: 4500 },
      { name: 'Mar', value: 5100 },
      { name: 'Apr', value: 5400 },
      { name: 'May', value: 6200 },
    ],
    engagement: [
      { name: 'Jan', value: 3.2 },
      { name: 'Feb', value: 3.5 },
      { name: 'Mar', value: 4.1 },
      { name: 'Apr', value: 3.8 },
      { name: 'May', value: 4.3 },
    ],
    earnings: [
      { name: 'Jan', value: 450 },
      { name: 'Feb', value: 650 },
      { name: 'Mar', value: 400 },
      { name: 'Apr', value: 800 },
      { name: 'May', value: 950 },
    ],
    platforms: [
      { name: 'Instagram', followers: 12500, engagement: 4.3 },
      { name: 'YouTube', followers: 8200, engagement: 5.1 },
      { name: 'TikTok', followers: 15800, engagement: 6.2 },
    ],
  };
  
  // Filter campaigns based on search and category filter
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          campaign.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || campaign.category.toLowerCase() === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Platform icons mapping
  const platformIcons = {
    Instagram: <Instagram className="h-4 w-4" />,
    YouTube: <Youtube className="h-4 w-4" />,
    Facebook: <Facebook className="h-4 w-4" />,
    TikTok: <User className="h-4 w-4" />,
    Twitch: <User className="h-4 w-4" />,
  };
  
  return (
    <AuthStatus>
      <MainLayout>
        <Helmet>
          <title>Influencer Dashboard | Influencer Adsense</title>
        </Helmet>
        
        <div className="container py-8 animate-fade-in">
          {/* Welcome Banner */}
          <WelcomeBanner userName="Alex Johnson" />
          
          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="mt-8">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Find Campaigns</TabsTrigger>
              <TabsTrigger value="applications">My Applications</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="animate-fade-in">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {metrics.map((metric, index) => (
                  <MetricCard
                    key={index}
                    title={metric.title}
                    value={metric.value}
                    icon={metric.icon}
                    trend={metric.trend}
                    description={metric.description}
                  />
                ))}
              </div>
              
              {/* Latest Applications */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Application Status</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {applications.slice(0, 2).map((application) => (
                    <ApplicationStatusCard
                      key={application.id}
                      campaignTitle={application.campaignTitle}
                      brandName={application.brandName}
                      currentStep={application.currentStep}
                      notes={application.notes}
                    />
                  ))}
                </div>
              </div>
              
              {/* Recent Campaigns */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Recommended Campaigns</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {campaigns.slice(0, 3).map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      id={campaign.id}
                      title={campaign.title}
                      brandName={campaign.brandName}
                      brandLogo={campaign.brandLogo}
                      budget={campaign.budget}
                      description={campaign.description}
                      platforms={campaign.platforms}
                      deadline={campaign.deadline}
                      category={campaign.category}
                    />
                  ))}
                </div>
              </div>
              
              {/* Mini Analytics */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Performance Overview</h2>
                  <Button variant="outline" size="sm">Full Analytics</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <MiniChart
                    title="Followers Growth"
                    data={analyticsData.followers}
                    type="line"
                    trend={{ value: 14.2, isPositive: true }}
                  />
                  <MiniChart
                    title="Engagement Rate"
                    data={analyticsData.engagement}
                    type="line"
                    trend={{ value: 0.5, isPositive: true }}
                  />
                  <MiniChart
                    title="Monthly Earnings"
                    data={analyticsData.earnings}
                    type="bar"
                    trend={{ value: 18.7, isPositive: true }}
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Campaigns Tab */}
            <TabsContent value="campaigns" className="animate-fade-in">
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search campaigns..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="tech">Tech</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center bg-muted/50 rounded-md p-1">
                    <Button 
                      variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                      size="icon" 
                      onClick={() => setViewMode('grid')}
                      className="h-8 w-8"
                    >
                      <Grid2X2 className="h-4 w-4" />
                      <span className="sr-only">Grid view</span>
                    </Button>
                    <Button 
                      variant={viewMode === 'list' ? 'default' : 'ghost'} 
                      size="icon" 
                      onClick={() => setViewMode('list')}
                      className="h-8 w-8"
                    >
                      <List className="h-4 w-4" />
                      <span className="sr-only">List view</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              {filteredCampaigns.length > 0 ? (
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "flex flex-col gap-4"
                }>
                  {filteredCampaigns.map(campaign => (
                    <CampaignCard
                      key={campaign.id}
                      id={campaign.id}
                      title={campaign.title}
                      brandName={campaign.brandName}
                      brandLogo={campaign.brandLogo}
                      budget={campaign.budget}
                      description={campaign.description}
                      platforms={campaign.platforms}
                      deadline={campaign.deadline}
                      category={campaign.category}
                      className={viewMode === 'list' ? "sm:flex-row" : ""}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center p-12 bg-muted rounded-lg">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No campaigns found</h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your search filters or check back later for new opportunities.
                  </p>
                </div>
              )}
            </TabsContent>
            
            {/* Applications Tab */}
            <TabsContent value="applications" className="animate-fade-in">
              <div className="mb-6 flex gap-4 flex-wrap">
                <Button variant="outline" size="sm" className="rounded-full">All</Button>
                <Button variant="outline" size="sm" className="rounded-full">Under Review</Button>
                <Button variant="outline" size="sm" className="rounded-full">Approved</Button>
                <Button variant="outline" size="sm" className="rounded-full">Rejected</Button>
                <Button variant="outline" size="sm" className="rounded-full">Completed</Button>
              </div>
              
              <div className="space-y-6">
                {applications.map(application => (
                  <ApplicationStatusCard
                    key={application.id}
                    campaignTitle={application.campaignTitle}
                    brandName={application.brandName}
                    currentStep={application.currentStep}
                    notes={application.notes}
                    className="border-transparent shadow-lg hover:shadow-xl transition-all"
                  />
                ))}
              </div>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <MiniChart
                  title="Followers Growth"
                  data={analyticsData.followers}
                  type="line"
                  trend={{ value: 14.2, isPositive: true }}
                />
                <MiniChart
                  title="Engagement Rate"
                  data={analyticsData.engagement}
                  type="line"
                  trend={{ value: 0.5, isPositive: true }}
                />
                <MiniChart
                  title="Monthly Earnings"
                  data={analyticsData.earnings}
                  type="bar"
                  trend={{ value: 18.7, isPositive: true }}
                />
              </div>
              
              <h3 className="text-lg font-semibold mb-4">Platform Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {analyticsData.platforms.map((platform, index) => (
                  <Card key={index} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {platform.name === 'Instagram' && <Instagram className="h-5 w-5 text-pink-500" />}
                          {platform.name === 'YouTube' && <Youtube className="h-5 w-5 text-red-500" />}
                          {platform.name === 'TikTok' && <User className="h-5 w-5 text-black" />}
                          <h3 className="font-medium">{platform.name}</h3>
                        </div>
                        <div className="flex items-center px-2 py-1 bg-primary/10 rounded-full">
                          <BarChart2 className="h-3 w-3 text-primary mr-1" />
                          <span className="text-xs font-medium">{platform.engagement}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {platform.followers.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">Followers</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold mb-4">Settings</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Audience Analytics</h4>
                        <p className="text-sm text-muted-foreground">Show detailed audience demographics</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Earnings Reports</h4>
                        <p className="text-sm text-muted-foreground">Send monthly earnings reports via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Performance Alerts</h4>
                        <p className="text-sm text-muted-foreground">Get notified about significant changes in engagement</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </AuthStatus>
  );
};

export default InfluencerDashboard;
