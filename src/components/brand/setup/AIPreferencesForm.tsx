
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Sparkles, BrainCircuit, Lightbulb } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Form validation schema
const formSchema = z.object({
  aiMatchingEnabled: z.boolean().default(true),
  aiSuggestionsEnabled: z.boolean().default(true),
  brandVoice: z.string().min(10, "Please enter at least 10 characters").max(500, "Maximum 500 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const AIPreferencesForm = () => {
  // Initialize form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aiMatchingEnabled: true,
      aiSuggestionsEnabled: true,
      brandVoice: "",
    },
  });
  
  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("AI Preferences Form Data:", data);
    // Here you would typically send this data to your API
    toast.success("AI preferences saved successfully!");
  };

  // AI features to showcase
  const aiFeatures = [
    {
      icon: <BrainCircuit className="h-6 w-6 text-purple-500" />,
      title: "Intelligent Matching",
      description: "Our AI analyzes thousands of influencer profiles to find the perfect match for your brand's specific needs and target audience."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-amber-500" />,
      title: "Smart Suggestions",
      description: "Get AI-powered recommendations for campaign optimization, content ideas, and budget allocation based on your goals."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
      title: "Trend Analysis",
      description: "Stay ahead with AI insights on emerging trends, performing content formats, and optimal posting schedules."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">AI & Collaboration Preferences</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {aiFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-background rounded-lg p-5 border shadow-sm"
          >
            <div className="mb-3">{feature.icon}</div>
            <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* AI-Powered Matching */}
          <FormField
            control={form.control}
            name="aiMatchingEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Enable AI-Powered Matching</FormLabel>
                  <FormDescription>
                    Let our AI find the most suitable influencers for your brand
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          {/* AI Suggestions */}
          <FormField
            control={form.control}
            name="aiSuggestionsEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Enable Smart Suggestions</FormLabel>
                  <FormDescription>
                    Get AI recommendations based on your campaign goals
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          {/* Brand Voice & Style */}
          <FormField
            control={form.control}
            name="brandVoice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Voice & Style</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your brand's voice, style, and values. For example: 'Our brand voice is friendly yet professional. We value authenticity and care about sustainability. Our content style is minimalist with bright colors.'"
                    className="min-h-32 resize-none"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  This helps us match you with influencers who align with your brand identity
                </FormDescription>
                <FormMessage />
                <div className="text-xs text-right text-muted-foreground mt-1">
                  {field.value.length}/500 characters
                </div>
              </FormItem>
            )}
          />
          
          <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-1">AI Insights & Optimization</h3>
                <p className="text-sm text-purple-700 dark:text-purple-400">
                  Our AI uses your preferences to continuously optimize your campaigns, improving performance and ROI over time.
                </p>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AIPreferencesForm;
