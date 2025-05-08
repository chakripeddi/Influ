import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import FormSection from './FormSection';
import RichTextEditor from './RichTextEditor';
import MediaUploader from './MediaUploader';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { campaignFormSchema } from '@/pages/campaigns/schema';

type FormValues = z.infer<typeof campaignFormSchema>;

interface CampaignDetailsSectionProps {
  control: Control<FormValues>;
  campaignTypes: string[];
  onAiSuggestions: () => void;
  isGeneratingAi: boolean;
}

const CampaignDetailsSection: React.FC<CampaignDetailsSectionProps> = ({ 
  control, 
  campaignTypes,
  onAiSuggestions,
  isGeneratingAi
}) => {
  return (
    <div id="campaign-details">
      <FormSection 
        title="Campaign Details" 
        tooltip="Basic information about your campaign"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Campaign Title</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={onAiSuggestions}
                      disabled={isGeneratingAi}
                      className="gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      {isGeneratingAi ? 'Generating...' : 'AI Suggestions'}
                    </Button>
                  </div>
                  <FormControl>
                    <Input 
                      placeholder="Summer Launch Promo" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    A catchy title gets more attention
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {campaignTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="sm:col-span-2">
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Description</FormLabel>
                  <FormControl>
                    <RichTextEditor 
                      value={field.value} 
                      onChange={field.onChange} 
                      placeholder="Describe your campaign in detail. Include key messages, goals, and brand guidelines."
                    />
                  </FormControl>
                  <FormDescription>
                    Use formatting to make important points stand out
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:col-span-2">
            <FormField
              control={control}
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Media</FormLabel>
                  <FormControl>
                    <MediaUploader 
                      onChange={field.onChange}
                      value={field.value}
                      acceptedTypes="image/*,video/*"
                      maxFiles={5}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload brand logo, product images, or video assets
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
};

export default CampaignDetailsSection;
