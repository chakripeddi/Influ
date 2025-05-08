import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  PlusCircle, 
  Users, 
  LineChart, 
  Wallet, 
  BarChart4, 
  Calendar, 
  ArrowRight, 
  ChevronRight,
  TrendingUp,
  DollarSign,
  Eye,
  Heart,
  MousePointer,
  Instagram,
  Youtube,
  Facebook
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import BrandWelcomeBanner from '@/components/brand/BrandWelcomeBanner';
import ActionCard from '@/components/brand/ActionCard';
import CampaignCard from '@/components/brand/CampaignCard';
import InfluencerCard from '@/components/brand/InfluencerCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BrandAssistant from '@/components/brand/BrandAssistant';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useWallet } from '@/hooks/useWallet';
import { useCampaigns } from '@/hooks/useCampaigns';
import { useInfluencers } from '@/hooks/useInfluencers';


// Sample data
const brandName = "FashionX";

const stats = [
  { label: "Active Campaigns", value: "6", icon: <Calendar className="w-4 h-4" /> },
  { label: "Pending Applications", value: "14", icon: <Users className="w-4 h-4" /> },
  { label: "Remaining Budget", value: "$12,500", icon: <DollarSign className="w-4 h-4" /> },
  { label: "Total Engagements", value: "42.3K", icon: <Heart className="w-4 h-4" /> }
];

const actionCards = [
  { title: "Create New Campaign", description: "Launch a new influencer marketing campaign", icon: <PlusCircle />, action: "create", color: "bg-gradient-to-br from-purple-500 to-indigo-600" },
  { title: "Invite Influencers", description: "Discover and collaborate with creators", icon: <Users />, action: "invite", color: "bg-gradient-to-br from-blue-500 to-cyan-600" },
  { title: "Track Performance", description: "Monitor your campaign metrics and ROI", icon: <LineChart />, action: "track", color: "bg-gradient-to-br from-emerald-500 to-teal-600" },
  { title: "Fund Wallet", description: "Add funds to your campaign budget", icon: <Wallet />, action: "fund", color: "bg-gradient-to-br from-amber-500 to-orange-600" }
];

// Updated campaigns data with literal status types instead of generic strings
const campaigns = [
  {
    id: 1,
    name: "Summer Collection Launch",
    status: "live" as const, // Using 'as const' to ensure it's the literal type
    startDate: "2025-05-01",
    endDate: "2025-06-15",
    budget: 8000,
    spent: 3200,
    stats: { views: "128K", likes: "7.8K", clicks: "4.3K" }
  },
  {
    id: 2,
    name: "Limited Edition Sneakers",
    status: "draft" as const,
    startDate: "2025-05-20",
    endDate: "2025-06-20",
    budget: 5000,
    spent: 0,
    stats: { views: "-", likes: "-", clicks: "-" }
  },
  {
    id: 3,
    name: "Spring Accessories",
    status: "completed" as const,
    startDate: "2025-03-01",
    endDate: "2025-04-15",
    budget: 6500,
    spent: 6200,
    stats: { views: "243K", likes: "12.9K", clicks: "8.7K" }
  }
];

const topInfluencers = [
  {
    id: 1,
    name: "@fashion_lisa",
    profileImage: "https://i.pravatar.cc/150?img=1",
    platform: "Instagram",
    engagementRate: "8.4%",
    cost: 1200,
    roi: 3.2
  },
  {
    id: 2,
    name: "@styleWithMike",
    profileImage: "https://i.pravatar.cc/150?img=3",
    platform: "YouTube",
    engagementRate: "7.2%",
    cost: 2000,
    roi: 2.8
  },
  {
    id: 3,
    name: "@trendyJenny",
    profileImage: "https://i.pravatar.cc/150?img=5",
    platform: "TikTok",
    engagementRate: "9.6%",
    cost: 800,
    roi: 4.1
  }
];

const BrandHomePage = () => {
  const navigate = useNavigate();
  const [showAssistant, setShowAssistant] = useState(false);
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { addFunds, getTransactionHistory } = useWallet();
  const { createCampaign, updateCampaignStatus, deleteCampaign } = useCampaigns();
  const { inviteInfluencers } = useInfluencers();
  const [campaignLoading, setCampaignLoading] = useState<number | null>(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [newCampaignData, setNewCampaignData] = useState({
    name: '',
    budget: '',
    startDate: '',
    endDate: ''
  });
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);

  const handleActionClick = async (action: string) => {
    setIsLoading(true);
    try {
      switch (action) {
        case 'create':
          setShowNewCampaignModal(true);
          break;
        case 'invite':
          const result = await inviteInfluencers();
          if (result.success) {
            toast.success('Influencer invitations sent successfully');
            navigate('/influencers');
          } else {
            toast.error(result.error || 'Failed to invite influencers');
          }
          break;
        case 'track':
          navigate('/analytics');
          break;
        case 'fund':
          const fundResult = await addFunds();
          if (fundResult.success) {
            toast.success('Wallet funded successfully');
            navigate('/wallet');
          } else {
            toast.error(fundResult.error || 'Failed to fund wallet');
          }
          break;
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Action error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCampaignAction = async (campaignId: number, action: string) => {
    setCampaignLoading(campaignId);
    try {
      switch (action) {
        case 'view':
          navigate(`/campaigns/${campaignId}`);
          break;
        case 'edit':
          navigate(`/campaigns/${campaignId}/edit`);
          break;
        case 'delete':
          const confirmDelete = window.confirm('Are you sure you want to delete this campaign?');
          if (confirmDelete) {
            const result = await deleteCampaign(campaignId);
            if (result.success) {
              toast.success('Campaign deleted successfully');
              // Refresh campaigns list
              window.location.reload();
            } else {
              toast.error(result.error || 'Failed to delete campaign');
            }
          }
          break;
        case 'pause':
        case 'resume':
          const newStatus = action === 'pause' ? 'paused' : 'live';
          const result = await updateCampaignStatus(campaignId, newStatus);
          if (result.success) {
            toast.success(`Campaign ${action === 'pause' ? 'paused' : 'resumed'} successfully`);
            // Refresh campaigns list
            window.location.reload();
          } else {
            toast.error(result.error || `Failed to ${action} campaign`);
          }
          break;
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Campaign action error:', error);
    } finally {
      setCampaignLoading(null);
    }
  };

  const handleWalletAction = async (action: string) => {
    setWalletLoading(true);
    try {
      switch (action) {
        case 'add-funds':
          const result = await addFunds();
          if (result.success) {
            toast.success('Funds added successfully');
            navigate('/wallet');
          } else {
            toast.error(result.error || 'Failed to add funds');
          }
          break;
        case 'view-history':
          navigate('/wallet/history');
          break;
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Wallet action error:', error);
    } finally {
      setWalletLoading(false);
    }
  };

  const handleNewCampaignSubmit = async () => {
    if (!newCampaignData.name || !newCampaignData.budget || !newCampaignData.startDate || !newCampaignData.endDate) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsCreatingCampaign(true);
    try {
      const result = await createCampaign({
        name: newCampaignData.name,
        budget: parseFloat(newCampaignData.budget),
        startDate: newCampaignData.startDate,
        endDate: newCampaignData.endDate
      });

      if (result.success) {
        toast.success('Campaign created successfully');
        setShowNewCampaignModal(false);
        setNewCampaignData({ name: '', budget: '', startDate: '', endDate: '' });
        // Refresh campaigns list
        window.location.reload();
      } else {
        toast.error(result.error || 'Failed to create campaign');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Create campaign error:', error);
    } finally {
      setIsCreatingCampaign(false);
    }
  };

  useEffect(() => {
    // Show assistant after 5 seconds for demo purposes
    const timer = setTimeout(() => {
      setShowAssistant(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout>
      <Helmet>
        <title>Brand Dashboard | Influencer Adsense</title>
      </Helmet>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Banner / Quick Summary */}
        <BrandWelcomeBanner brandName={brandName} stats={stats} />
        
        {/* Action Cards / Call-to-Actions */}
        <section className="my-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {actionCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ActionCard 
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  color={card.color}
                  onClick={() => handleActionClick(card.action)}
                  isLoading={isLoading}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Campaign Overview */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Campaigns</h2>
              <Link to="/campaigns">
                <Button variant="outline" size="sm" className="flex items-center">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CampaignCard 
                    campaign={campaign} 
                    onAction={handleCampaignAction}
                    isLoading={campaignLoading === campaign.id}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Influencer Insights & Wallet Summary */}
          <div className="space-y-6">
            {/* Top Influencers */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Top Performing Influencers</CardTitle>
                  <Badge variant="outline" className="font-normal">AI Picked</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {topInfluencers.map((influencer, index) => (
                  <motion.div
                    key={influencer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  >
                    <InfluencerCard influencer={influencer} />
                  </motion.div>
                ))}
                <Link to="/influencers">
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    View All Influencers <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Wallet Summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">$24,850.00</div>
                  <p className="text-muted-foreground text-sm mb-4">Available Balance</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last transaction</span>
                      <span>Campaign funding: +$5,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pending payments</span>
                      <span>$1,250.00</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleWalletAction('add-funds')}
                      disabled={walletLoading}
                    >
                      <DollarSign className="mr-1 h-4 w-4" /> 
                      {walletLoading ? 'Processing...' : 'Add Funds'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleWalletAction('view-history')}
                      disabled={walletLoading}
                    >
                      History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Analytics Preview */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Performance Analytics</h2>
            <Link to="/analytics">
              <Button variant="outline" size="sm">
                View Detailed Analytics <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Engagement Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Engagement Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex flex-col justify-center items-center">
                  <div className="flex space-x-8 items-end h-32">
                    <div className="flex flex-col items-center">
                      <div className="bg-purple-500 w-8 h-24 rounded-t-md"></div>
                      <span className="text-xs mt-2">Views</span>
                      <span className="text-xs font-semibold">320K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-500 w-8 h-16 rounded-t-md"></div>
                      <span className="text-xs mt-2">Likes</span>
                      <span className="text-xs font-semibold">18.6K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-green-500 w-8 h-12 rounded-t-md"></div>
                      <span className="text-xs mt-2">Clicks</span>
                      <span className="text-xs font-semibold">12.3K</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Reach by Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-8 border-gray-100 relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full">
                        {/* Instagram - 45% */}
                        <div className="absolute inset-0" style={{ 
                          clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 45%, 50% 45%)' 
                        }}>
                          <div className="w-full h-full bg-pink-500 flex items-center justify-center">
                            <Instagram className="h-6 w-6 text-white absolute top-8 right-8" />
                          </div>
                        </div>
                        
                        {/* YouTube - 30% */}
                        <div className="absolute inset-0" style={{ 
                          clipPath: 'polygon(50% 50%, 100% 45%, 100% 75%, 50% 75%)' 
                        }}>
                          <div className="w-full h-full bg-red-500">
                            <Youtube className="h-6 w-6 text-white absolute bottom-8 right-8" />
                          </div>
                        </div>
                        
                        {/* Facebook - 25% */}
                        <div className="absolute inset-0" style={{ 
                          clipPath: 'polygon(50% 50%, 50% 75%, 100% 75%, 0% 75%, 0% 0%, 50% 0%)' 
                        }}>
                          <div className="w-full h-full bg-blue-600">
                            <Facebook className="h-6 w-6 text-white absolute top-8 left-8" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center z-10">
                      <Eye className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ROI Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">ROI Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 space-y-4 flex flex-col justify-center">
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">Cost per Click (CPC)</span>
                      <span className="text-xs font-bold">$1.24</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">Cost per Mile (CPM)</span>
                      <span className="text-xs font-bold">$8.50</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">Return on Ad Spend</span>
                      <span className="text-xs font-bold">3.2x</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>
        
        {/* AI Assistant */}
        <AnimatePresence>
          {showAssistant && (
            <BrandAssistant onClose={() => setShowAssistant(false)} />
          )}
        </AnimatePresence>

        {/* New Campaign Modal */}
        <Dialog open={showNewCampaignModal} onOpenChange={setShowNewCampaignModal}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label htmlFor="campaignName" className="text-sm font-medium mb-1 block">
                  Campaign Name
                </label>
                <Input 
                  id="campaignName" 
                  placeholder="Enter campaign name"
                  value={newCampaignData.name}
                  onChange={(e) => setNewCampaignData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="campaignBudget" className="text-sm font-medium mb-1 block">
                  Budget
                </label>
                <Input 
                  id="campaignBudget" 
                  type="number" 
                  placeholder="Enter budget amount"
                  value={newCampaignData.budget}
                  onChange={(e) => setNewCampaignData(prev => ({ ...prev, budget: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="text-sm font-medium mb-1 block">
                    Start Date
                  </label>
                  <Input 
                    id="startDate" 
                    type="date"
                    value={newCampaignData.startDate}
                    onChange={(e) => setNewCampaignData(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="text-sm font-medium mb-1 block">
                    End Date
                  </label>
                  <Input 
                    id="endDate" 
                    type="date"
                    value={newCampaignData.endDate}
                    onChange={(e) => setNewCampaignData(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Button 
                  className="w-full"
                  onClick={handleNewCampaignSubmit}
                  disabled={isCreatingCampaign}
                >
                  {isCreatingCampaign ? 'Creating...' : 'Continue to Next Step'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default BrandHomePage;
