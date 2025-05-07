
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import FormSection from './FormSection';
import MediaUploader from './MediaUploader';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { campaignFormSchema } from '@/pages/campaigns/schema';

type FormValues = z.infer<typeof campaignFormSchema>;

interface ComplianceSectionProps {
  control: Control<FormValues>;
}

const ComplianceSection: React.FC<ComplianceSectionProps> = ({ control }) => {
  return (
    <div id="compliance">
      <FormSection 
        title="Compliance & Contracts" 
        tooltip="Legal considerations for your campaign"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField
              control={control}
              name="termsFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terms & Conditions</FormLabel>
                  <FormControl>
                    <MediaUploader
                      onChange={field.onChange}
                      value={field.value}
                      acceptedTypes=".pdf,.doc,.docx"
                      maxFiles={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload any terms & conditions or contract documents
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:col-span-2">
            <FormField
              control={control}
              name="requireNda"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Require NDA
                    </FormLabel>
                    <FormDescription>
                      Influencers must sign an NDA before viewing campaign details
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

export default ComplianceSection;
