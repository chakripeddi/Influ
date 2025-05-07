
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useReferral } from '@/contexts/ReferralContext';
import { Users, Award, BadgeDollarSign } from 'lucide-react';

const ReferralIncentiveCard = () => {
  const { toast } = useToast();
  const { copyReferralLink, generateReferralLink } = useReferral();

  const handleCopyLink = async () => {
    const success = await copyReferralLink();
    if (success) {
      toast({
        title: "Link copied!",
        description: "Start sharing your referral link with friends",
      });
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary text-white">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" /> Refer & Earn Program
        </CardTitle>
        <CardDescription className="text-primary-foreground/90">
          Invite friends and get rewarded
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-muted p-3 rounded-full">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium">Refer Friends</h4>
              <p className="text-sm text-muted-foreground">Share your unique link with friends</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-muted p-3 rounded-full">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium">They Join</h4>
              <p className="text-sm text-muted-foreground">When they sign up using your link</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-muted p-3 rounded-full">
              <BadgeDollarSign className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium">You Earn</h4>
              <p className="text-sm text-muted-foreground">Get 50 points for each verified signup</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col bg-muted/30 gap-2">
        <div className="text-sm font-medium w-full overflow-hidden text-ellipsis whitespace-nowrap px-2 py-1 bg-muted/50 rounded">
          {generateReferralLink()}
        </div>
        <Button className="w-full" onClick={handleCopyLink}>
          Copy Referral Link
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReferralIncentiveCard;
