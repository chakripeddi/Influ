
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import ReferralDashboard from '@/components/referral/ReferralDashboard';
import ReferralIncentiveCard from '@/components/referral/ReferralIncentiveCard';
import { Link } from 'react-router-dom';

const ReferralPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Refer & Earn</title>
      </Helmet>
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Refer & Earn</h1>
          <p className="text-muted-foreground mt-2">
            Share Influencer Adsense with friends and earn rewards
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ReferralDashboard />
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">How It Works</h2>
              <div className="bg-card rounded-lg border p-6">
                <ol className="list-decimal pl-5 space-y-4">
                  <li className="pl-2">
                    <strong>Share Your Link:</strong> Copy your unique referral link and share it with friends, colleagues, or on social media.
                  </li>
                  <li className="pl-2">
                    <strong>They Sign Up:</strong> When someone uses your link to create an account, they're tracked as your referral.
                  </li>
                  <li className="pl-2">
                    <strong>Earn Points:</strong> Once they complete signup and verification, you'll earn 50 points per referral.
                  </li>
                  <li className="pl-2">
                    <strong>Redeem Rewards:</strong> Coming soon - use your points for account credits, premium features, and more!
                  </li>
                </ol>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Referral Terms</h2>
              <div className="bg-card rounded-lg border p-6">
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>Referrals must be new users who have not previously created an account</li>
                  <li>Points are awarded after the referred user completes account verification</li>
                  <li>We monitor referral activity and reserve the right to cancel points for suspicious activity</li>
                  <li>Referrals must comply with our <Link to="/terms" className="underline">Terms of Service</Link></li>
                  <li>The referral program terms may change at any time</li>
                </ul>
              </div>
            </div>
          </div>
          
          <aside>
            <ReferralIncentiveCard />
            
            <div className="mt-8 bg-card rounded-lg border p-6">
              <h3 className="font-medium mb-2">Tips for Successful Referrals</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2 items-start">
                  <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center font-medium shrink-0">1</span>
                  <span>Personalize your message when sharing your referral link</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center font-medium shrink-0">2</span>
                  <span>Explain the benefits of joining to potential referrals</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center font-medium shrink-0">3</span>
                  <span>Share on social media to reach more potential users</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center font-medium shrink-0">4</span>
                  <span>Follow up with people you've shared your link with</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReferralPage;
