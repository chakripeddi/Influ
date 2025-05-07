
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Instagram, Youtube, Facebook, Users, DollarSign, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>How It Works | Influencer Adsense</title>
      </Helmet>
      
      <div className="container py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">How Influencer Adsense Works</h1>
          <p className="text-xl text-muted-foreground">
            Our platform makes it simple for brands and influencers to connect, collaborate, and create impactful campaigns
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4">For Brands</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-light flex items-center justify-center">
                  <span className="font-semibold text-brand-dark">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Create Your Campaign</h3>
                  <p className="text-muted-foreground">
                    Define your campaign details, including budget, requirements, timeline, and deliverables.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-light flex items-center justify-center">
                  <span className="font-semibold text-brand-dark">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Review Applications</h3>
                  <p className="text-muted-foreground">
                    Browse and evaluate influencer applications based on their profiles, audience, and past work.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-light flex items-center justify-center">
                  <span className="font-semibold text-brand-dark">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Collaborate & Track</h3>
                  <p className="text-muted-foreground">
                    Work directly with selected influencers and track your campaign performance in real-time.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/signup?role=brand">
                <Button>Sign Up as a Brand</Button>
              </Link>
            </div>
          </div>
          
          <div className="order-1 md:order-2 bg-brand-light rounded-lg p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple opacity-20 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-purple opacity-20 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
            
            <div className="relative z-10">
              <Briefcase className="h-12 w-12 text-brand-dark mb-6" />
              <h3 className="text-2xl font-bold mb-4">Brand Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-purple flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Access to thousands of pre-verified influencers</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-purple flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Detailed analytics and ROI tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-purple flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Streamlined contracting and payments</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-purple flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Content rights management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div className="bg-brand-light rounded-lg p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-brand-purple opacity-20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-purple opacity-20 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
            
            <div className="relative z-10">
              <Users className="h-12 w-12 text-brand-dark mb-6" />
              <h3 className="text-2xl font-bold mb-4">Influencer Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-purple flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Discover campaigns that match your niche</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-purple flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Secure payment protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-purple flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Build relationships with global brands</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-purple flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Showcase your metrics and portfolio to brands</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">For Influencers</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-light flex items-center justify-center">
                  <span className="font-semibold text-brand-dark">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Create Your Profile</h3>
                  <p className="text-muted-foreground">
                    Showcase your audience demographics, content style, and previous brand collaborations.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-light flex items-center justify-center">
                  <span className="font-semibold text-brand-dark">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Browse & Apply</h3>
                  <p className="text-muted-foreground">
                    Find campaigns that match your niche and audience, then apply with your proposal.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-light flex items-center justify-center">
                  <span className="font-semibold text-brand-dark">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Create & Get Paid</h3>
                  <p className="text-muted-foreground">
                    Create authentic content for approved campaigns and receive secure payments.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/signup?role=influencer">
                <Button>Sign Up as an Influencer</Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of brands and influencers already using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg">Create Account</Button>
            </Link>
            <Link to="/campaigns">
              <Button size="lg" variant="outline">Browse Campaigns</Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const Briefcase = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
};

export default HowItWorks;
