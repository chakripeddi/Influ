
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import FormSection from './FormSection';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { campaignFormSchema } from '@/pages/campaigns/schema';

type FormValues = z.infer<typeof campaignFormSchema>;

interface DeliverablesTimelineSectionProps {
  control: Control<FormValues>;
}

const DeliverablesTimelineSection: React.FC<DeliverablesTimelineSectionProps> = ({ control }) => {
  return (
    <div id="deliverables-timeline">
      <FormSection 
        title="Deliverables & Timeline" 
        tooltip="Define what influencers need to deliver and when"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={control}
            name="numDeliverables"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Posts/Reels</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    value={field.value}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <FormDescription>
                  Total number of content pieces to be delivered
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Campaign Duration</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Select date range</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={{
                        from: field.value?.from,
                        to: field.value?.to
                      }}
                      onSelect={(range) => {
                        if (range && range.from) {
                          field.onChange({
                            from: range.from,
                            to: range.to || range.from
                          });
                        }
                      }}
                      numberOfMonths={2}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Start and end dates for the campaign
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="sm:col-span-2">
            <FormField
              control={control}
              name="requirePreapproval"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Require Content Pre-approval
                    </FormLabel>
                    <FormDescription>
                      Influencers must submit content for review before publishing
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

export default DeliverablesTimelineSection;
