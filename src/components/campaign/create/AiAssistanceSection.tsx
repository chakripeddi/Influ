
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FormSection from './FormSection';
import { Control, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { campaignFormSchema } from '@/pages/campaigns/schema';

type FormValues = z.infer<typeof campaignFormSchema>;

interface AiAssistanceSectionProps {
  control: Control<FormValues>;
  optimizationOptions: { value: string; label: string }[];
  handleAiSuggestions: () => void;
}

const AiAssistanceSection: React.FC<AiAssistanceSectionProps> = ({ 
  control, 
  optimizationOptions, 
  handleAiSuggestions 
}) => {
  const enableAiMatching = useWatch({
    control,
    name: "enableAiMatching",
    defaultValue: true
  });

  return (
    <div id="ai-assistance">
      <FormSection 
        title="AI-Powered Campaign Assistance" 
        tooltip="Use AI to optimize your campaign performance"
      >
        <div className="grid gap-6">
          <div className="flex justify-between mb-4">
            <div>
              <h4 className="text-base font-medium">AI Campaign Assistant</h4>
              <p className="text-sm text-muted-foreground">
                Our AI can enhance your campaign with smart recommendations
              </p>
            </div>
            <Button 
              variant="outline"
              size="sm"
              onClick={handleAiSuggestions}
              className="flex items-center gap-1"
            >
              <Sparkles className="h-4 w-4" />
              Generate AI Suggestions
            </Button>
          </div>
          
          <FormField
            control={control}
            name="enableAiMatching"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Enable AI Influencer Matching
                  </FormLabel>
                  <FormDescription>
                    Our AI will recommend the best influencers for your campaign
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

          {enableAiMatching && (
            <FormField
              control={control}
              name="optimizationFocus"
              render={({ field }) => (
                <FormItem className="animate-fade-in">
                  <FormLabel>Optimization Focus</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                    >
                      {optimizationOptions.map((option) => (
                        <FormItem key={option.value} className="space-y-0">
                          <FormControl>
                            <div
                              className={`border rounded-md p-3 cursor-pointer transition-all flex flex-col items-center gap-2 ${
                                field.value === option.value
                                  ? "border-primary bg-primary/5"
                                  : "border-muted hover:border-muted-foreground"
                              }`}
                              onClick={() => field.onChange(option.value)}
                            >
                              <RadioGroupItem
                                value={option.value}
                                id={`optimization-${option.value}`}
                                className="sr-only"
                              />
                              <label
                                htmlFor={`optimization-${option.value}`}
                                className="cursor-pointer text-center"
                              >
                                <div className="font-medium">{option.label}</div>
                              </label>
                            </div>
                          </FormControl>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Choose what aspect of your campaign the AI should prioritize
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </FormSection>
    </div>
  );
};

export default AiAssistanceSection;
