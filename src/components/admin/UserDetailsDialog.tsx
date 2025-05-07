
import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  User, 
  BarChart, 
  Shield, 
  DollarSign 
} from 'lucide-react';

interface UserDetailsDialogProps {
  user: any; // Replace with proper type
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ 
  user, 
  open, 
  onOpenChange 
}) => {
  const getAIStatusInfo = (aiScore: number) => {
    if (aiScore >= 90) {
      return {
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
        label: 'Trustworthy',
        description: 'This account has a high trust score with no suspicious activities detected',
        color: 'text-green-700'
      };
    } else if (aiScore >= 70) {
      return {
        icon: <AlertCircle className="h-4 w-4 text-yellow-500" />,
        label: 'Monitor',
        description: 'This account shows some patterns that may need monitoring',
        color: 'text-yellow-700'
      };
    } else {
      return {
        icon: <XCircle className="h-4 w-4 text-red-500" />,
        label: 'High Risk',
        description: 'This account shows multiple suspicious activities that require attention',
        color: 'text-red-700'
      };
    }
  };
  
  const aiStatus = getAIStatusInfo(user.aiScore);
  
  const getFlagDescription = (flag: string) => {
    switch(flag) {
      case 'suspicious_growth':
        return 'Unusual follower growth pattern detected';
      case 'engagement_anomaly':
        return 'Engagement metrics don\'t match audience size';
      case 'bot_followers':
        return 'High percentage of suspected bot followers';
      case 'fake_engagement':
        return 'Artificial engagement patterns detected';
      default:
        return flag;
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span>User Details</span>
            <Badge>{user.id}</Badge>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Complete profile and AI analysis for this user
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="ai-analysis" className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> AI Analysis
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" /> Performance
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Financial
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Basic Information</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Name</div>
                  <div className="text-sm">{user.name}</div>
                  
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-sm">{user.email}</div>
                  
                  <div className="text-sm font-medium">Role</div>
                  <div className="text-sm">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
                  
                  <div className="text-sm font-medium">Status</div>
                  <div className="text-sm">{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</div>
                  
                  <div className="text-sm font-medium">Registered</div>
                  <div className="text-sm">{user.registeredAt}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Role-specific Information</h3>
                <div className="grid grid-cols-2 gap-2">
                  {user.role === 'influencer' && (
                    <>
                      <div className="text-sm font-medium">Followers</div>
                      <div className="text-sm">{user.followers}</div>
                      
                      <div className="text-sm font-medium">Campaigns Completed</div>
                      <div className="text-sm">{user.campaignsCompleted}</div>
                      
                      <div className="text-sm font-medium">Total Earnings</div>
                      <div className="text-sm">{user.totalEarnings}</div>
                    </>
                  )}
                  
                  {user.role === 'brand' && (
                    <>
                      <div className="text-sm font-medium">Campaigns Launched</div>
                      <div className="text-sm">{user.campaignsLaunched}</div>
                      
                      <div className="text-sm font-medium">Total Spent</div>
                      <div className="text-sm">{user.totalSpent}</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ai-analysis" className="space-y-4">
            <div className="flex items-center gap-2 p-4 rounded-md bg-gray-50">
              {aiStatus.icon}
              <div>
                <h3 className={`font-medium ${aiStatus.color}`}>{aiStatus.label}</h3>
                <p className="text-sm text-muted-foreground">{aiStatus.description}</p>
              </div>
              <div className="ml-auto">
                <div className={`text-2xl font-bold ${aiStatus.color}`}>{user.aiScore}/100</div>
                <div className="text-xs text-muted-foreground text-right">Trust Score</div>
              </div>
            </div>
            
            {user.aiFlags.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">AI Detected Flags</h3>
                <ul className="space-y-2">
                  {user.aiFlags.map((flag: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 p-2 rounded-md bg-red-50">
                      <AlertCircle className="h-4 w-4 mt-0.5 text-red-500" />
                      <div>
                        <p className="text-sm font-medium text-red-700">{flag.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                        <p className="text-xs text-red-600">{getFlagDescription(flag)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {user.aiFlags.length === 0 && (
              <div className="p-4 rounded-md bg-green-50 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <p className="text-sm text-green-700">No suspicious activities detected for this account</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Performance metrics and campaign history for this user
            </p>
            
            {user.role === 'influencer' && (
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Campaign Performance</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-2xl font-bold">{user.campaignsCompleted}</div>
                      <div className="text-xs text-muted-foreground">Campaigns Completed</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-2xl font-bold">92%</div>
                      <div className="text-xs text-muted-foreground">On-time Delivery Rate</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-2xl font-bold">4.8/5</div>
                      <div className="text-xs text-muted-foreground">Brand Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {user.role === 'brand' && (
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Campaign Performance</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-2xl font-bold">{user.campaignsLaunched}</div>
                      <div className="text-xs text-muted-foreground">Campaigns Launched</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-2xl font-bold">87%</div>
                      <div className="text-xs text-muted-foreground">Campaign Success Rate</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-2xl font-bold">4.6/5</div>
                      <div className="text-xs text-muted-foreground">Influencer Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="financial" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Financial details and transaction history
            </p>
            
            {user.role === 'influencer' && (
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Earnings Summary</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-2xl font-bold">{user.totalEarnings}</div>
                      <div className="text-xs text-muted-foreground">Total Earnings</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-2xl font-bold">$825</div>
                      <div className="text-xs text-muted-foreground">Last Month</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-2xl font-bold">$2,150</div>
                      <div className="text-xs text-muted-foreground">Available for Withdrawal</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {user.role === 'brand' && (
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Spending Summary</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-2xl font-bold">{user.totalSpent}</div>
                      <div className="text-xs text-muted-foreground">Total Spent</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-2xl font-bold">$4,250</div>
                      <div className="text-xs text-muted-foreground">Last Month</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="text-2xl font-bold">$8,500</div>
                      <div className="text-xs text-muted-foreground">Available Balance</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <AlertDialogFooter>
          {user.status !== 'suspended' ? (
            <Button variant="destructive">Suspend User</Button>
          ) : (
            <Button variant="outline">Reinstate User</Button>
          )}
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserDetailsDialog;
