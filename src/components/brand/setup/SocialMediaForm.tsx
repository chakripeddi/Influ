
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Instagram, Facebook, Linkedin, Youtube, Link, ExternalLink, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Form validation schema
const formSchema = z.object({
  instagramUrl: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  facebookUrl: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  linkedinUrl: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  youtubeUrl: z.string().url("Please enter a valid URL").or(z.string().length(0)),
});

type FormValues = z.infer<typeof formSchema>;

// Mock function to simulate fetching followers count
const fetchFollowers = async (platform: string, url: string) => {
  // In a real app, you would make an API call to get actual follower counts
  const randomFollowers = {
    instagram: Math.floor(Math.random() * 50000) + 1000,
    facebook: Math.floor(Math.random() * 20000) + 500,
    linkedin: Math.floor(Math.random() * 5000) + 200,
    youtube: Math.floor(Math.random() * 100000) + 1000,
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return randomFollowers[platform as keyof typeof randomFollowers];
};

interface SocialMediaStats {
  platform: string;
  followers: number;
  connected: boolean;
}

const SocialMediaForm = () => {
  const [stats, setStats] = useState<SocialMediaStats[]>([]);
  const [connecting, setConnecting] = useState<Record<string, boolean>>({});
  
  // Initialize form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instagramUrl: "",
      facebookUrl: "",
      linkedinUrl: "",
      youtubeUrl: "",
    },
  });

  // Get stats for a platform based on URL
  const handleConnect = async (platform: string, url: string) => {
    if (!url) {
      toast.error(`Please enter a valid ${platform} URL`);
      return;
    }
    
    try {
      setConnecting({ ...connecting, [platform]: true });
      const followers = await fetchFollowers(platform, url);
      
      // Update stats
      const updatedStats = [...stats];
      const existingIndex = updatedStats.findIndex(stat => stat.platform === platform);
      
      if (existingIndex > -1) {
        updatedStats[existingIndex] = { platform, followers, connected: true };
      } else {
        updatedStats.push({ platform, followers, connected: true });
      }
      
      setStats(updatedStats);
      toast.success(`Connected to ${platform} successfully!`);
    } catch (error) {
      toast.error(`Failed to connect to ${platform}`);
    } finally {
      setConnecting({ ...connecting, [platform]: false });
    }
  };
  
  // Format follower count
  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };
  
  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Social Media Form Data:", data);
    // Here you would typically send this data to your API
    toast.success("Social media links saved!");
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      case 'youtube': return <Youtube className="h-4 w-4" />;
      default: return <Link className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Instagram className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Social Media Links</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Connected accounts display */}
          {stats.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Connected Accounts</h3>
              <div className="flex flex-wrap gap-3">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.platform}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Badge variant="outline" className="px-3 py-1 flex items-center gap-2 bg-muted/30">
                      {getPlatformIcon(stat.platform)}
                      <span className="font-medium capitalize">{stat.platform}</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {formatFollowers(stat.followers)} followers
                      </span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 ml-1" />
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Instagram */}
          <FormField
            control={form.control}
            name="instagramUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-[#E1306C]" />
                  Instagram
                </FormLabel>
                <div className="flex items-center gap-3">
                  <FormControl>
                    <Input 
                      placeholder="https://instagram.com/yourbrand" 
                      {...field} 
                    />
                  </FormControl>
                  <Button 
                    type="button" 
                    variant="outline"
                    size="sm"
                    disabled={!field.value || connecting.instagram}
                    onClick={() => handleConnect('instagram', field.value)}
                  >
                    {connecting.instagram ? "Connecting..." : "Connect"}
                  </Button>
                </div>
                <FormDescription>
                  Your brand's Instagram profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Facebook */}
          <FormField
            control={form.control}
            name="facebookUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-[#1877F2]" />
                  Facebook
                </FormLabel>
                <div className="flex items-center gap-3">
                  <FormControl>
                    <Input 
                      placeholder="https://facebook.com/yourbrand" 
                      {...field} 
                    />
                  </FormControl>
                  <Button 
                    type="button" 
                    variant="outline"
                    size="sm"
                    disabled={!field.value || connecting.facebook}
                    onClick={() => handleConnect('facebook', field.value)}
                  >
                    {connecting.facebook ? "Connecting..." : "Connect"}
                  </Button>
                </div>
                <FormDescription>
                  Your brand's Facebook page
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* LinkedIn */}
          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                  LinkedIn
                </FormLabel>
                <div className="flex items-center gap-3">
                  <FormControl>
                    <Input 
                      placeholder="https://linkedin.com/company/yourbrand" 
                      {...field} 
                    />
                  </FormControl>
                  <Button 
                    type="button" 
                    variant="outline"
                    size="sm"
                    disabled={!field.value || connecting.linkedin}
                    onClick={() => handleConnect('linkedin', field.value)}
                  >
                    {connecting.linkedin ? "Connecting..." : "Connect"}
                  </Button>
                </div>
                <FormDescription>
                  Your brand's LinkedIn company page
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* YouTube */}
          <FormField
            control={form.control}
            name="youtubeUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-[#FF0000]" />
                  YouTube
                </FormLabel>
                <div className="flex items-center gap-3">
                  <FormControl>
                    <Input 
                      placeholder="https://youtube.com/c/yourbrand" 
                      {...field} 
                    />
                  </FormControl>
                  <Button 
                    type="button" 
                    variant="outline"
                    size="sm"
                    disabled={!field.value || connecting.youtube}
                    onClick={() => handleConnect('youtube', field.value)}
                  >
                    {connecting.youtube ? "Connecting..." : "Connect"}
                  </Button>
                </div>
                <FormDescription>
                  Your brand's YouTube channel
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="p-4 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/30">
            <div className="flex items-start gap-3">
              <ExternalLink className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <h3 className="text-sm font-medium mb-1">Why connect your social accounts?</h3>
                <p className="text-sm text-muted-foreground">
                  Connecting your accounts helps us analyze your existing audience and better match you with influencers who can reach similar demographics.
                </p>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SocialMediaForm;
