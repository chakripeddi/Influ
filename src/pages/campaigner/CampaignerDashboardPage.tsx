
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import CampaignerDashboard from '@/components/referral/CampaignerDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const CampaignerDashboardPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Campaigner Dashboard</title>
      </Helmet>
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Campaigner Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your referrals and track your earnings
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <CampaignerDashboard />
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">How It Works</h2>
              <div className="bg-card rounded-lg border p-6">
                <Tabs defaultValue="brand">
                  <TabsList>
                    <TabsTrigger value="brand">Brand Referrals</TabsTrigger>
                    <TabsTrigger value="influencer">Influencer Invites</TabsTrigger>
                  </TabsList>
                  <TabsContent value="brand" className="mt-4">
                    <ol className="list-decimal pl-5 space-y-4">
                      <li className="pl-2">
                        <strong>Share Your Brand Link:</strong> Copy your unique brand referral link and share it with businesses looking to work with influencers.
                      </li>
                      <li className="pl-2">
                        <strong>They Sign Up:</strong> When a brand uses your link to create an account, they're tracked as your referral.
                      </li>
                      <li className="pl-2">
                        <strong>Earn 100 Points:</strong> Once they complete signup and verification, you'll earn 100 points per brand referral.
                      </li>
                    </ol>
                  </TabsContent>
                  <TabsContent value="influencer" className="mt-4">
                    <ol className="list-decimal pl-5 space-y-4">
                      <li className="pl-2">
                        <strong>Share Your Influencer Link:</strong> Copy your unique influencer referral link and share it with content creators.
                      </li>
                      <li className="pl-2">
                        <strong>They Sign Up:</strong> When an influencer uses your link to create an account, they're tracked as your referral.
                      </li>
                      <li className="pl-2">
                        <strong>Earn 50 Points:</strong> You'll earn 50 points when they complete their first successful campaign.
                      </li>
                    </ol>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
          
          <aside>
            <Card>
              <CardHeader>
                <CardTitle>Rewards & Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Reward Points</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Brand Referral:</span>
                        <span className="font-semibold">100 points</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Active Influencer:</span>
                        <span className="font-semibold">50 points</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Top Campaigners</h3>
                    <ol className="space-y-2 text-sm">
                      <li className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center font-medium mr-2">1</span>
                          <span>Sarah Johnson</span>
                        </div>
                        <span>1,450 pts</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center font-medium mr-2">2</span>
                          <span>David Miller</span>
                        </div>
                        <span>1,280 pts</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center font-medium mr-2">3</span>
                          <span>Jessica Wang</span>
                        </div>
                        <span>950 pts</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Coming Soon</h3>
                    <p className="text-sm text-muted-foreground">Point redemption for cash payouts or platform credits.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Tips for Success</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2 items-start">
                    <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center font-medium shrink-0">1</span>
                    <span>Target brands and influencers that are the right fit for our platform</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center font-medium shrink-0">2</span>
                    <span>Follow up with your referrals to help them get started</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center font-medium shrink-0">3</span>
                    <span>Share success stories and case studies to convince hesitant prospects</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
};

export default CampaignerDashboardPage;
