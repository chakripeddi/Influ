
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import FormSection from './FormSection';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { campaignFormSchema } from '@/pages/campaigns/schema';

type FormValues = z.infer<typeof campaignFormSchema>;

interface PlatformSelectionSectionProps {
  control: Control<FormValues>;
  platformOptions: string[];
  contentTypeOptions: string[];
}

const PlatformSelectionSection: React.FC<PlatformSelectionSectionProps> = ({ 
  control, 
  platformOptions, 
  contentTypeOptions 
}) => {
  return (
    <div id="platform-selection">
      <FormSection 
        title="Platform Selection" 
        tooltip="Choose platforms and content types for your campaign"
      >
        <div className="grid gap-6">
          <FormField
            control={control}
            name="platforms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Platforms</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {platformOptions.map((platform) => (
                      <div
                        key={platform}
                        className={`border rounded-md p-3 cursor-pointer transition-all ${
                          field.value.includes(platform)
                            ? "border-primary bg-primary/5"
                            : "border-muted hover:border-primary/50"
                        }`}
                        onClick={() => {
                          if (field.value.includes(platform)) {
                            field.onChange(field.value.filter((p) => p !== platform));
                          } else {
                            field.onChange([...field.value, platform]);
                          }
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`platform-${platform}`}
                            checked={field.value.includes(platform)}
                            onCheckedChange={() => {}}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (field.value.includes(platform)) {
                                field.onChange(field.value.filter((p) => p !== platform));
                              } else {
                                field.onChange([...field.value, platform]);
                              }
                            }}
                          />
                          <label
                            htmlFor={`platform-${platform}`}
                            className="font-medium cursor-pointer"
                          >
                            {platform}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormDescription>
                  Select all platforms where you want your campaign to run
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="contentTypes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content Types</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {contentTypeOptions.map((contentType) => (
                      <div
                        key={contentType}
                        onClick={() => {
                          if (field.value.includes(contentType)) {
                            field.onChange(field.value.filter((c) => c !== contentType));
                          } else {
                            field.onChange([...field.value, contentType]);
                          }
                        }}
                        className={`border rounded-full px-3 py-1 cursor-pointer transition-colors ${
                          field.value.includes(contentType)
                            ? "bg-primary text-primary-foreground border-transparent"
                            : "bg-background text-foreground hover:bg-muted/50"
                        }`}
                      >
                        {contentType}
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormDescription>
                  Select the types of content you want influencers to create
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </FormSection>
    </div>
  );
};

export default PlatformSelectionSection;
