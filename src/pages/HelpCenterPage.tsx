import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  Video, 
  FileText,
  ChevronRight,
  HelpCircle,
  Settings,
  CreditCard,
  Users,
  BarChart4
} from 'lucide-react';

const categories = [
  {
    title: "Getting Started",
    icon: <BookOpen className="h-6 w-6" />,
    articles: [
      "How to Create Your First Campaign",
      "Setting Up Your Profile",
      "Understanding the Dashboard",
      "Platform Overview"
    ]
  },
  {
    title: "Campaign Management",
    icon: <BarChart4 className="h-6 w-6" />,
    articles: [
      "Creating and Managing Campaigns",
      "Setting Campaign Budgets",
      "Tracking Campaign Performance",
      "Campaign Analytics"
    ]
  },
  {
    title: "Influencer Collaboration",
    icon: <Users className="h-6 w-6" />,
    articles: [
      "Finding the Right Influencers",
      "Managing Collaborations",
      "Content Guidelines",
      "Payment and Compensation"
    ]
  },
  {
    title: "Account & Billing",
    icon: <CreditCard className="h-6 w-6" />,
    articles: [
      "Account Settings",
      "Billing and Payments",
      "Subscription Plans",
      "Security Settings"
    ]
  }
];

const HelpCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MainLayout>
      <Helmet>
        <title>Help Center | Influencer Adsense</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to your questions about using Influencer Adsense
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Contact Support</h3>
                  <p className="text-sm text-muted-foreground">Get help from our team</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Video Tutorials</h3>
                  <p className="text-sm text-muted-foreground">Watch how-to guides</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Documentation</h3>
                  <p className="text-sm text-muted-foreground">Read detailed guides</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">FAQs</h3>
                  <p className="text-sm text-muted-foreground">Common questions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Card key={category.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {category.icon}
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.articles.map((article) => (
                    <li key={article}>
                      <Link 
                        to="#" 
                        className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                      >
                        <span>{article}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Still need help?</CardTitle>
            <CardDescription>
              Our support team is here to help you with any questions or issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat with Support
              </Button>
              <Button className="flex-1">
                <Settings className="mr-2 h-4 w-4" />
                Submit a Ticket
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default HelpCenterPage; 