
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Building2, Upload, HelpCircle } from "lucide-react";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useBrandProfileSetup } from "@/hooks/useBrandProfileSetup";

// Define industry categories
const INDUSTRY_CATEGORIES = [
  "Fashion & Apparel",
  "Beauty & Cosmetics",
  "Tech & Electronics",
  "Food & Beverage",
  "Health & Wellness",
  "Finance & Banking",
  "Education & Learning",
  "Travel & Hospitality",
  "Home & Furniture",
  "Entertainment",
  "Sports & Fitness",
  "Automotive",
  "Real Estate",
  "Other"
];

// Form validation schema
const formSchema = z.object({
  brandName: z.string().min(2, "Brand name must be at least 2 characters"),
  websiteUrl: z.string().url("Please enter a valid URL"),
  industryCategory: z.string().min(1, "Please select an industry category"),
  brandTagline: z.string().optional(),
  logo: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const BusinessIdentityForm = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { saveBusinessIdentity, isSubmitting } = useBrandProfileSetup();
  
  // Initialize form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "",
      websiteUrl: "",
      industryCategory: "",
      brandTagline: "",
    },
  });
  
  // Handle logo file upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Logo file size should be less than 5MB");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
        form.setValue("logo", file);
      };
      reader.readAsDataURL(file);
      toast.success("Logo uploaded successfully");
    }
  };
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    const result = await saveBusinessIdentity(data);
    if (result.success) {
      toast.success("Business identity information saved!");
    } else {
      toast.error(`Error saving business identity: ${result.error}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Business Identity</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brand Name */}
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Website URL */}
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://yourbrand.com" 
                      {...field} 
                      type="url" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Industry Category */}
          <FormField
            control={form.control}
            name="industryCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry Category*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INDUSTRY_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Brand Tagline */}
          <FormField
            control={form.control}
            name="brandTagline"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Brand Tagline or Slogan</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">A catchy phrase that represents your brand's identity (optional)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <Textarea 
                    placeholder="Enter your brand's tagline or slogan" 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Optional: A short phrase that captures your brand's essence
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Logo Upload */}
          <div className="space-y-3">
            <FormLabel>Company Logo</FormLabel>
            <div className="flex items-center gap-6">
              <div 
                className={`
                  relative flex items-center justify-center w-28 h-28 
                  rounded-lg border-2 border-dashed transition-all duration-300
                  ${logoPreview ? 'border-primary/50' : 'border-muted-foreground/30 hover:border-primary/70'}
                `}
              >
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="Brand Logo"
                    className="w-full h-full object-contain rounded-lg" 
                  />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground/50" />
                )}
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleLogoUpload}
                />
              </div>
              
              <div className="flex flex-col">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('logo-upload')?.click()}
                  className="mb-2"
                >
                  <Upload className="mr-2 h-4 w-4" /> 
                  Upload Logo
                </Button>
                <p className="text-xs text-muted-foreground">
                  Upload a high-quality PNG or JPG (max 5MB)
                </p>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Business Identity"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BusinessIdentityForm;
