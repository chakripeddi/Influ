import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Target, 
  BarChart4, 
  Shield, 
  Sparkles, 
  Globe 
} from 'lucide-react';

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Connect with Influencers",
    description: "Find and collaborate with the perfect influencers for your brand across multiple social media platforms."
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Targeted Campaigns",
    description: "Create and manage influencer marketing campaigns that reach your specific target audience."
  },
  {
    icon: <BarChart4 className="h-6 w-6" />,
    title: "Performance Analytics",
    description: "Track campaign performance with detailed analytics and ROI metrics."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure Platform",
    description: "Enterprise-grade security to protect your brand and campaign data."
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "AI-Powered Matching",
    description: "Our AI algorithm matches your brand with the most relevant influencers."
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Reach",
    description: "Access influencers from around the world to expand your brand's reach."
  }
];

const AboutPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>About Us | Influencer Adsense</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Influencer Adsense</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're revolutionizing influencer marketing by connecting brands with the perfect creators
            through our AI-powered platform.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">
              To empower brands and influencers to create authentic, impactful partnerships
              that drive real business results through innovative technology and data-driven insights.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold mb-2">10K+</div>
              <p className="text-muted-foreground">Active Influencers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold mb-2">5K+</div>
              <p className="text-muted-foreground">Brand Partners</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold mb-2">50K+</div>
              <p className="text-muted-foreground">Successful Campaigns</p>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Our Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              We're a team of passionate individuals dedicated to transforming the influencer
              marketing landscape through technology and innovation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Sarah Johnson</h3>
                    <p className="text-muted-foreground">CEO & Founder</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">David Chen</h3>
                    <p className="text-muted-foreground">CTO</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                      <Target className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Emily Rodriguez</h3>
                    <p className="text-muted-foreground">Head of Marketing</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AboutPage; 