
import React from 'react';
import { 
  ArrowUpRight, 
  Users, 
  LineChart, 
  DollarSign, 
  Share2, 
  Shield, 
  ArrowDownRight 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  // Mock data for the dashboard
  const stats = [
    { 
      title: "Total Users", 
      value: "1,234", 
      change: "+12%", 
      trend: "up", 
      icon: <Users className="h-4 w-4" /> 
    },
    { 
      title: "Active Campaigns", 
      value: "45", 
      change: "+5%", 
      trend: "up", 
      icon: <LineChart className="h-4 w-4" /> 
    },
    { 
      title: "Monthly Revenue", 
      value: "$24,500", 
      change: "-3%", 
      trend: "down", 
      icon: <DollarSign className="h-4 w-4" /> 
    },
    { 
      title: "Referrals", 
      value: "312", 
      change: "+18%", 
      trend: "up", 
      icon: <Share2 className="h-4 w-4" /> 
    },
    { 
      title: "AI Alerts", 
      value: "8", 
      change: "New", 
      trend: "neutral", 
      icon: <Shield className="h-4 w-4" /> 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Last updated: {new Date().toLocaleTimeString()}</Badge>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="rounded-md p-1">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stat.trend === "up" && (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                )}
                {stat.trend === "down" && (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : ""}>
                  {stat.change}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent AI Alerts</CardTitle>
            <CardDescription>Suspicious activities detected by AI</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-2 pb-2 border-b">
                <Badge variant="destructive" className="mt-0.5">High</Badge>
                <div>
                  <p className="text-sm font-medium">Suspicious follower growth</p>
                  <p className="text-xs text-muted-foreground">
                    User ID: INF-1234 • 2 hours ago
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2 pb-2 border-b">
                <Badge variant="destructive" className="mt-0.5">High</Badge>
                <div>
                  <p className="text-sm font-medium">Payment anomaly detected</p>
                  <p className="text-xs text-muted-foreground">
                    Transaction ID: TX-9876 • 5 hours ago
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="secondary" className="mt-0.5 bg-yellow-500 hover:bg-yellow-600">Medium</Badge>
                <div>
                  <p className="text-sm font-medium">Unusual referral pattern</p>
                  <p className="text-xs text-muted-foreground">
                    User ID: CAM-5678 • 1 day ago
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Performing Campaigns</CardTitle>
            <CardDescription>Based on AI scoring algorithm</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between pb-2 border-b">
                <div>
                  <p className="text-sm font-medium">Summer Fashion Collection</p>
                  <p className="text-xs text-muted-foreground">Brand: FashionX</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">98/100</Badge>
              </li>
              <li className="flex items-center justify-between pb-2 border-b">
                <div>
                  <p className="text-sm font-medium">Fitness Supplement Launch</p>
                  <p className="text-xs text-muted-foreground">Brand: FitLife</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">92/100</Badge>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Tech Gadget Promo</p>
                  <p className="text-xs text-muted-foreground">Brand: TechGiant</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">89/100</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Rising Influencers</CardTitle>
            <CardDescription>AI recommendation engine picks</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between pb-2 border-b">
                <div>
                  <p className="text-sm font-medium">@fitness_laura</p>
                  <p className="text-xs text-muted-foreground">Category: Fitness • 125K followers</p>
                </div>
                <Badge variant="secondary">Rising Star</Badge>
              </li>
              <li className="flex items-center justify-between pb-2 border-b">
                <div>
                  <p className="text-sm font-medium">@tech_with_tim</p>
                  <p className="text-xs text-muted-foreground">Category: Tech • 87K followers</p>
                </div>
                <Badge variant="secondary">Rising Star</Badge>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">@culinary_kate</p>
                  <p className="text-xs text-muted-foreground">Category: Food • 65K followers</p>
                </div>
                <Badge variant="secondary">Rising Star</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
