
import React, { useState } from 'react';
import { Search, Filter, Download, AlertCircle, CheckCircle2, XCircle, LineChart } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Active
        </Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Completed
        </Badge>;
      case 'flagged':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> Flagged
        </Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" /> Rejected
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
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
  
  const filteredCampaigns = mockCampaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Campaigns Management</h1>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="h-4 w-4" /> Export
        </Button>
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
            <div className="text-2xl font-bold">{mockCampaigns.length}</div>
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
            <div className="text-2xl font-bold">{mockCampaigns.filter(c => c.status === 'active').length}</div>
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
            <div className="text-2xl font-bold">{mockCampaigns.filter(c => c.status === 'flagged' || c.aiFlags.length > 0).length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average AI Score
            </CardTitle>
            <div className="rounded-md p-1">
              <LineChart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockCampaigns.reduce((acc, curr) => acc + curr.aiScore, 0) / mockCampaigns.length)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>
            Review and moderate all campaigns on the platform
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
                    <DropdownMenuItem>Status: Active</DropdownMenuItem>
                    <DropdownMenuItem>Status: Completed</DropdownMenuItem>
                    <DropdownMenuItem>Status: Flagged</DropdownMenuItem>
                    <DropdownMenuItem>Status: Rejected</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Category: Fashion</DropdownMenuItem>
                    <DropdownMenuItem>Category: Technology</DropdownMenuItem>
                    <DropdownMenuItem>Category: Beauty</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>AI Score: High Risk</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>AI Score</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{campaign.title}</div>
                          <div className="text-xs text-muted-foreground">by {campaign.brand}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell>{getCategoryBadge(campaign.category)}</TableCell>
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
                      <TableCell>{campaign.createdAt}</TableCell>
                      <TableCell>{campaign.deadline}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
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
