
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import FormSection from './FormSection';
import TagInput from './TagInput';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { campaignFormSchema } from '@/pages/campaigns/schema';

type FormValues = z.infer<typeof campaignFormSchema>;

interface TargetAudienceSectionProps {
  control: Control<FormValues>;
  regions: string[];
  interestOptions: string[];
}

const TargetAudienceSection: React.FC<TargetAudienceSectionProps> = ({ 
  control, 
  regions, 
  interestOptions 
}) => {
  return (
    <div id="target-audience">
      <FormSection 
        title="Target Audience" 
        tooltip="Define who you want your campaign to reach"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField
              control={control}
              name="regions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Regions</FormLabel>
                  <FormControl>
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Add region..."
                    />
                  </FormControl>
                  <FormDescription>
                    Suggested: {regions.slice(0, 4).join(', ')}...
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:col-span-2">
            <FormField
              control={control}
              name="ageRange"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Target Age Range</FormLabel>
                    <span className="text-sm text-muted-foreground">
                      {field.value[0]} - {field.value[1]} years
                    </span>
                  </div>
                  <FormControl>
                    <Slider
                      value={field.value}
                      min={13}
                      max={65}
                      step={1}
                      minStepsBetweenThumbs={1}
                      className="mt-6"
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Focus on relevant age demographics for your product
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:col-span-2">
            <FormField
              control={control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Interests</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {interestOptions.map((interest) => (
                        <div
                          key={interest}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`interest-${interest}`}
                            checked={field.value.includes(interest)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, interest]);
                              } else {
                                field.onChange(
                                  field.value.filter((i) => i !== interest)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={`interest-${interest}`}
                            className="text-sm cursor-pointer"
                          >
                            {interest}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Select interests that align with your product or service
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

export default TargetAudienceSection;
