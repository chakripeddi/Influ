import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthStatus } from '@/components/auth/AuthStatus';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowRight,
  Briefcase,
  Building,
  Calendar,
  Check,
  Clock,
  FileText,
  Globe,
  Image,
  List,
  ListChecks,
  Shield,
  Target,
  Users,
  Bookmark,
  Share2,
  Flag,
} from 'lucide-react';

const CampaignDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applySectionVisible, setApplySectionVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock campaign data
  const campaign = {
    id: id || '1',
    title: 'Summer Fashion Collection Showcase',
    brandName: 'FashionForward',
    brandLogo: '',
    brandDescription: 'A cutting-edge fashion brand focusing on sustainable and trendy clothing for the modern consumer.',
    budget: '$800-$1,200',
    description: 'We are looking for fashion influencers to showcase our new summer collection with authentic lifestyle photos and engaging short-form videos that highlight the versatility and sustainable aspects of our designs.',
    longDescription: 'Our Summer 2025 Collection features lightweight, breathable fabrics in vibrant colors perfect for the season. We want to see how you style these pieces in your everyday life while communicating our brand values of sustainability and modern design.\n\nWe are specifically interested in content that showcases the versatility of our pieces - how they can be styled for different occasions and settings. Your authentic voice and creative direction will help us reach new audiences and demonstrate how our clothing fits into various lifestyles.',
    platforms: ['Instagram', 'TikTok'],
    category: 'Fashion',
    deadline: 'June 15, 2025',
    timeframe: 'June 1 - June 30, 2025',
    deliverables: [
      '2 Instagram Feed Posts with product tags',
      '3 Instagram Stories with swipe-up links',
      '1 TikTok video (30-60 seconds)',
      'Usage rights for brand channels'
    ],
    requirements: [
      'Fashion/Lifestyle focus',
      'Minimum 5k followers',
      '2%+ engagement rate',
      'Ages 18-35',
      'US-based',
      'Previous fashion content examples'
    ],
    timeline: [
      { date: 'June 1-5, 2025', event: 'Selection of influencers' },
      { date: 'June 7-10, 2025', event: 'Product shipping' },
      { date: 'June 11-25, 2025', event: 'Content creation period' },
      { date: 'June 30, 2025', event: 'Final submission deadline' }
    ],
    brandInfo: {
      website: 'www.fashionforward.com',
      instagram: '@fashionforward',
      founded: '2018',
      location: 'New York, NY'
    }
  };
  
  // Handle scroll to apply section
  const scrollToApply = () => {
    setApplySectionVisible(true);
    setTimeout(() => {
      document.getElementById('apply-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handle bookmark campaign
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Campaign Unbookmarked" : "Campaign Bookmarked",
      description: isBookmarked 
        ? "Campaign removed from your bookmarks" 
        : "Campaign added to your bookmarks",
    });
  };

  // Handle share campaign
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: campaign.title,
          text: `Check out this campaign: ${campaign.title} by ${campaign.brandName}`,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Campaign link has been copied to your clipboard",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Share Failed",
        description: "There was an error sharing the campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle report campaign
  const handleReport = () => {
    toast({
      title: "Report Campaign",
      description: "Please select a reason for reporting this campaign",
      action: (
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toast({
              title: "Report Submitted",
              description: "Thank you for your report. Our team will review it shortly.",
            })}
          >
            Misleading Content
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toast({
              title: "Report Submitted",
              description: "Thank you for your report. Our team will review it shortly.",
            })}
          >
            Inappropriate Content
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toast({
              title: "Report Submitted",
              description: "Thank you for your report. Our team will review it shortly.",
            })}
          >
            Other
          </Button>
        </div>
      ),
    });
  };

  // Handle application submission
  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully. The brand will review it shortly.",
      });
      
      // Navigate to dashboard or applications page
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthStatus>
      <MainLayout>
        <Helmet>
          <title>{campaign.title} | Influencer Adsense</title>
        </Helmet>
        
        <div className="container py-8">
          <div className="flex flex-col md:flex-row mb-6 gap-4">
            <Link to="/campaigns">
              <Button variant="outline">Back to Campaigns</Button>
            </Link>
            <div className="flex-1" />
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleBookmark}
                className={isBookmarked ? "text-primary" : ""}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-primary" : ""}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleReport}
              >
                <Flag className="h-5 w-5" />
              </Button>
              <Button onClick={scrollToApply} ripple>
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Campaign details section */}
            <div className="lg:w-2/3 animate-fade-in space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start">
                    <Avatar className="h-12 w-12 mr-4">
                      {campaign.brandLogo ? (
                        <AvatarImage src={campaign.brandLogo} alt={campaign.brandName} />
                      ) : (
                        <AvatarFallback className="bg-primary/10">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{campaign.title}</CardTitle>
                      <CardDescription>by {campaign.brandName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {campaign.platforms.map(platform => (
                      <Badge key={platform} variant="secondary">{platform}</Badge>
                    ))}
                    <Badge variant="outline">{campaign.category}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Deadline: {campaign.deadline}</span>
                    </div>
                    <div>
                      <span className="font-medium">Budget: {campaign.budget}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 w-full">
                      <TabsTrigger value="overview" className="text-xs sm:text-sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="deliverables" className="text-xs sm:text-sm">
                        <List className="h-4 w-4 mr-2" />
                        Deliverables
                      </TabsTrigger>
                      <TabsTrigger value="timeline" className="text-xs sm:text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Timeline
                      </TabsTrigger>
                      <TabsTrigger value="eligibility" className="text-xs sm:text-sm">
                        <Shield className="h-4 w-4 mr-2" />
                        Eligibility
                      </TabsTrigger>
                      <TabsTrigger value="brand" className="text-xs sm:text-sm">
                        <Building className="h-4 w-4 mr-2" />
                        Brand Info
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="animate-fade-in">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-2">About This Campaign</h3>
                          <p className="text-muted-foreground whitespace-pre-line">
                            {campaign.longDescription}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">Campaign Timeframe</h3>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <p>{campaign.timeframe}</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="deliverables" className="animate-fade-in">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Required Deliverables</h3>
                        <ul className="space-y-3">
                          {campaign.deliverables.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="timeline" className="animate-fade-in">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Campaign Timeline</h3>
                        <div className="relative">
                          <div className="absolute left-2.5 top-0 h-full w-0.5 bg-muted"></div>
                          <ul className="space-y-4">
                            {campaign.timeline.map((item, index) => (
                              <li key={index} className="relative pl-8">
                                <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <p className="font-medium">{item.date}</p>
                                <p className="text-sm text-muted-foreground">{item.event}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="eligibility" className="animate-fade-in">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Eligibility Requirements</h3>
                        <ul className="space-y-3">
                          {campaign.requirements.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <ListChecks className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="brand" className="animate-fade-in">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-2">About {campaign.brandName}</h3>
                          <p className="text-muted-foreground">{campaign.brandDescription}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Website: {campaign.brandInfo.website}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Instagram: {campaign.brandInfo.instagram}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Founded: {campaign.brandInfo.founded}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Target className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Location: {campaign.brandInfo.location}</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Apply section */}
            <div className="lg:w-1/3">
              {applySectionVisible ? (
                <Card id="apply-section" className="sticky top-24 animate-fade-in">
                  <CardHeader>
                    <CardTitle>Apply for Campaign</CardTitle>
                    <CardDescription>
                      Tell the brand why you're a perfect fit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitApplication} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Pitch</label>
                        <textarea 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                          rows={4}
                          placeholder="Explain why you're a great fit for this campaign..."
                          required
                        ></textarea>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Proposed Content</label>
                        <textarea 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                          rows={3}
                          placeholder="Brief description of your content idea..."
                          required
                        ></textarea>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Proposed Rate</label>
                        <input 
                          type="text" 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          placeholder="Enter your rate (e.g., $XXX)"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Content Examples</label>
                        <div className="border border-dashed border-input rounded-md p-4 text-center">
                          <Image className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="text-sm mt-2">Drag and drop or click to upload</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (max 5MB)</p>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={handleSubmitApplication}
                      disabled={isSubmitting}
                      ripple 
                      animation="bounce"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="sticky top-24 animate-fade-in">
                  <CardHeader>
                    <CardTitle>Campaign Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Budget</p>
                      <p className="text-lg font-bold">{campaign.budget}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Deadline</p>
                      <p>{campaign.deadline}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Platforms</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {campaign.platforms.map(platform => (
                          <Badge key={platform} variant="secondary">{platform}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Deliverables</p>
                      <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                        {campaign.deliverables.slice(0, 3).map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                        {campaign.deliverables.length > 3 && (
                          <li>+ {campaign.deliverables.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={scrollToApply} ripple>
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthStatus>
  );
};

export default CampaignDetailPage;
