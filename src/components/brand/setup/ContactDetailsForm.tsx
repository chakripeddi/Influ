
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Country codes for phone
const COUNTRY_CODES = [
  { code: "+1", label: "United States (+1)" },
  { code: "+44", label: "United Kingdom (+44)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+91", label: "India (+91)" },
  { code: "+33", label: "France (+33)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+81", label: "Japan (+81)" },
  { code: "+86", label: "China (+86)" },
  { code: "+34", label: "Spain (+34)" },
  { code: "+39", label: "Italy (+39)" },
  // Add more country codes as needed
];

// Form validation schema
const formSchema = z.object({
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  businessEmail: z.string().email("Please enter a valid email address"),
  countryCode: z.string().min(1, "Please select a country code"),
  phoneNumber: z.string()
    .min(5, "Phone number is too short")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  officeAddress: z.string().min(5, "Address must be at least 5 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactDetailsForm = () => {
  // Initialize form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactName: "",
      businessEmail: "",
      countryCode: "+1", // Default to US
      phoneNumber: "",
      officeAddress: "",
    },
  });
  
  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Contact Details Form Data:", data);
    // Here you would typically send this data to your API
    toast.success("Contact details saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Contact Details</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Person Name */}
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Full name" {...field} />
                </FormControl>
                <FormDescription>
                  The main point of contact for your brand
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Business Email */}
          <FormField
            control={form.control}
            name="businessEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Email*</FormLabel>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input 
                      placeholder="contact@yourbrand.com" 
                      type="email"
                      {...field} 
                    />
                  </FormControl>
                </div>
                <FormDescription>
                  All campaign communications will be sent to this email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Phone Number with Country Code */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Code*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COUNTRY_CODES.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Phone Number*</FormLabel>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input 
                        placeholder="Phone number" 
                        type="tel"
                        {...field} 
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Office Address */}
          <FormField
            control={form.control}
            name="officeAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Office Address*</FormLabel>
                <div className="flex items-start">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground mt-2.5" />
                  <FormControl>
                    <Textarea 
                      placeholder="Full address including city, state/province, country and postal code" 
                      className="min-h-24"
                      {...field} 
                    />
                  </FormControl>
                </div>
                <FormDescription>
                  Your brand's primary business location
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Add a map pin feature - could be expanded in future */}
          <div className="rounded-md bg-muted/50 border border-dashed border-muted-foreground/30 p-4 flex flex-col items-center justify-center h-40">
            <MapPin className="h-6 w-6 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-sm font-medium">Map location feature coming soon</p>
            <p className="text-xs text-muted-foreground/70">Pin your exact office location on the map</p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactDetailsForm;
