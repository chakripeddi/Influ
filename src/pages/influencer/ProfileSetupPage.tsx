
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Camera, Instagram, Youtube, Facebook, AtSign, Check, Info, ArrowRight, ArrowLeft, MapPin, Phone, Upload, User, Wallet, Shield, FileCheck, Clock, Bookmark } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

// Define the form schema
const formSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phoneNumber: z.string().optional(),
    location: z.string().min(1, { message: "Location is required" }),
    profilePicture: z.string().optional(),
  }),
  socialMedia: z.object({
    instagram: z.object({
      handle: z.string().optional(),
      url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
      followers: z.number().optional().or(z.literal('')),
      engagementRate: z.number().optional().or(z.literal('')),
      accountType: z.string().optional(),
      verified: z.boolean().optional(),
    }).optional(),
    youtube: z.object({
      handle: z.string().optional(),
      url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
      followers: z.number().optional().or(z.literal('')),
      engagementRate: z.number().optional().or(z.literal('')),
      accountType: z.string().optional(),
      verified: z.boolean().optional(),
    }).optional(),
    facebook: z.object({
      handle: z.string().optional(),
      url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
      followers: z.number().optional().or(z.literal('')),
      engagementRate: z.number().optional().or(z.literal('')),
      accountType: z.string().optional(),
      verified: z.boolean().optional(),
    }).optional(),
    tiktok: z.object({
      handle: z.string().optional(),
      url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
      followers: z.number().optional().or(z.literal('')),
      engagementRate: z.number().optional().or(z.literal('')),
      accountType: z.string().optional(),
      verified: z.boolean().optional(),
    }).optional(),
  }),
  contentNiche: z.object({
    categories: z.array(z.string()).optional(),
    formats: z.array(z.string()).optional(),
    postingFrequency: z.string().optional(),
  }),
  collaborationPreferences: z.object({
    campaignTypes: z.array(z.string()).optional(),
    minBudget: z.number().optional(),
    preferredCollaborationMode: z.string().optional(),
  }),
  availability: z.object({
    isAvailable: z.boolean().optional(),
    preferredTimes: z.array(z.string()).optional(),
  }),
  referral: z.object({
    code: z.string().optional(),
    referrerCode: z.string().optional(),
  }),
  verification: z.object({
    kycDocuments: z.string().optional(),
    pressMentions: z.string().optional(),
    socialProofLinks: z.array(z.string()).optional(),
  }),
  aiAnalytics: z.object({
    bio: z.string().optional(),
    hashtags: z.array(z.string()).optional(),
    topPostMetrics: z.object({
      engagement: z.number().optional(),
      reach: z.number().optional(),
      conversions: z.number().optional(),
    }).optional(),
    audienceInsights: z.object({
      demographics: z.string().optional(),
      interests: z.array(z.string()).optional(),
    }).optional(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ProfileSetupPage = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Extract user's name from metadata if available, otherwise use email
  const getUserFullName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    } else if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    } else {
      // Return email username portion as fallback
      return user?.email?.split('@')[0] || '';
    }
  };

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        email: user?.email || '',
        fullName: getUserFullName(),
        phoneNumber: '',
        location: '',
        profilePicture: '',
      },
      socialMedia: {
        instagram: { handle: '', url: '', followers: '', engagementRate: '', accountType: 'personal', verified: false },
        youtube: { handle: '', url: '', followers: '', engagementRate: '', accountType: 'content', verified: false },
        facebook: { handle: '', url: '', followers: '', engagementRate: '', accountType: 'page', verified: false },
        tiktok: { handle: '', url: '', followers: '', engagementRate: '', accountType: 'creator', verified: false },
      },
      contentNiche: {
        categories: [],
        formats: [],
        postingFrequency: 'weekly',
      },
      collaborationPreferences: {
        campaignTypes: [],
        minBudget: 500,
        preferredCollaborationMode: 'remote',
      },
      availability: {
        isAvailable: true,
        preferredTimes: [],
      },
      referral: {
        code: generateReferralCode(),
        referrerCode: '',
      },
      verification: {
        kycDocuments: '',
        pressMentions: '',
        socialProofLinks: [],
      },
      aiAnalytics: {
        bio: '',
        hashtags: [],
        topPostMetrics: {
          engagement: 0,
          reach: 0,
          conversions: 0,
        },
        audienceInsights: {
          demographics: '',
          interests: [],
        },
      },
    },
  });

  // Function to generate a random referral code
  function generateReferralCode() {
    return 'INF' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast({
      title: "Profile setup complete!",
      description: "Your profile has been saved successfully.",
    });
    // Here you would typically save the data to your backend
  };

  // Function to handle profile picture upload
  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
          form.setValue('personalInfo.profilePicture', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Tab navigation functions
  const goToNextTab = () => {
    const tabs = ["personalInfo", "socialMedia", "contentNiche", "collaborationPreferences", "availability", "referral", "verification", "aiAnalytics"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const goToPreviousTab = () => {
    const tabs = ["personalInfo", "socialMedia", "contentNiche", "collaborationPreferences", "availability", "referral", "verification", "aiAnalytics"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  // Animation variants for the tabs
  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  // Helper function to safely register fields including those with dynamic paths
  const registerField = (path: string, options: any = {}) => {
    // Convert the path to a proper object path that form.register can use
    return form.register(path as any, options);
  };

  // Categories for the form
  const contentCategories = [
    { id: "tech", label: "Technology" },
    { id: "fashion", label: "Fashion" },
    { id: "fitness", label: "Fitness" },
    { id: "beauty", label: "Beauty" },
    { id: "travel", label: "Travel" },
    { id: "food", label: "Food & Cooking" },
    { id: "gaming", label: "Gaming" },
    { id: "education", label: "Education" },
    { id: "business", label: "Business" },
    { id: "lifestyle", label: "Lifestyle" }
  ];

  const contentFormats = [
    { id: "reels", label: "Reels" },
    { id: "shorts", label: "Shorts" },
    { id: "stories", label: "Stories" },
    { id: "posts", label: "Posts" },
    { id: "lives", label: "Live Streams" },
    { id: "videos", label: "Long-form Videos" },
    { id: "blogs", label: "Blog Articles" },
    { id: "podcasts", label: "Podcasts" }
  ];

  const campaignTypes = [
    { id: "sponsored", label: "Sponsored Posts" },
    { id: "giveaways", label: "Giveaways" },
    { id: "reviews", label: "Product Reviews" },
    { id: "ambassador", label: "Brand Ambassador" },
    { id: "ugc", label: "User-Generated Content" },
    { id: "affiliate", label: "Affiliate Marketing" }
  ];

  // Social media platforms with their icons
  const socialPlatforms = [
    { id: "instagram", name: "Instagram", icon: <Instagram className="h-5 w-5" /> },
    { id: "youtube", name: "YouTube", icon: <Youtube className="h-5 w-5" /> },
    { id: "facebook", name: "Facebook", icon: <Facebook className="h-5 w-5" /> },
    { id: "tiktok", name: "TikTok", icon: <AtSign className="h-5 w-5" /> } // Using AtSign as a replacement for TikTok
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl">Complete Your Influencer Profile</CardTitle>
                <CardDescription>Set up your profile to get matched with the perfect brand partnerships</CardDescription>
              </div>
              <div className="flex items-center gap-2 bg-muted p-2 rounded-full text-xs">
                <span className="font-medium">Profile completion:</span>
                <span className="text-primary">{activeTab === "personalInfo" ? "12.5%" : activeTab === "socialMedia" ? "25%" : activeTab === "contentNiche" ? "37.5%" : activeTab === "collaborationPreferences" ? "50%" : activeTab === "availability" ? "62.5%" : activeTab === "referral" ? "75%" : activeTab === "verification" ? "87.5%" : "100%"}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-8">
                <TabsTrigger value="personalInfo" className="flex flex-col items-center gap-1 text-xs"><User className="h-4 w-4" />Personal</TabsTrigger>
                <TabsTrigger value="socialMedia" className="flex flex-col items-center gap-1 text-xs"><Instagram className="h-4 w-4" />Social</TabsTrigger>
                <TabsTrigger value="contentNiche" className="flex flex-col items-center gap-1 text-xs"><Bookmark className="h-4 w-4" />Content</TabsTrigger>
                <TabsTrigger value="collaborationPreferences" className="flex flex-col items-center gap-1 text-xs"><Bookmark className="h-4 w-4" />Collabs</TabsTrigger>
                <TabsTrigger value="availability" className="flex flex-col items-center gap-1 text-xs"><Clock className="h-4 w-4" />Schedule</TabsTrigger>
                <TabsTrigger value="referral" className="flex flex-col items-center gap-1 text-xs"><Wallet className="h-4 w-4" />Referral</TabsTrigger>
                <TabsTrigger value="verification" className="flex flex-col items-center gap-1 text-xs"><Shield className="h-4 w-4" />Verify</TabsTrigger>
                <TabsTrigger value="aiAnalytics" className="flex flex-col items-center gap-1 text-xs"><FileCheck className="h-4 w-4" />AI Data</TabsTrigger>
              </TabsList>

              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Personal Info Tab */}
                <TabsContent value="personalInfo">
                  <motion.div
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1 space-y-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input 
                            id="fullName" 
                            placeholder="Enter your full name" 
                            {...form.register("personalInfo.fullName")}
                            className="hover-scale"
                          />
                          {form.formState.errors.personalInfo?.fullName && (
                            <p className="text-red-500 text-sm">{form.formState.errors.personalInfo.fullName.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="your.email@example.com" 
                            {...form.register("personalInfo.email")}
                            readOnly
                            className="bg-muted"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phoneNumber">Phone Number</Label>
                          <div className="flex items-center">
                            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="phoneNumber" 
                              placeholder="+1 (555) 123-4567" 
                              {...form.register("personalInfo.phoneNumber")}
                              className="hover-scale"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="location">Location</Label>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="location" 
                              placeholder="City, Country" 
                              {...form.register("personalInfo.location")}
                              className="hover-scale"
                            />
                          </div>
                          {form.formState.errors.personalInfo?.location && (
                            <p className="text-red-500 text-sm">{form.formState.errors.personalInfo.location.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-40 h-40 rounded-full bg-gray-100 relative overflow-hidden border-2 border-primary">
                          {profileImage ? (
                            <img src={profileImage} alt="Profile Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              <Camera className="w-12 h-12" />
                            </div>
                          )}
                        </div>
                        <Label htmlFor="profilePicture" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Upload Photo
                          <input
                            id="profilePicture"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfilePictureUpload}
                          />
                        </Label>
                        <p className="text-xs text-center text-muted-foreground">Recommend square image, at least 500x500px</p>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Social Media Tab */}
                <TabsContent value="socialMedia">
                  <motion.div
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
                    {socialPlatforms.map((platform) => (
                      <div key={platform.id} className="bg-accent/20 p-6 rounded-lg">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex items-center gap-3 min-w-[150px]">
                            <div className="p-2 bg-primary rounded-full text-primary-foreground">
                              {platform.icon}
                            </div>
                            <h3 className="font-medium text-lg">{platform.name}</h3>
                          </div>
                          
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`${platform.id}-handle`}>Username/Handle</Label>
                                <Input 
                                  id={`${platform.id}-handle`} 
                                  placeholder={platform.id === "instagram" ? "@yourhandle" : "Your handle"}
                                  {...registerField(`socialMedia.${platform.id}.handle`)}
                                  className="hover-scale"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`${platform.id}-url`}>Profile URL</Label>
                                <Input 
                                  id={`${platform.id}-url`} 
                                  placeholder={`https://www.${platform.id}.com/yourusername`}
                                  {...registerField(`socialMedia.${platform.id}.url`)}
                                  className="hover-scale"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor={`${platform.id}-followers`}>Followers/Subscribers</Label>
                                <Input 
                                  id={`${platform.id}-followers`} 
                                  placeholder="10000"
                                  type="number"
                                  {...registerField(`socialMedia.${platform.id}.followers`)}
                                  className="hover-scale"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`${platform.id}-engagement`}>Average Engagement Rate (%)</Label>
                                <Input 
                                  id={`${platform.id}-engagement`} 
                                  placeholder="3.5"
                                  type="number"
                                  step="0.1"
                                  {...registerField(`socialMedia.${platform.id}.engagementRate`)}
                                  className="hover-scale"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor={`${platform.id}-type`}>Account Type</Label>
                                <Select 
                                  onValueChange={(value) => form.setValue(`socialMedia.${platform.id}.accountType` as any, value)}
                                  defaultValue={form.getValues(`socialMedia.${platform.id}.accountType` as any)}
                                >
                                  <SelectTrigger id={`${platform.id}-type`}>
                                    <SelectValue placeholder="Select account type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="personal">Personal</SelectItem>
                                    <SelectItem value="creator">Creator</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    {platform.id === "facebook" && <SelectItem value="page">Page</SelectItem>}
                                    {platform.id === "youtube" && <SelectItem value="content">Content Creator</SelectItem>}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="flex items-center space-x-2">
                                  <Switch 
                                    id={`${platform.id}-verified`}
                                    onCheckedChange={(checked) => form.setValue(`socialMedia.${platform.id}.verified` as any, checked)}
                                    checked={form.getValues(`socialMedia.${platform.id}.verified` as any)}
                                  />
                                  <Label htmlFor={`${platform.id}-verified`}>Verified Account</Label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </TabsContent>
                
                {/* Content & Niche Tab */}
                <TabsContent value="contentNiche">
                  <motion.div
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-lg font-medium">Content Categories</Label>
                        <div className="text-sm text-muted-foreground">Select all that apply</div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {contentCategories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category.id}`}
                              onCheckedChange={(checked) => {
                                const currentCategories = form.getValues("contentNiche.categories") || [];
                                if (checked) {
                                  form.setValue("contentNiche.categories", [...currentCategories, category.id]);
                                } else {
                                  form.setValue("contentNiche.categories", currentCategories.filter(id => id !== category.id));
                                }
                              }}
                              checked={(form.getValues("contentNiche.categories") || []).includes(category.id)}
                            />
                            <Label
                              htmlFor={`category-${category.id}`}
                              className="cursor-pointer"
                            >
                              {category.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-lg font-medium">Content Format Preferences</Label>
                        <div className="text-sm text-muted-foreground">Select all that apply</div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {contentFormats.map((format) => (
                          <div key={format.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`format-${format.id}`}
                              onCheckedChange={(checked) => {
                                const currentFormats = form.getValues("contentNiche.formats") || [];
                                if (checked) {
                                  form.setValue("contentNiche.formats", [...currentFormats, format.id]);
                                } else {
                                  form.setValue("contentNiche.formats", currentFormats.filter(id => id !== format.id));
                                }
                              }}
                              checked={(form.getValues("contentNiche.formats") || []).includes(format.id)}
                            />
                            <Label
                              htmlFor={`format-${format.id}`}
                              className="cursor-pointer"
                            >
                              {format.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="posting-frequency" className="text-lg font-medium">Posting Frequency</Label>
                      <RadioGroup
                        id="posting-frequency"
                        className="flex flex-wrap gap-4 mt-3"
                        defaultValue={form.getValues("contentNiche.postingFrequency")}
                        onValueChange={(value) => form.setValue("contentNiche.postingFrequency", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="daily" id="daily" />
                          <Label htmlFor="daily">Daily</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekly" id="weekly" />
                          <Label htmlFor="weekly">Weekly</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bi-weekly" id="bi-weekly" />
                          <Label htmlFor="bi-weekly">Bi-weekly</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly">Monthly</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </motion.div>
                </TabsContent>
                
                {/* Collaboration Preferences Tab */}
                <TabsContent value="collaborationPreferences">
                  <motion.div
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-lg font-medium">Campaign Types</Label>
                        <div className="text-sm text-muted-foreground">Select all that apply</div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {campaignTypes.map((campaign) => (
                          <div key={campaign.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`campaign-${campaign.id}`}
                              onCheckedChange={(checked) => {
                                const currentCampaigns = form.getValues("collaborationPreferences.campaignTypes") || [];
                                if (checked) {
                                  form.setValue("collaborationPreferences.campaignTypes", [...currentCampaigns, campaign.id]);
                                } else {
                                  form.setValue("collaborationPreferences.campaignTypes", currentCampaigns.filter(id => id !== campaign.id));
                                }
                              }}
                              checked={(form.getValues("collaborationPreferences.campaignTypes") || []).includes(campaign.id)}
                            />
                            <Label
                              htmlFor={`campaign-${campaign.id}`}
                              className="cursor-pointer"
                            >
                              {campaign.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between">
                          <Label htmlFor="minBudget" className="text-lg font-medium">Minimum Budget Expectation</Label>
                          <span className="font-medium text-primary">
                            ${form.watch("collaborationPreferences.minBudget") || 500}
                          </span>
                        </div>
                        <Slider
                          id="minBudget"
                          defaultValue={[form.getValues("collaborationPreferences.minBudget") || 500]}
                          max={10000}
                          min={100}
                          step={100}
                          className="mt-6"
                          onValueChange={(values) => form.setValue("collaborationPreferences.minBudget", values[0])}
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>$100</span>
                          <span>$10,000+</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-lg font-medium">Preferred Collaboration Mode</Label>
                      <RadioGroup
                        defaultValue={form.getValues("collaborationPreferences.preferredCollaborationMode")}
                        onValueChange={(value) => form.setValue("collaborationPreferences.preferredCollaborationMode", value)}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                          <div className="flex items-center space-x-2 border p-4 rounded-lg">
                            <RadioGroupItem value="remote" id="remote" />
                            <Label htmlFor="remote">Remote Collaboration</Label>
                          </div>
                          <div className="flex items-center space-x-2 border p-4 rounded-lg">
                            <RadioGroupItem value="in-person" id="in-person" />
                            <Label htmlFor="in-person">In-Person Events</Label>
                          </div>
                          <div className="flex items-center space-x-2 border p-4 rounded-lg">
                            <RadioGroupItem value="hybrid" id="hybrid" />
                            <Label htmlFor="hybrid">Hybrid Approach</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </motion.div>
                </TabsContent>
                
                {/* Availability Tab */}
                <TabsContent value="availability">
                  <motion.div
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="availability"
                        checked={form.watch("availability.isAvailable")}
                        onCheckedChange={(checked) => form.setValue("availability.isAvailable", checked)}
                      />
                      <Label htmlFor="availability" className="text-lg font-medium">Available for new collaborations</Label>
                    </div>
                    
                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Preferred Posting Times</Label>
                      <div className="bg-accent/20 p-6 rounded-lg">
                        <ToggleGroup 
                          type="multiple" 
                          className="flex flex-wrap gap-3 justify-start"
                          defaultValue={form.getValues("availability.preferredTimes") || []}
                          onValueChange={(value) => form.setValue("availability.preferredTimes", value)}
                        >
                          <ToggleGroupItem value="morning" aria-label="Toggle morning">
                            Morning
                          </ToggleGroupItem>
                          <ToggleGroupItem value="afternoon" aria-label="Toggle afternoon">
                            Afternoon
                          </ToggleGroupItem>
                          <ToggleGroupItem value="evening" aria-label="Toggle evening">
                            Evening
                          </ToggleGroupItem>
                          <ToggleGroupItem value="weekdays" aria-label="Toggle weekdays">
                            Weekdays
                          </ToggleGroupItem>
                          <ToggleGroupItem value="weekends" aria-label="Toggle weekends">
                            Weekends
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                
                {/* Referral Tab */}
                <TabsContent value="referral">
                  <motion.div
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">Your Referral Code</h3>
                      <div className="flex gap-4 items-center">
                        <div className="bg-background border-2 border-dashed border-primary/30 p-4 rounded-lg flex-1 text-center">
                          <p className="text-2xl font-bold tracking-wider">{form.watch("referral.code")}</p>
                        </div>
                        <Button variant="outline" className="flex gap-2" onClick={() => {
                          navigator.clipboard.writeText(form.getValues("referral.code") || "");
                          toast({
                            title: "Copied!",
                            description: "Referral code copied to clipboard"
                          });
                        }}>
                          <span>Copy</span>
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Share this code with others to earn rewards when they sign up</p>
                    </div>
                    
                    <div className="border-t pt-6 mt-6">
                      <h3 className="text-lg font-medium mb-4">Have a Referral Code?</h3>
                      <div className="flex gap-4 items-end">
                        <div className="flex-1">
                          <Label htmlFor="referrerCode">Enter referrer's code</Label>
                          <Input 
                            id="referrerCode"
                            placeholder="Enter code here" 
                            {...form.register("referral.referrerCode")}
                          />
                        </div>
                        <Button variant="secondary">Apply Code</Button>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                
                {/* Verification Tab */}
                <TabsContent value="verification">
                  <motion.div
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-medium mb-2">Identity Verification</h3>
                      <p className="text-sm text-muted-foreground mb-4">Upload documents to verify your identity and increase your trust score</p>
                      
                      <div className="bg-accent/20 p-6 rounded-lg">
                        <Label htmlFor="kycDocuments" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md flex items-center gap-2 w-fit">
                          <Upload className="h-4 w-4" />
                          Upload ID Document
                          <input
                            id="kycDocuments"
                            type="file"
                            accept="image/*, application/pdf"
                            className="hidden"
                            onChange={(e) => {
                              // Here you would typically handle the file upload
                              if (e.target.files?.[0]) {
                                form.setValue("verification.kycDocuments", e.target.files[0].name);
                              }
                            }}
                          />
                        </Label>
                        
                        {form.watch("verification.kycDocuments") && (
                          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                            <Check className="h-4 w-4" />
                            <span>Document uploaded: {form.watch("verification.kycDocuments")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Press Mentions</h3>
                      <p className="text-sm text-muted-foreground mb-4">Have you been featured in any publications? Share the details</p>
                      
                      <Textarea 
                        placeholder="E.g., Featured in Vogue September 2024 issue, page 42" 
                        {...form.register("verification.pressMentions")}
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Social Proof</h3>
                      <p className="text-sm text-muted-foreground mb-4">Add links to your best-performing content or collaborations</p>
                      
                      <div className="space-y-2">
                        <Input 
                          placeholder="https://www.example.com/your-content" 
                          value={form.watch("verification.socialProofLinks")?.[0] || ""}
                          onChange={(e) => {
                            const currentLinks = [...(form.getValues("verification.socialProofLinks") || [])];
                            currentLinks[0] = e.target.value;
                            form.setValue("verification.socialProofLinks", currentLinks);
                          }}
                        />
                        <Input 
                          placeholder="https://www.example.com/your-content" 
                          value={form.watch("verification.socialProofLinks")?.[1] || ""}
                          onChange={(e) => {
                            const currentLinks = [...(form.getValues("verification.socialProofLinks") || [])];
                            currentLinks[1] = e.target.value;
                            form.setValue("verification.socialProofLinks", currentLinks);
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                
                {/* AI Analytics Tab */}
                <TabsContent value="aiAnalytics">
                  <motion.div
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <FileCheck className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-medium">AI-Enhanced Profile</h3>
                      </div>
                      <p className="text-sm">
                        Our AI will analyze your content and engagement metrics to provide insights and help you optimize your profile. 
                        The more information you provide, the more accurate our AI recommendations will be.
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="bio" className="text-lg font-medium">Bio</Label>
                      <p className="text-sm text-muted-foreground mb-2">Write a short bio that describes your content style and personality</p>
                      <Textarea 
                        id="bio"
                        placeholder="I'm a lifestyle content creator focused on sustainable living and mindfulness. My content is authentic, relatable, and aims to inspire people to make small, positive changes in their daily lives."
                        {...form.register("aiAnalytics.bio")}
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-lg font-medium">Hashtags</Label>
                      <p className="text-sm text-muted-foreground mb-2">Enter hashtags you commonly use (comma separated)</p>
                      <Input 
                        placeholder="#sustainableliving, #mindfulness, #ecofriendly"
                        onChange={(e) => {
                          const hashtags = e.target.value.split(',').map(tag => tag.trim());
                          form.setValue("aiAnalytics.hashtags", hashtags);
                        }}
                      />
                    </div>
                    
                    <div className="border-t pt-6 space-y-4">
                      <div>
                        <Label className="text-lg font-medium">Top Post Metrics</Label>
                        <p className="text-sm text-muted-foreground mb-4">Enter approximate numbers for your best performing content</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="engagement">Average Engagement</Label>
                            <Input 
                              id="engagement"
                              type="number"
                              placeholder="Likes, comments, shares"
                              onChange={(e) => form.setValue("aiAnalytics.topPostMetrics.engagement", parseFloat(e.target.value))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="reach">Average Reach</Label>
                            <Input 
                              id="reach"
                              type="number"
                              placeholder="Views, impressions"
                              onChange={(e) => form.setValue("aiAnalytics.topPostMetrics.reach", parseFloat(e.target.value))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="conversions">Conversions (if known)</Label>
                            <Input 
                              id="conversions"
                              type="number"
                              placeholder="Clicks, sales"
                              onChange={(e) => form.setValue("aiAnalytics.topPostMetrics.conversions", parseFloat(e.target.value))}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-lg font-medium">Audience Insights</Label>
                        <p className="text-sm text-muted-foreground mb-4">Share what you know about your audience</p>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="demographics">Demographics</Label>
                            <Input 
                              id="demographics"
                              placeholder="E.g., Women 25-34, US and UK based"
                              {...form.register("aiAnalytics.audienceInsights.demographics")}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="interests">Audience Interests (comma separated)</Label>
                            <Input 
                              id="interests"
                              placeholder="E.g., sustainable fashion, vegan recipes, fitness"
                              onChange={(e) => {
                                const interests = e.target.value.split(',').map(interest => interest.trim());
                                form.setValue("aiAnalytics.audienceInsights.interests", interests);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={goToPreviousTab}
                    disabled={activeTab === "personalInfo"}
                    className="flex items-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div>
                    {activeTab === "aiAnalytics" ? (
                      <Button type="submit" className="flex items-center gap-1">
                        Complete Profile
                        <Check className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button type="button" onClick={goToNextTab} className="flex items-center gap-1">
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex justify-center pb-6 pt-2">
            <p className="text-xs text-center text-muted-foreground max-w-md">
              By completing your profile, you agree to our Terms of Service and Privacy Policy regarding the use of your data.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfileSetupPage;
