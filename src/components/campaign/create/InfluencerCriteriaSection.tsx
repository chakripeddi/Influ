
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import FormSection from './FormSection';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { campaignFormSchema } from '@/pages/campaigns/schema';

type FormValues = z.infer<typeof campaignFormSchema>;

interface InfluencerCriteriaSectionProps {
  control: Control<FormValues>;
}

const InfluencerCriteriaSection: React.FC<InfluencerCriteriaSectionProps> = ({ control }) => {
  return (
    <div id="influencer-criteria">
      <FormSection 
        title="Influencer Criteria" 
        tooltip="Set requirements for influencers who can apply"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={control}
            name="minFollowers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Followers</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={500}
                    value={field.value}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription>
                  Minimum number of followers required
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="engagementRate"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Minimum Engagement Rate</FormLabel>
                  <span className="text-sm text-muted-foreground">
                    {field.value}%
                  </span>
                </div>
                <FormControl>
                  <Slider
                    value={[field.value]}
                    min={0}
                    max={20}
                    step={0.1}
                    onValueChange={(v) => field.onChange(v[0])}
                  />
                </FormControl>
                <FormDescription>
                  Average likes, comments, and shares per post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="sm:col-span-2">
            <FormField
              control={control}
              name="preferPastCollaborators"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Prefer Past Collaborators
                    </FormLabel>
                    <FormDescription>
                      Prioritize influencers you've worked with before
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
          </div>
        </div>
      </FormSection>
    </div>
  );
};

export default InfluencerCriteriaSection;
