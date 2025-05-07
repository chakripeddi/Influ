
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DollarSign, Target, Globe, Instagram, Youtube, AtSign } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Form validation schema
const formSchema = z.object({
  influencerTier: z.string({
    required_error: "Please select an influencer tier",
  }),
  budgetRange: z.array(z.number()).refine(values => values.length === 2, {
    message: "Budget range is required",
  }),
  platforms: z.array(z.string()).refine(value => value.length > 0, {
    message: "You have to select at least one platform",
  }),
  campaignGoals: z.array(z.string()).refine(value => value.length > 0, {
    message: "You have to select at least one goal",
  }),
  targetRegion: z.string({
    required_error: "Please select a target region",
  }),
});

type FormValues = z.infer<typeof formSchema>;

// Influencer tiers
const INFLUENCER_TIERS = [
  { value: "nano", label: "Nano (1K-10K followers)" },
  { value: "micro", label: "Micro (10K-100K followers)" },
  { value: "mid", label: "Mid-tier (100K-500K followers)" },
  { value: "macro", label: "Macro (500K-1M followers)" },
  { value: "mega", label: "Mega (1M+ followers)" },
  { value: "any", label: "Any size (We're flexible)" },
];

// Campaign goals
const CAMPAIGN_GOALS = [
  { id: "awareness", label: "Brand Awareness" },
  { id: "consideration", label: "Product Consideration" },
  { id: "conversion", label: "Direct Conversions" },
  { id: "ugc", label: "Generate User Content" },
  { id: "loyalty", label: "Build Customer Loyalty" },
  { id: "education", label: "Product Education" },
  { id: "launch", label: "New Product Launch" },
];

// Platforms
const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "tiktok", label: "TikTok", icon: AtSign },
];

// Geographic regions
const TARGET_REGIONS = [
  { value: "global", label: "Global (Worldwide)" },
  { value: "north-america", label: "North America" },
  { value: "europe", label: "Europe" },
  { value: "asia-pacific", label: "Asia-Pacific" },
  { value: "latin-america", label: "Latin America" },
  { value: "africa", label: "Africa" },
  { value: "middle-east", label: "Middle East" },
  { value: "custom", label: "Custom Selection" },
];

// Format budget number to currency
const formatBudget = (value: number) => {
  if (value >= 1000) {
    return `$${(value / 1000).toLocaleString()}K`;
  }
  return `$${value}`;
};

const CampaignPreferencesForm = () => {
  // Initialize form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      influencerTier: "",
      budgetRange: [5000, 10000],
      platforms: [],
      campaignGoals: [],
      targetRegion: "",
    },
  });
  
  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Campaign Preferences Form Data:", data);
    // Here you would typically send this data to your API
    toast.success("Campaign preferences saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Campaign Preferences</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Preferred Influencer Tier */}
          <FormField
            control={form.control}
            name="influencerTier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Influencer Tier</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select influencer size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INFLUENCER_TIERS.map((tier) => (
                      <SelectItem key={tier.value} value={tier.value}>
                        {tier.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  What size of influencer audience are you targeting?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Budget Range */}
          <FormField
            control={form.control}
            name="budgetRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  Budget Range
                </FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    <Slider
                      min={1000}
                      max={50000}
                      step={1000}
                      defaultValue={[5000, 10000]}
                      value={field.value}
                      onValueChange={field.onChange}
                      className="mt-6"
                    />
                    <div className="flex justify-between">
                      <span className="text-sm">{formatBudget(field.value[0])}</span>
                      <span className="text-sm">{formatBudget(field.value[1])}</span>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Your approximate campaign budget range
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Target Platforms */}
          <FormField
            control={form.control}
            name="platforms"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Target Platforms</FormLabel>
                  <FormDescription>
                    Select the social platforms you want to focus on
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {PLATFORMS.map((platform) => (
                    <FormField
                      key={platform.id}
                      control={form.control}
                      name="platforms"
                      render={({ field }) => {
                        const Icon = platform.icon;
                        return (
                          <FormItem
                            key={platform.id}
                            className="flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent cursor-pointer"
                            onClick={() => {
                              const newValue = field.value.includes(platform.id)
                                ? field.value.filter(val => val !== platform.id)
                                : [...field.value, platform.id];
                              field.onChange(newValue);
                            }}
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(platform.id)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, platform.id]
                                    : field.value.filter(val => val !== platform.id);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <Icon className="h-4 w-4" />
                            <FormLabel className="font-normal cursor-pointer">
                              {platform.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          
          {/* Campaign Goals */}
          <FormField
            control={form.control}
            name="campaignGoals"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Campaign Goals</FormLabel>
                  <FormDescription>
                    What are you looking to achieve with your campaigns?
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CAMPAIGN_GOALS.map((goal) => (
                    <FormField
                      key={goal.id}
                      control={form.control}
                      name="campaignGoals"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={goal.id}
                            className="flex items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-accent cursor-pointer"
                            onClick={() => {
                              const newValue = field.value.includes(goal.id)
                                ? field.value.filter(val => val !== goal.id)
                                : [...field.value, goal.id];
                              field.onChange(newValue);
                            }}
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(goal.id)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, goal.id]
                                    : field.value.filter(val => val !== goal.id);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {goal.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          
          {/* Geographic Target */}
          <FormField
            control={form.control}
            name="targetRegion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  Geographic Target Audience
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TARGET_REGIONS.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Primary geographic focus for your campaigns
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Future map feature placeholder */}
          <div className="rounded-md bg-muted/50 border border-dashed border-muted-foreground/30 p-4 flex flex-col items-center justify-center h-32">
            <Globe className="h-6 w-6 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-sm font-medium">Detailed geo-targeting coming soon</p>
            <p className="text-xs text-muted-foreground/70">Select specific countries, states, and cities for targeting</p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CampaignPreferencesForm;
