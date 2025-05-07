
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import FormSection from './FormSection';
import { Control, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { campaignFormSchema } from '@/pages/campaigns/schema';

type FormValues = z.infer<typeof campaignFormSchema>;

interface ReferralSystemSectionProps {
  control: Control<FormValues>;
}

const ReferralSystemSection: React.FC<ReferralSystemSectionProps> = ({ control }) => {
  const enableReferral = useWatch({
    control,
    name: "enableReferral",
    defaultValue: false
  });

  return (
    <div id="referral-system">
      <FormSection 
        title="Referral System" 
        tooltip="Offer rewards for referring other influencers"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField
              control={control}
              name="enableReferral"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Enable Referral Bonuses
                    </FormLabel>
                    <FormDescription>
                      Allow influencers to earn rewards by referring others
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

          {enableReferral && (
            <div className="sm:col-span-2 animate-fade-in">
              <FormField
                control={control}
                name="referralReward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referral Reward Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5">$</span>
                        <Input
                          type="number"
                          className="pl-6"
                          placeholder="500"
                          min={0}
                          value={field.value || ""}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Amount paid per successful referral
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      </FormSection>
    </div>
  );
};

export default ReferralSystemSection;
