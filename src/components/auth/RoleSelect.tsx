
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, Share } from 'lucide-react';

const RoleSelect = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-2 hover:border-brand-purple transition-all duration-200 cursor-pointer animate-fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-brand-light mb-4">
            <Briefcase className="h-8 w-8 text-brand-dark" />
          </div>
          <CardTitle>For Brands</CardTitle>
          <CardDescription>
            Find the perfect influencers to promote your products
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-center">
          <p>• Create promotional campaigns</p>
          <p>• Connect with quality influencers</p>
          <p>• Track campaign performance</p>
          <p>• Build long-term partnerships</p>
        </CardContent>
        <CardFooter>
          <Link to="/signup?role=brand" className="w-full">
            <Button className="w-full">Join as Brand</Button>
          </Link>
        </CardFooter>
      </Card>
      
      <Card className="border-2 hover:border-brand-purple transition-all duration-200 cursor-pointer animate-fade-in animation-delay-150">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-brand-light mb-4">
            <Users className="h-8 w-8 text-brand-dark" />
          </div>
          <CardTitle>For Influencers</CardTitle>
          <CardDescription>
            Monetize your audience with brand partnerships
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-center">
          <p>• Browse available campaigns</p>
          <p>• Apply for collaborations</p>
          <p>• Manage multiple partnerships</p>
          <p>• Get paid for your content</p>
        </CardContent>
        <CardFooter>
          <Link to="/signup?role=influencer" className="w-full">
            <Button className="w-full">Join as Influencer</Button>
          </Link>
        </CardFooter>
      </Card>
      
      <Card className="border-2 hover:border-brand-purple transition-all duration-200 cursor-pointer animate-fade-in animation-delay-300">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-brand-light mb-4">
            <Share className="h-8 w-8 text-brand-dark" />
          </div>
          <CardTitle>For Campaigners</CardTitle>
          <CardDescription>
            Earn rewards by referring brands and influencers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-center">
          <p>• Refer brands to the platform</p>
          <p>• Invite influencers to join</p>
          <p>• Track successful referrals</p>
          <p>• Earn points for each signup</p>
        </CardContent>
        <CardFooter>
          <Link to="/signup?role=campaigner" className="w-full">
            <Button className="w-full">Join as Campaigner</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoleSelect;
