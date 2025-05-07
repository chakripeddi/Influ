import React, { useState } from 'react';
import { 
  AlertCircle, 
  Calendar,
  Download, 
  Filter,
  Eye,
  Clock,
  BellRing,
  Users,
  LineChart,
  DollarSign,
  Share2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for AI alerts
const mockAlerts = [
  {
    id: "alert_123",
    type: "suspicious_growth",
    category: "influencer",
    severity: "high",
    subject: "Abnormal follower growth detected",
    description: "User ID: INF-1234 gained 15,000 followers in 24 hours, 80% from same geo region.",
    relatedEntityId: "usr_123",
    relatedEntityType: "user",
    createdAt: "2023-05-30T08:30:00",
    status: "open",
    aiConfidence: 92
  },
  {
    id: "alert_124",
    type: "payment_anomaly",
    category: "wallet",
    severity: "high",
    subject: "Unusual transaction pattern detected",
    description: "Multiple small withdrawals followed by one large withdrawal for User ID: USR-5678.",
    relatedEntityId: "tx_4567",
    relatedEntityType: "transaction",
    createdAt: "2023-05-29T14:45:00",
    status: "open",
    aiConfidence: 87
  },
  {
    id: "alert_125",
    type: "content_violation",
    category: "campaign",
    severity: "medium",
    subject: "Potential misleading claims in campaign",
    description: "Campaign ID: CAMP-7890 contains claims that may violate health guidelines.",
    relatedEntityId: "camp_125",
    relatedEntityType: "campaign",
    createdAt: "2023-05-29T09:15:00",
    status: "investigating",
    aiConfidence: 78
  },
  {
    id: "alert_126",
    type: "fake_engagement",
    category: "influencer",
    severity: "medium",
    subject: "Bot-like engagement pattern",
    description: "User ID: INF-2468 shows unusual comment patterns indicative of automated engagement.",
    relatedEntityId: "usr_126",
    relatedEntityType: "user",
    createdAt: "2023-05-28T16:20:00",
    status: "resolved",
    aiConfidence: 84
  },
  {
    id: "alert_127",
    type: "referral_abuse",
    category: "referral",
    severity: "high",
    subject: "Potential referral system manipulation",
    description: "User ID: CAM-1357 created multiple accounts with similar IPs to claim referral bonuses.",
    relatedEntityId: "usr_127",
    relatedEntityType: "user",
    createdAt: "2023-05-28T11:05:00",
    status: "open",
    aiConfidence: 95
  }
];

const AIAlerts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  
  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'high':
        return <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> High
        </Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> Medium
        </Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> Low
        </Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'open':
        return <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200 flex items-center gap-1">
          <Clock className="h-3 w-3" /> Open
        </Badge>;
      case 'investigating':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200 flex items-center gap-1">
          <Eye className="h-3 w-3" /> Investigating
        </Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Resolved
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'influencer':
        return <Users className="h-5 w-5" />;
      case 'campaign':
        return <LineChart className="h-5 w-5" />;
      case 'wallet':
        return <DollarSign className="h-5 w-5" />;
      case 'referral':
        return <Share2 className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };
  
  const filteredAlerts = mockAlerts
    .filter(alert => 
      alert.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(alert => 
      selectedTab === 'all' || 
      (selectedTab === 'open' && alert.status === 'open') ||
      (selectedTab === 'investigating' && alert.status === 'investigating') ||
      (selectedTab === 'resolved' && alert.status === 'resolved')
    );

  const alertsByCategory = {
    influencer: mockAlerts.filter(alert => alert.category === 'influencer').length,
    campaign: mockAlerts.filter(alert => alert.category === 'campaign').length,
    wallet: mockAlerts.filter(alert => alert.category === 'wallet').length,
    referral: mockAlerts.filter(alert => alert.category === 'referral').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Alerts Dashboard</h1>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="h-4 w-4" /> Export Report
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Alerts
            </CardTitle>
            <div className="rounded-md p-1">
              <BellRing className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAlerts.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Open Alerts
            </CardTitle>
            <div className="rounded-md p-1">
              <AlertCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAlerts.filter(a => a.status === 'open').length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              High Severity
            </CardTitle>
            <div className="rounded-md p-1">
              <AlertCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAlerts.filter(a => a.severity === 'high').length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              AI Confidence
            </CardTitle>
            <div className="rounded-md p-1">
              <LineChart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockAlerts.reduce((acc, curr) => acc + curr.aiConfidence, 0) / mockAlerts.length)}%
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-4">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Alert Categories</CardTitle>
              <CardDescription>Distribution by entity type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Influencer</span>
                  </div>
                  <Badge variant="outline">{alertsByCategory.influencer}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LineChart className="h-4 w-4" />
                    <span className="text-sm">Campaign</span>
                  </div>
                  <Badge variant="outline">{alertsByCategory.campaign}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">Wallet</span>
                  </div>
                  <Badge variant="outline">{alertsByCategory.wallet}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">Referral</span>
                  </div>
                  <Badge variant="outline">{alertsByCategory.referral}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>AI-Generated Alerts</CardTitle>
              <CardDescription>
                Automatically detected issues requiring review
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="search"
                  placeholder="Search alerts..."
                  className="max-w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Severity: High</DropdownMenuItem>
                    <DropdownMenuItem>Severity: Medium</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Category: Influencer</DropdownMenuItem>
                    <DropdownMenuItem>Category: Campaign</DropdownMenuItem>
                    <DropdownMenuItem>Category: Wallet</DropdownMenuItem>
                    <DropdownMenuItem>Category: Referral</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>AI Confidence: &gt; 90%</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" onValueChange={setSelectedTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Alerts</TabsTrigger>
                  <TabsTrigger value="open">Open</TabsTrigger>
                  <TabsTrigger value="investigating">Investigating</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
                
                <TabsContent value={selectedTab} className="space-y-4">
                  {filteredAlerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`p-4 rounded-md border flex items-start gap-4 hover:bg-gray-50 transition-colors
                        ${alert.severity === 'high' ? 'border-l-4 border-l-red-500' : 
                          alert.severity === 'medium' ? 'border-l-4 border-l-yellow-500' : 
                          'border-l-4 border-l-blue-500'}`}
                    >
                      <div className="bg-gray-100 p-2 rounded-full">
                        {getCategoryIcon(alert.category)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-medium text-sm">{alert.subject}</h3>
                          {getSeverityBadge(alert.severity)}
                          {getStatusBadge(alert.status)}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {alert.description}
                        </p>
                        
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(alert.createdAt).toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">AI Confidence:</span>
                            <Badge 
                              variant="outline" 
                              className={`
                                ${alert.aiConfidence >= 90 ? 'bg-green-50 text-green-800 border-green-200' : 
                                  alert.aiConfidence >= 75 ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : 
                                  'bg-red-50 text-red-800 border-red-200'}
                              `}
                            >
                              {alert.aiConfidence}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                  
                  {filteredAlerts.length === 0 && (
                    <div className="flex items-center justify-center p-8 text-muted-foreground">
                      No alerts found matching your filters
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAlerts;
