
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useReferral } from '@/contexts/ReferralContext';
import { Share, Copy, Mail, MessageSquare, Instagram } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const CampaignerDashboard = () => {
  const { toast } = useToast();
  const { 
    brandReferralCode, 
    influencerReferralCode,
    brandReferralsCount,
    influencerReferralsCount,
    pointsEarned,
    loading,
    error,
    generateReferralLink,
    copyReferralLink,
    shareViaEmail,
    shareViaWhatsApp,
    shareViaInstagram
  } = useReferral();
  
  const [shareType, setShareType] = useState<'brand' | 'influencer'>('brand');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCopyLink = async (type: 'brand' | 'influencer') => {
    const success = await copyReferralLink(type);
    if (success) {
      toast({
        title: "Link copied!",
        description: `Your ${type} referral link has been copied to clipboard`,
      });
    } else {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
      });
    }
  };

  const openShareSheet = (type: 'brand' | 'influencer') => {
    setShareType(type);
    setIsSheetOpen(true);
  };

  // Type-safe handler wrappers
  const handleShareViaWhatsApp = () => {
    shareViaWhatsApp(shareType);
  };

  const handleShareViaInstagram = () => {
    shareViaInstagram(shareType);
  };

  const handleShareViaEmail = () => {
    shareViaEmail(shareType);
  };

  // Mocked data for now - in a real implementation, these would come from the API
  const brandReferrals = [
    { id: 1, name: 'Acme Inc.', status: 'Active', campaigns: 2, points: 100 },
    { id: 2, name: 'Tech Solutions', status: 'Pending', campaigns: 0, points: 0 },
  ];
  
  const influencerReferrals = [
    { id: 1, name: 'John Doe', status: 'Active', campaigns: 3, points: 50 },
    { id: 2, name: 'Jane Smith', status: 'Active', campaigns: 1, points: 50 },
    { id: 3, name: 'Mark Wilson', status: 'Pending', campaigns: 0, points: 0 },
  ];

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading campaigner data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-red-500">Error loading data: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Campaigner Dashboard</CardTitle>
        <CardDescription>
          Manage your brand and influencer referrals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <Card>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold">{brandReferralsCount}</p>
              <p className="text-sm text-muted-foreground">Brand Referrals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold">{influencerReferralsCount}</p>
              <p className="text-sm text-muted-foreground">Influencer Invites</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold">{pointsEarned}</p>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mb-6">
          <Button 
            onClick={() => openShareSheet('brand')}
            className="flex items-center gap-2"
          >
            <Share className="h-4 w-4" />
            Share Brand Link
          </Button>
          
          <Button 
            onClick={() => openShareSheet('influencer')}
            className="flex items-center gap-2"
          >
            <Share className="h-4 w-4" />
            Share Influencer Link
          </Button>
        </div>

        <Tabs defaultValue="brands">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="brands">Brand Referrals</TabsTrigger>
            <TabsTrigger value="influencers">Influencer Invites</TabsTrigger>
          </TabsList>
          
          <TabsContent value="brands" className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-3">Your Brand Referrals</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Campaigns</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brandReferrals.length > 0 ? (
                  brandReferrals.map((brand) => (
                    <TableRow key={brand.id}>
                      <TableCell>{brand.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          brand.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {brand.status}
                        </span>
                      </TableCell>
                      <TableCell>{brand.campaigns}</TableCell>
                      <TableCell>{brand.points}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                      No brand referrals yet. Start sharing your brand referral link!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="influencers" className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-3">Your Influencer Invites</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Influencer Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Campaigns</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {influencerReferrals.length > 0 ? (
                  influencerReferrals.map((influencer) => (
                    <TableRow key={influencer.id}>
                      <TableCell>{influencer.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          influencer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {influencer.status}
                        </span>
                      </TableCell>
                      <TableCell>{influencer.campaigns}</TableCell>
                      <TableCell>{influencer.points}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                      No influencer invites yet. Start sharing your influencer referral link!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Share your {shareType} referral link</SheetTitle>
              <SheetDescription>
                {shareType === 'brand'
                  ? "Invite brands to join and earn 100 points for each approved sign-up!"
                  : "Invite influencers to join and earn 50 points when they complete their first campaign!"}
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 rounded-md border p-2">
                  <span className="truncate flex-1 text-sm">{generateReferralLink(shareType)}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopyLink(shareType)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-1 h-auto py-3"
                  onClick={handleShareViaWhatsApp}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-xs">WhatsApp</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-1 h-auto py-3"
                  onClick={handleShareViaInstagram}
                >
                  <Instagram className="h-5 w-5" />
                  <span className="text-xs">Instagram</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-1 h-auto py-3"
                  onClick={handleShareViaEmail}
                >
                  <Mail className="h-5 w-5" />
                  <span className="text-xs">Email</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default CampaignerDashboard;
