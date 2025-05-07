
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import MainLayout from '@/components/layout/MainLayout';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  DollarSign, 
  Calendar, 
  Users, 
  Link as LinkIcon,
  ChevronDown,
  Bookmark,
  Flag,
  Share2,
  SparkleIcon,
  CheckIcon,
  Clock
} from 'lucide-react';

const CampaignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Local state for application features
  const [isApplied, setIsApplied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [allowDirectMessages, setAllowDirectMessages] = useState(true);
  const [customPitch, setCustomPitch] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  
  // Mock data - would be replaced with an API call using the id
  const campaign = {
    id: id || '1',
    title: 'Summer Fashion Collection',
    brand: 'StyleVibe',
    brandLogo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    description: 'Looking for fashion influencers to showcase our new summer collection with a focus on sustainable materials and beach wear.',
    detailed_description: `We are excited to launch our new summer collection that features sustainable materials and stylish beach wear options. We are looking for fashion influencers who can create authentic content showcasing our products in real-world settings.

The ideal influencer will have:
- A fashion-focused audience with high engagement
- Experience creating high-quality visual content
- An authentic voice that resonates with environmentally conscious consumers
- The ability to showcase items in a lifestyle context

This campaign requires 3 Instagram posts and 2 stories featuring our products over a 3-week period. All products will be provided to selected influencers.`,
    budget: '$1,000 - $2,500',
    rate_per_post: '$500',
    platforms: ['instagram', 'facebook'],
    campaign_type: 'Product Review',
    category: 'fashion',
    deadline: 'June 15, 2025',
    urgent: true,
    timeline: {
      application_deadline: 'June 15, 2025',
      content_creation: 'June 20-30, 2025',
      posting_period: 'July 1-15, 2025'
    },
    requirements: [
      'Minimum 10K followers',
      'Fashion-focused audience',
      'High engagement rate (>2%)',
      'Previous brand collaboration experience',
      'Ability to create high-quality images',
    ],
    deliverables: [
      '3 Instagram feed posts',
      '2 Instagram stories with swipe-up link',
      '1 Facebook post',
      'Usage rights for brand channels',
    ],
    example_posts: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    ],
    guidelines_url: '#',
    target_audience: {
      regions: ['United States', 'Canada', 'Europe'],
      age_range: '18-35',
      language: 'English'
    },
    eligibility_match: 85
  };
  
  const platformIcons: Record<string, JSX.Element> = {
    instagram: <Instagram className="h-5 w-5 text-pink-500" />,
    youtube: <Youtube className="h-5 w-5 text-red-600" />,
    facebook: <Facebook className="h-5 w-5 text-blue-600" />,
  };
  
  // Mock AI pitch generation
  const generateAIPitch = () => {
    setIsGeneratingPitch(true);
    setTimeout(() => {
      setCustomPitch("I'm excited about the opportunity to collaborate on your Summer Fashion Collection! As a fashion influencer with an engaged audience passionate about sustainable fashion, I can create authentic content that highlights your beach wear in a lifestyle context. My previous collaborations with eco-friendly brands have generated strong engagement, and I'd love to showcase your collection to my followers.");
      setIsGeneratingPitch(false);
      toast({
        title: "AI Pitch Generated",
        description: "A customized pitch has been created based on your profile.",
      });
    }, 1500);
  };
  
  // Handle application submission
  const handleApply = () => {
    setIsApplied(true);
    toast({
      title: "Application Submitted",
      description: "Your application has been sent to StyleVibe.",
    });
  };
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from Favorites" : "Added to Favorites",
      description: isBookmarked ? "Campaign removed from your bookmarks" : "Campaign saved to your bookmarks",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share Link Copied",
      description: "Campaign link copied to clipboard",
    });
  };

  const handleReport = () => {
    toast({
      title: "Report Campaign",
      description: "Thank you for your report. We'll review this campaign.",
    });
  };
  
  // Campaign card variants for animations
  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { opacity: 0, x: -50 }
  };
  
  // Section animations
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <MainLayout>
      <Helmet>
        <title>{campaign.title} | Influencer Adsense</title>
      </Helmet>
      
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <div className="mb-6">
              <Link to="/campaigns" className="text-sm text-brand-purple hover:underline flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Campaigns
              </Link>
            </div>
            
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                  {campaign.brandLogo ? (
                    <Link to={`/brands/${campaign.brand}`}>
                      <img 
                        src={campaign.brandLogo} 
                        alt={campaign.brand} 
                        className="w-16 h-16 rounded-full object-cover border hover:shadow-md transition-all"
                      />
                    </Link>
                  ) : (
                    <Link to={`/brands/${campaign.brand}`}>
                      <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center border hover:shadow-md transition-all">
                        <span className="font-bold text-xl text-brand-dark">
                          {campaign.brand.charAt(0)}
                        </span>
                      </div>
                    </Link>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-1">{campaign.title}</h1>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-muted-foreground">by</span>
                        <Link to={`/brands/${campaign.brand}`} className="font-medium hover:text-primary hover:underline">
                          {campaign.brand}
                        </Link>
                      </div>
                    </div>
                    
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
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="bg-brand-light text-brand-dark">
                      {campaign.category}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      {campaign.campaign_type}
                    </Badge>
                    {campaign.urgent && (
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        <Clock className="mr-1 h-3 w-3" />
                        Urgent
                      </Badge>
                    )}
                    
                    {campaign.platforms.map((platform) => (
                      <div 
                        key={platform}
                        className="flex items-center gap-1 px-2 py-0.5 bg-muted rounded-full text-xs"
                      >
                        {platformIcons[platform]}
                        <span className="capitalize">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="text-sm text-muted-foreground">Budget Range</div>
                      <div className="font-medium text-lg">{campaign.budget}</div>
                      <div className="text-xs text-muted-foreground">{campaign.rate_per_post} per post</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-8 w-8 text-amber-600" />
                    <div>
                      <div className="text-sm text-muted-foreground">Application Deadline</div>
                      <div className="font-medium text-lg">{campaign.deadline}</div>
                      <div className="text-xs text-muted-foreground">Posting: {campaign.timeline.posting_period}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="text-sm text-muted-foreground">Target Audience</div>
                      <div className="font-medium">{campaign.target_audience.regions.join(', ')}</div>
                      <div className="text-xs text-muted-foreground">Age: {campaign.target_audience.age_range}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {showAIRecommendations && (
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-6 p-4 border border-primary/20 bg-primary/5 rounded-lg"
                >
                  <div className="flex items-start gap-2">
                    <SparkleIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="text-lg font-medium mb-2">AI Insights</h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium">Profile Match</p>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full bg-primary" 
                              style={{width: `${campaign.eligibility_match}%`}}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>Eligibility: {campaign.eligibility_match}% match</span>
                            <span>{campaign.eligibility_match > 70 ? 'Good fit' : 'Partial match'}</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Estimated Performance</p>
                          <div className="grid grid-cols-3 gap-2 mt-1">
                            <div className="bg-muted p-2 rounded">
                              <p className="text-xs text-muted-foreground">Reach</p>
                              <p className="font-medium">~15,200</p>
                            </div>
                            <div className="bg-muted p-2 rounded">
                              <p className="text-xs text-muted-foreground">Engagement</p>
                              <p className="font-medium">~2,300</p>
                            </div>
                            <div className="bg-muted p-2 rounded">
                              <p className="text-xs text-muted-foreground">Clicks</p>
                              <p className="font-medium">~480</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                  <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="pt-6">
                  <div className="prose max-w-none">
                    <p className="text-lg mb-6">{campaign.description}</p>
                    <div className="whitespace-pre-line">{campaign.detailed_description}</div>
                    
                    <div className="flex items-center gap-2 mt-6">
                      <LinkIcon size={16} className="text-muted-foreground" />
                      <a href="#" className="text-brand-purple hover:underline">
                        Visit Brand Website
                      </a>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="deliverables" className="pt-6">
                  <Collapsible 
                    open={!isCollapsed}
                    onOpenChange={setIsCollapsed}
                    className="border rounded-lg p-4 mb-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">Campaign Brief</h3>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className={`h-4 w-4 transition-transform ${
                            isCollapsed ? "" : "transform rotate-180"
                          }`} />
                          {isCollapsed ? "Show Brief" : "Hide Brief"}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    
                    <CollapsibleContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Objective</h4>
                        <p>Showcase our sustainable summer collection in authentic lifestyle settings, highlighting the eco-friendly materials and versatile styling options.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Content Guidelines</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Emphasize the sustainable aspects of the materials</li>
                          <li>Show products in real-world beach or summer settings</li>
                          <li>Maintain bright, vibrant aesthetic aligned with summer theme</li>
                          <li>Include at least one lifestyle shot and one product detail shot</li>
                        </ul>
                        
                        <Button variant="outline" size="sm" className="mt-3">
                          <LinkIcon size={14} className="mr-1" />
                          Download Full Brief
                        </Button>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Example Posts</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {campaign.example_posts.map((post, index) => (
                            <img 
                              key={index}
                              src={post}
                              alt={`Example post ${index+1}`}
                              className="rounded-md object-cover h-40 w-full"
                            />
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <div className="space-y-2 mt-4">
                    <h3 className="text-lg font-medium mb-4">Required Deliverables:</h3>
                    <ul className="space-y-3">
                      {campaign.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full bg-brand-light flex items-center justify-center">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="12" 
                              height="12" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                              className="text-brand-dark"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Campaign Timeline</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-amber-800" />
                        </div>
                        <div>
                          <p className="font-medium">Application Deadline</p>
                          <p className="text-sm text-muted-foreground">{campaign.timeline.application_deadline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-blue-800" />
                        </div>
                        <div>
                          <p className="font-medium">Content Creation Period</p>
                          <p className="text-sm text-muted-foreground">{campaign.timeline.content_creation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-green-800" />
                        </div>
                        <div>
                          <p className="font-medium">Posting Period</p>
                          <p className="text-sm text-muted-foreground">{campaign.timeline.posting_period}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="eligibility" className="pt-6">
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Eligibility Requirements</h3>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${campaign.eligibility_match >= 70 ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                        <span className={`text-sm ${campaign.eligibility_match >= 70 ? 'text-green-600' : 'text-amber-600'}`}>
                          {campaign.eligibility_match}% Match
                        </span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {campaign.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted/50">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-brand-light flex items-center justify-center">
                              <CheckIcon className="h-3 w-3 text-brand-dark" />
                            </div>
                            <span>{requirement}</span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${index < 3 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}
                          >
                            {index < 3 ? 'You Match' : 'Partial Match'}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-medium mb-3">Target Audience</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="border rounded-md p-3">
                        <p className="text-sm text-muted-foreground">Regions</p>
                        <p className="font-medium">{campaign.target_audience.regions.join(', ')}</p>
                      </div>
                      <div className="border rounded-md p-3">
                        <p className="text-sm text-muted-foreground">Age Range</p>
                        <p className="font-medium">{campaign.target_audience.age_range}</p>
                      </div>
                      <div className="border rounded-md p-3">
                        <p className="text-sm text-muted-foreground">Language</p>
                        <p className="font-medium">{campaign.target_audience.language}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mt-4">
                      Our AI has analyzed your profile and audience demographics to calculate your eligibility match score.
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="p-0 h-auto ml-1"
                        onClick={() => setShowAIRecommendations(!showAIRecommendations)}
                      >
                        {showAIRecommendations ? 'Hide AI insights' : 'View AI insights'}
                      </Button>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
          
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="w-full md:w-1/3"
          >
            <div className={`${isMobile ? 'sticky bottom-0 left-0 right-0 p-4 bg-white shadow-lg' : 'sticky top-20'}`}>
              <Card>
                <CardHeader>
                  <CardTitle>Apply to this Campaign</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isApplied ? (
                    <div className="p-3 bg-green-50 rounded-md text-center">
                      <CheckIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <h3 className="font-medium text-lg">Application Submitted</h3>
                      <p className="text-sm text-muted-foreground mt-1">You've successfully applied to this campaign</p>
                      <Button variant="outline" className="mt-3" onClick={() => setIsApplied(false)}>
                        Edit Application
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground">Eligibility Match</p>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2 w-20">
                            <div 
                              className={`h-2 rounded-full ${campaign.eligibility_match >= 70 ? 'bg-green-500' : 'bg-amber-500'}`}
                              style={{width: `${campaign.eligibility_match}%`}}
                            ></div>
                          </div>
                          <span className={`text-sm ${campaign.eligibility_match >= 70 ? 'text-green-600' : 'text-amber-600'}`}>
                            {campaign.eligibility_match}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="pitch" className="block text-sm font-medium mb-1">
                            Customize Your Pitch (Optional)
                          </label>
                          <Textarea 
                            id="pitch" 
                            placeholder="Tell the brand why you're a great fit for this campaign..."
                            className="resize-none h-24"
                            value={customPitch}
                            onChange={(e) => setCustomPitch(e.target.value)}
                          />
                          <div className="flex justify-end mt-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs"
                              onClick={generateAIPitch}
                              disabled={isGeneratingPitch}
                            >
                              <SparkleIcon className="h-3 w-3 mr-1" />
                              {isGeneratingPitch ? "Generating..." : "Generate AI Pitch"}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="dm-permissions" 
                            checked={allowDirectMessages} 
                            onCheckedChange={setAllowDirectMessages}
                          />
                          <label htmlFor="dm-permissions" className="text-sm font-medium">
                            Allow brand to DM me directly
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                
                <CardFooter>
                  {!isApplied && (
                    <Button 
                      className="w-full pulse-animation" 
                      onClick={handleApply}
                    >
                      Apply Now
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CampaignDetail;
