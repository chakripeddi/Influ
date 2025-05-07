
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useReferral } from '@/contexts/ReferralContext';
import { Share, Copy, Mail, MessageSquare, Instagram } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const ReferralDashboard = () => {
  const { toast } = useToast();
  const { 
    referralCode, 
    referralsCount, 
    pointsEarned, 
    loading, 
    error,
    generateReferralLink,
    copyReferralLink,
    shareViaEmail,
    shareViaWhatsApp,
    shareViaInstagram
  } = useReferral();
  
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCopyLink = async () => {
    const success = await copyReferralLink();
    if (success) {
      toast({
        title: "Link copied!",
        description: "Your referral link has been copied to clipboard",
      });
    } else {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
      });
    }
  };

  // Fix for the type mismatch errors
  const handleShareViaWhatsApp = () => {
    shareViaWhatsApp();
  };

  const handleShareViaInstagram = () => {
    shareViaInstagram();
  };

  const handleShareViaEmail = () => {
    shareViaEmail();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading referral data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load referral data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Refer & Earn
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share className="h-4 w-4" />
                Share
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Share your referral link</SheetTitle>
                <SheetDescription>
                  Invite friends and earn 50 points for each verified signup!
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 rounded-md border p-2">
                    <span className="truncate flex-1 text-sm">{generateReferralLink()}</span>
                    <Button variant="ghost" size="sm" onClick={handleCopyLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-3" onClick={handleShareViaWhatsApp}>
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-xs">WhatsApp</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-3" onClick={handleShareViaInstagram}>
                    <Instagram className="h-5 w-5" />
                    <span className="text-xs">Instagram</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-3" onClick={handleShareViaEmail}>
                    <Mail className="h-5 w-5" />
                    <span className="text-xs">Email</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </CardTitle>
        <CardDescription>
          Invite friends and earn rewards for every signup
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{referralsCount}</p>
            <p className="text-sm text-muted-foreground">Total Referrals</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{pointsEarned}</p>
            <p className="text-sm text-muted-foreground">Points Earned</p>
          </div>
          <div>
            <p className="text-2xl font-bold">50</p>
            <p className="text-sm text-muted-foreground">Points/Referral</p>
          </div>
        </div>

        <Alert className="mt-4 bg-muted/50">
          <AlertTitle className="font-medium">Earn more with referrals!</AlertTitle>
          <AlertDescription className="text-sm">
            Invite friends to join Influencer Adsense and earn 50 points for each verified signup.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline"
          onClick={handleCopyLink}
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy Referral Link
        </Button>
        <Button variant="default" disabled className="flex-1 ml-2">
          Redeem Points
          <span className="text-xs ml-2 opacity-70">(Coming Soon)</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReferralDashboard;
