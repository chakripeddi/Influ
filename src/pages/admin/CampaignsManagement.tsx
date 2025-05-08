import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, AlertCircle, CheckCircle2, XCircle, MoreVertical, Plus, Flag, CheckCircle, Ban, LineChart } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

// Mock data for campaigns
const mockCampaigns = [
  {
    id: "camp_123",
    title: "Summer Fashion Collection",
    brand: "FashionX",
    status: "active",
    aiScore: 98,
    aiFlags: [],
    createdAt: "2023-05-15",
    deadline: "2023-07-30",
    budget: "$5,000-$8,000",
    applicants: 24,
    category: "Fashion"
  },
  {
    id: "camp_124",
    title: "Fitness Supplement Launch",
    brand: "FitLife",
    status: "active",
    aiScore: 92,
    aiFlags: [],
    createdAt: "2023-04-20",
    deadline: "2023-06-15",
    budget: "$10,000-$15,000",
    applicants: 36,
    category: "Health & Fitness"
  },
  {
    id: "camp_125",
    title: "Tech Gadget Promo",
    brand: "TechGiant",
    status: "completed",
    aiScore: 89,
    aiFlags: [],
    createdAt: "2023-03-10",
    deadline: "2023-05-20",
    budget: "$12,000-$18,000",
    applicants: 42,
    category: "Technology"
  },
  {
    id: "camp_126",
    title: "Skincare Product Launch",
    brand: "GlowBeauty",
    status: "flagged",
    aiScore: 65,
    aiFlags: ["unrealistic_expectations", "misleading_claims"],
    createdAt: "2023-05-05",
    deadline: "2023-08-10",
    budget: "$8,000-$12,000",
    applicants: 18,
    category: "Beauty"
  },
  {
    id: "camp_127",
    title: "Cooking Appliance Promotion",
    brand: "HomeChef",
    status: "rejected",
    aiScore: 45,
    aiFlags: ["prohibited_claims", "policy_violation"],
    createdAt: "2023-05-25",
    deadline: "2023-07-15",
    budget: "$3,000-$5,000",
    applicants: 5,
    category: "Home & Kitchen"
  }
];

const CampaignsManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  
  const handleExport = async () => {
    try {
      setIsExporting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create CSV content
      const headers = ['ID', 'Title', 'Brand', 'Status', 'AI Score', 'Budget', 'Created At', 'Deadline'];
      const csvContent = [
        headers.join(','),
        ...campaigns.map(campaign => [
          campaign.id,
          campaign.title,
          campaign.brand,
          campaign.status,
          campaign.aiScore,
          campaign.budget,
          campaign.createdAt,
          campaign.deadline
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `campaigns-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: "Your campaign data has been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCreateCampaign = () => {
    setIsCreating(true);
    // Navigate to campaign creation page
    navigate('/campaigns/create');
  };

  const handleApproveCampaign = async (campaign: typeof campaigns[0]) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update campaign status in state
      setCampaigns(campaigns.map(c => 
        c.id === campaign.id ? { ...c, status: 'active', aiScore: Math.min(100, c.aiScore + 10) } : c
      ));
      
      toast({
        title: "Campaign Approved",
        description: `${campaign.title} has been approved and is now active.`,
      });
    } catch (error) {
      toast({
        title: "Approval Failed",
        description: "There was an error approving the campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFlagCampaign = async (campaign: typeof campaigns[0]) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update campaign status in state
      setCampaigns(campaigns.map(c => 
        c.id === campaign.id ? { ...c, status: 'flagged' } : c
      ));
      
      toast({
        title: "Campaign Flagged",
        description: `${campaign.title} has been flagged for review.`,
      });
    } catch (error) {
      toast({
        title: "Flagging Failed",
        description: "There was an error flagging the campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSuspendCampaign = async (campaign: typeof campaigns[0]) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update campaign status in state
      setCampaigns(campaigns.map(c => 
        c.id === campaign.id ? { ...c, status: 'suspended' } : c
      ));
      
      toast({
        title: "Campaign Suspended",
        description: `${campaign.title} has been suspended.`,
      });
    } catch (error) {
      toast({
        title: "Suspension Failed",
        description: "There was an error suspending the campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewCampaign = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  const getStatusBadge = (status: string, aiScore: number) => {
    if (status === 'suspended') {
      return <Badge variant="destructive" className="flex items-center gap-1">
        <XCircle className="h-3 w-3" /> Suspended
      </Badge>;
    } 
    
    if (status === 'flagged' || aiScore < 70) {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200 flex items-center gap-1">
        <AlertCircle className="h-3 w-3" /> Flagged
      </Badge>;
    }
    
    return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 flex items-center gap-1">
      <CheckCircle2 className="h-3 w-3" /> Active
    </Badge>;
  };
  
  const getCategoryBadge = (category: string) => {
    switch(category) {
      case 'Fashion':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">{category}</Badge>;
      case 'Health & Fitness':
        return <Badge className="bg-green-100 text-green-800 border-green-200">{category}</Badge>;
      case 'Technology':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{category}</Badge>;
      case 'Beauty':
        return <Badge className="bg-pink-100 text-pink-800 border-pink-200">{category}</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{category}</Badge>;
    }
  };
  
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = 
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!selectedFilter) return matchesSearch;
    
    switch (selectedFilter) {
      case 'active':
        return matchesSearch && campaign.status === 'active';
      case 'flagged':
        return matchesSearch && (campaign.status === 'flagged' || campaign.aiScore < 70);
      case 'suspended':
        return matchesSearch && campaign.status === 'suspended';
      case 'high-risk':
        return matchesSearch && campaign.aiScore < 70;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Campaigns Management</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleCreateCampaign}
            disabled={isCreating}
          >
            <Plus className="h-4 w-4" /> {isCreating ? 'Creating...' : 'Create Campaign'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleExport}
            disabled={isExporting}
          >
            <Download className="h-4 w-4" /> {isExporting ? 'Exporting...' : 'Export'}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Campaigns
            </CardTitle>
            <div className="rounded-md p-1">
              <LineChart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Campaigns
            </CardTitle>
            <div className="rounded-md p-1">
              <LineChart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.filter(c => c.status === 'active').length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Flagged Campaigns
            </CardTitle>
            <div className="rounded-md p-1">
              <LineChart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.filter(c => c.status === 'flagged' || c.aiFlags.length > 0).length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Suspended Campaigns
            </CardTitle>
            <div className="rounded-md p-1">
              <LineChart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.filter(c => c.status === 'suspended').length}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>
            Manage all campaigns and view AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search campaigns..."
                  className="pl-8 w-full sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSelectedFilter('active')}>
                      Status: Active
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter('flagged')}>
                      Status: Flagged
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter('suspended')}>
                      Status: Suspended
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSelectedFilter('high-risk')}>
                      AI Score: High Risk
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSelectedFilter(null)}>
                      Clear Filters
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>AI Score</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{campaign.title}</div>
                          <div className="text-xs text-muted-foreground">{campaign.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{campaign.brand}</TableCell>
                      <TableCell>{getStatusBadge(campaign.status, campaign.aiScore)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span 
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs
                              ${campaign.aiScore >= 90 ? 'bg-green-100 text-green-800' : 
                                campaign.aiScore >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`}
                          >
                            {campaign.aiScore}
                          </span>
                          {campaign.aiFlags.length > 0 && (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              {campaign.aiFlags.length} {campaign.aiFlags.length === 1 ? 'flag' : 'flags'}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{campaign.budget}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewCampaign(campaign.id)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleApproveCampaign(campaign)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve Campaign
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFlagCampaign(campaign)}>
                              <Flag className="mr-2 h-4 w-4" />
                              Flag for Review
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSuspendCampaign(campaign)}>
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend Campaign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignsManagement;
