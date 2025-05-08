import React, { useState } from 'react';
import { Search, Filter, Download, AlertCircle, CheckCircle2, XCircle, MoreVertical, UserPlus, Ban, Shield, UserCheck } from 'lucide-react';
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
import UserDetailsDialog from '@/components/admin/UserDetailsDialog';
import { useToast } from "@/components/ui/use-toast";

// Mock data
const mockUsers = [
  {
    id: "usr_123",
    email: "john@example.com",
    name: "John Smith",
    role: "influencer",
    status: "active",
    registeredAt: "2023-04-15",
    aiScore: 95,
    aiFlags: [],
    campaignsCompleted: 24,
    totalEarnings: "$5,420",
    followers: "120K"
  },
  {
    id: "usr_124",
    email: "sarah@brandx.com",
    name: "Sarah Johnson",
    role: "brand",
    status: "active",
    registeredAt: "2023-02-10",
    aiScore: 92,
    aiFlags: [],
    campaignsLaunched: 12,
    totalSpent: "$15,750",
  },
  {
    id: "usr_125",
    email: "mike@fitlife.com",
    name: "Mike Williams",
    role: "influencer",
    status: "flagged",
    registeredAt: "2023-06-22",
    aiScore: 62,
    aiFlags: ["suspicious_growth", "engagement_anomaly"],
    campaignsCompleted: 8,
    totalEarnings: "$2,150",
    followers: "85K"
  },
  {
    id: "usr_126",
    email: "techbrand@example.com",
    name: "Tech Innovations Inc",
    role: "brand",
    status: "active",
    registeredAt: "2023-03-05",
    aiScore: 98,
    aiFlags: [],
    campaignsLaunched: 18,
    totalSpent: "$32,420",
  },
  {
    id: "usr_127",
    email: "lisa@travelblog.com",
    name: "Lisa Travel",
    role: "influencer",
    status: "suspended",
    registeredAt: "2023-05-17",
    aiScore: 45,
    aiFlags: ["bot_followers", "fake_engagement"],
    campaignsCompleted: 5,
    totalEarnings: "$1,850",
    followers: "65K"
  },
];

const UsersManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  
  const handleOpenDetails = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
    setShowDetailsDialog(true);
  };

  const handleExport = () => {
    // Implement export functionality
    toast({
      title: "Exporting data",
      description: "Your user data is being exported...",
    });
  };

  const handleAddUser = () => {
    // Implement add user functionality
    toast({
      title: "Add User",
      description: "Opening user creation form...",
    });
  };

  const handleSuspendUser = (user: typeof mockUsers[0]) => {
    // Implement suspend user functionality
    toast({
      title: "User Suspended",
      description: `${user.name} has been suspended.`,
    });
  };

  const handleVerifyUser = (user: typeof mockUsers[0]) => {
    // Implement verify user functionality
    toast({
      title: "User Verified",
      description: `${user.name} has been verified.`,
    });
  };

  const handleAssignRole = (user: typeof mockUsers[0], role: string) => {
    // Implement role assignment functionality
    toast({
      title: "Role Updated",
      description: `${user.name}'s role has been updated to ${role}.`,
    });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'influencer':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Influencer</Badge>;
      case 'brand':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Brand</Badge>;
      case 'campaigner':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Campaigner</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
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
  
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!selectedFilter) return matchesSearch;
    
    switch (selectedFilter) {
      case 'influencer':
      case 'brand':
      case 'campaigner':
        return matchesSearch && user.role === selectedFilter;
      case 'active':
        return matchesSearch && user.status === 'active';
      case 'flagged':
        return matchesSearch && (user.status === 'flagged' || user.aiScore < 70);
      case 'suspended':
        return matchesSearch && user.status === 'suspended';
      case 'high-risk':
        return matchesSearch && user.aiScore < 70;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleAddUser}
          >
            <UserPlus className="h-4 w-4" /> Add User
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage all users and view AI analysis on each account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
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
                    <DropdownMenuItem onClick={() => setSelectedFilter('influencer')}>
                      Role: Influencer
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter('brand')}>
                      Role: Brand
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter('campaigner')}>
                      Role: Campaigner
                    </DropdownMenuItem>
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
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>AI Score</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status, user.aiScore)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span 
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs
                              ${user.aiScore >= 90 ? 'bg-green-100 text-green-800' : 
                                user.aiScore >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`}
                          >
                            {user.aiScore}
                          </span>
                          {user.aiFlags.length > 0 && (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              {user.aiFlags.length} {user.aiFlags.length === 1 ? 'flag' : 'flags'}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{user.registeredAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenDetails(user)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleVerifyUser(user)}>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Verify User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSuspendUser(user)}>
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Assign Role</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleAssignRole(user, 'admin')}>
                              <Shield className="mr-2 h-4 w-4" />
                              Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAssignRole(user, 'moderator')}>
                              <Shield className="mr-2 h-4 w-4" />
                              Moderator
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAssignRole(user, 'auditor')}>
                              <Shield className="mr-2 h-4 w-4" />
                              Auditor
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
      
      {selectedUser && showDetailsDialog && (
        <UserDetailsDialog
          user={selectedUser}
          open={showDetailsDialog}
          onOpenChange={setShowDetailsDialog}
        />
      )}
    </div>
  );
};

export default UsersManagement;
