
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Instagram, Youtube, Facebook, Users, DollarSign, TrendingUp } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import RoleSelect from '@/components/auth/RoleSelect';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-light to-white opacity-80 z-0" />
        <div className="container relative z-10 py-20 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            Connect <span className="gradient-text">Brands</span> with <span className="gradient-text">Influencers</span> Seamlessly
          </h1>
          <p className="text-xl max-w-3xl text-muted-foreground mb-10">
            The platform that brings together brands and influencers for impactful promotional campaigns across Instagram, YouTube, and Facebook.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/signup">
              <Button size="lg" className="font-medium">
                Get Started
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" size="lg" className="font-medium">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="bg-muted">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-sm bg-background">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="mb-4 p-3 rounded-full bg-brand-light">
                  <Users className="h-8 w-8 text-brand-dark" />
                </div>
                <h3 className="text-2xl font-bold mb-2">10,000+</h3>
                <p className="text-muted-foreground">Active Influencers</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm bg-background">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="mb-4 p-3 rounded-full bg-brand-light">
                  <DollarSign className="h-8 w-8 text-brand-dark" />
                </div>
                <h3 className="text-2xl font-bold mb-2">$5M+</h3>
                <p className="text-muted-foreground">Paid to Influencers</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm bg-background">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="mb-4 p-3 rounded-full bg-brand-light">
                  <TrendingUp className="h-8 w-8 text-brand-dark" />
                </div>
                <h3 className="text-2xl font-bold mb-2">3,500+</h3>
                <p className="text-muted-foreground">Completed Campaigns</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform makes it easy to create and manage influencer campaigns
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mb-6 w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-brand-dark">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Create Campaign</h3>
            <p className="text-muted-foreground">
              Brands create campaigns with clear requirements and budgets
            </p>
          </div>
          
          <div className="text-center">
            <div className="mb-6 w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-brand-dark">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Connect</h3>
            <p className="text-muted-foreground">
              Influencers discover and apply to suitable brand campaigns
            </p>
          </div>
          
          <div className="text-center">
            <div className="mb-6 w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-brand-dark">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Collaborate</h3>
            <p className="text-muted-foreground">
              Execute campaigns and track performance together
            </p>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="bg-muted/50">
        <div className="container py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Platforms We Support</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with audiences across major social media platforms
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center flex flex-col items-center">
                <div className="mb-6 p-3 rounded-full bg-pink-100">
                  <Instagram className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instagram</h3>
                <p className="text-muted-foreground">
                  Engage with audiences through visual content and stories
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center flex flex-col items-center">
                <div className="mb-6 p-3 rounded-full bg-red-100">
                  <Youtube className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">YouTube</h3>
                <p className="text-muted-foreground">
                  Create detailed video content and product demonstrations
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center flex flex-col items-center">
                <div className="mb-6 p-3 rounded-full bg-blue-100">
                  <Facebook className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Facebook</h3>
                <p className="text-muted-foreground">
                  Reach diverse demographics with varied content formats
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what brands and influencers are saying about our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4 items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center">
                  <span className="font-semibold text-brand-dark">SB</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Brown</h4>
                  <p className="text-sm text-muted-foreground">Fashion Influencer</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "I've collaborated with multiple fashion brands through Influencer Adsense, and the process has always been smooth. The platform makes it easy to find campaigns that align with my audience and style."
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4 items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center">
                  <span className="font-semibold text-brand-dark">MT</span>
                </div>
                <div>
                  <h4 className="font-semibold">Mark Thompson</h4>
                  <p className="text-sm text-muted-foreground">Marketing Director, TechGear</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "We've seen a 200% ROI on our campaigns run through Influencer Adsense. The quality of influencers and the targeting options have helped us reach exactly the right audience for our products."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-purple text-white">
        <div className="container py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Join thousands of brands and influencers already using our platform
            </p>
            <RoleSelect />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
