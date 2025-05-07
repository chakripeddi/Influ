
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Gift, CreditCard, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";

// Form validation schema
const formSchema = z.object({
  referralCode: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ReferralForm = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [referralStatus, setReferralStatus] = useState<'none' | 'valid' | 'invalid'>('none');
  
  // Initialize form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      referralCode: "",
    },
  });
  
  // Validate referral code (mock implementation)
  const validateReferralCode = async (code: string) => {
    if (!code) {
      toast.error("Please enter a referral code");
      return;
    }
    
    setIsValidating(true);
    
    // Simulate API call to validate code
    setTimeout(() => {
      // For demo purposes, codes starting with "REF" are valid
      const isValid = code.toUpperCase().startsWith('REF');
      
      setReferralStatus(isValid ? 'valid' : 'invalid');
      
      if (isValid) {
        toast.success("Referral code applied successfully!");
      } else {
        toast.error("Invalid referral code");
      }
      
      setIsValidating(false);
    }, 1500);
  };
  
  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Referral Form Data:", data);
    
    // If there's a referral code, validate it
    if (data.referralCode) {
      validateReferralCode(data.referralCode);
    } else {
      // Skip referral code
      toast.info("No referral code provided");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Gift className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Referral & Rewards</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="border rounded-xl p-5 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-center bg-primary/10 w-12 h-12 rounded-full">
            <Gift className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Referred by Someone?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            If you were referred by an existing user, enter their referral code to earn bonuses for both of you.
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="referralCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referral Code (Optional)</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input 
                          placeholder="Enter referral code" 
                          {...field} 
                          className={referralStatus === 'valid' ? "border-green-500 focus-visible:ring-green-500" : ""}
                        />
                      </FormControl>
                      <Button 
                        type="button"
                        size="sm"
                        disabled={isValidating || !field.value}
                        onClick={() => validateReferralCode(field.value)}
                      >
                        {isValidating ? "Validating..." : "Apply"}
                      </Button>
                    </div>
                    {referralStatus === 'valid' && (
                      <div className="flex items-center gap-2 text-green-500 text-sm mt-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>Valid referral code applied!</span>
                      </div>
                    )}
                    {referralStatus === 'invalid' && (
                      <div className="flex items-center gap-2 text-destructive text-sm mt-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>Invalid referral code</span>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="border rounded-xl p-5 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-center bg-green-50 dark:bg-green-900/20 w-12 h-12 rounded-full">
            <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Referral Benefits</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Share your unique code with other brands to earn rewards when they join.
          </p>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Signup Bonus</span>
                  <span className="text-sm">$10 credit</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Referral Reward</span>
                  <span className="text-sm">$25 per referral</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Max Earnings</span>
                  <span className="text-sm">Unlimited</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full mt-4 gap-1">
            <span>Learn more about our referral program</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
        <div className="flex items-start gap-3">
          <Gift className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-1" />
          <div>
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">Your Unique Referral Code</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400 mb-2">
              After completing setup, you'll receive a unique referral code to share with other brands.
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-500">
              Note: Credits earned through referrals will be available in your wallet after your referred brand launches their first campaign.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralForm;
