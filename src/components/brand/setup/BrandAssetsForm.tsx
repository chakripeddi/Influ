
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileArchive, Upload, Image, File, X, CheckCircle } from "lucide-react";
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
import { Button } from "@/components/ui/button";

// Form validation schema
const formSchema = z.object({
  brandKit: z.any().optional(),
  sampleMedia: z.any().array().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock asset types
interface Asset {
  id: string;
  name: string;
  size: string;
  type: string;
  preview?: string;
}

const BrandAssetsForm = () => {
  const [brandKitFile, setBrandKitFile] = useState<File | null>(null);
  const [sampleMedia, setSampleMedia] = useState<Asset[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Initialize form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandKit: undefined,
      sampleMedia: [],
    },
  });
  
  // Handle brand kit upload
  const handleBrandKitUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // Check if it's a zip file
      if (!file.name.endsWith('.zip')) {
        toast.error("Brand kit must be a .zip file");
        return;
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Brand kit file size should be less than 10MB");
        return;
      }
      
      setBrandKitFile(file);
      form.setValue("brandKit", file);
      toast.success("Brand kit uploaded successfully");
    }
  };
  
  // Handle sample media upload
  const handleSampleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (!files || files.length === 0) return;
    
    // Process each file
    const newMedia: Asset[] = [];
    
    Array.from(files).forEach((file) => {
      // Check file type
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast.error(`${file.name} is not an image or video file`);
        return;
      }
      
      // Check file size (max 5MB per file)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds the 5MB limit`);
        return;
      }
      
      // Create preview for images
      let preview = undefined;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }
      
      // Add to media array
      newMedia.push({
        id: crypto.randomUUID(),
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        preview
      });
    });
    
    setSampleMedia([...sampleMedia, ...newMedia]);
    form.setValue("sampleMedia", [...(form.getValues("sampleMedia") || []), ...Array.from(files)]);
    
    toast.success(`${newMedia.length} files uploaded successfully`);
  };
  
  // Handle drag events for sample media
  const handleDrag = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setIsDragging(true);
    } else if (event.type === 'dragleave') {
      setIsDragging(false);
    }
  };
  
  // Handle drop for sample media
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      // Create an input element and trigger the usual handler
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      
      // Create a new DataTransfer object
      const dataTransfer = new DataTransfer();
      
      // Add the dropped files to the DataTransfer object
      for (let i = 0; i < files.length; i++) {
        dataTransfer.items.add(files[i]);
      }
      
      // Set the files property to the input element
      input.files = dataTransfer.files;
      
      const changeEvent = new Event('change', { bubbles: true });
      input.dispatchEvent(changeEvent);
      
      // Call the handler manually with a synthetic event
      handleSampleMediaUpload({ target: input } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };
  
  // Remove a sample media item
  const removeMedia = (id: string) => {
    const newSampleMedia = sampleMedia.filter(media => media.id !== id);
    setSampleMedia(newSampleMedia);
    
    // Update form value by creating a new array without the removed file
    const newFormMedia = (form.getValues("sampleMedia") || [])?.filter(
      (_: any, index: number) => sampleMedia[index].id !== id
    );
    form.setValue("sampleMedia", newFormMedia);
    
    toast.info("Media file removed");
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Brand Assets Form Data:", data);
    // Here you would typically send this data to your API
    toast.success("Brand assets uploaded successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <FileArchive className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Brand Assets Upload</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Brand Kit Upload */}
          <div className="space-y-4">
            <div>
              <FormLabel>Upload Brand Kit</FormLabel>
              <FormDescription>
                Upload a .zip file containing your brand's logo, color palette, fonts, and guidelines
              </FormDescription>
            </div>
            
            <div 
              className={`
                relative border-2 border-dashed rounded-lg p-6
                ${brandKitFile ? 'border-primary/50 bg-primary/5' : 'border-muted-foreground/30'}
                ${!brandKitFile ? 'hover:border-primary/70 hover:bg-primary/5' : ''}
                transition-all duration-200
              `}
            >
              <input
                type="file"
                id="brand-kit-upload"
                accept=".zip"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleBrandKitUpload}
              />
              
              <div className="flex flex-col items-center justify-center text-center">
                {brandKitFile ? (
                  <div className="flex flex-col items-center">
                    <div className="mb-2 flex items-center justify-center bg-primary/10 w-12 h-12 rounded-full">
                      <FileArchive className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-medium mb-1 text-primary">{brandKitFile.name}</span>
                    <span className="text-sm text-muted-foreground">{formatFileSize(brandKitFile.size)}</span>
                    <div className="flex items-center gap-1 text-green-500 mt-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Uploaded successfully</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive mt-2"
                      onClick={() => {
                        setBrandKitFile(null);
                        form.setValue("brandKit", undefined);
                      }}
                    >
                      <X className="mr-1 h-4 w-4" /> Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="mb-1 font-medium">Drop your brand kit here or click to upload</p>
                    <p className="text-sm text-muted-foreground">Upload a single .zip file (max 10MB)</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sample Media Upload */}
          <div className="space-y-4">
            <div>
              <FormLabel>Upload Sample Ads or Campaign Media</FormLabel>
              <FormDescription>
                Upload examples of past campaigns or media that represents your brand style
              </FormDescription>
            </div>
            
            <div 
              className={`
                relative border-2 border-dashed rounded-lg p-6
                ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/30'}
                ${!isDragging ? 'hover:border-primary/70 hover:bg-primary/5' : ''}
                transition-all duration-200
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="sample-media-upload"
                accept="image/*,video/*"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleSampleMediaUpload}
              />
              
              <div className="flex flex-col items-center justify-center text-center">
                <Image className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="mb-1 font-medium">Drop images and videos here or click to browse</p>
                <p className="text-sm text-muted-foreground">Upload images or videos up to 5MB each</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => document.getElementById('sample-media-upload')?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" /> 
                  Select Files
                </Button>
              </div>
            </div>
            
            {/* Media Preview */}
            {sampleMedia.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Uploaded Media ({sampleMedia.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {sampleMedia.map((media) => (
                    <motion.div 
                      key={media.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="relative group rounded-md overflow-hidden border bg-background"
                    >
                      <div className="aspect-square relative">
                        {media.preview ? (
                          <img 
                            src={media.preview} 
                            alt={media.name}
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <File className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeMedia(media.id)}
                          className="absolute top-1 right-1 bg-black/70 rounded-full p-1
                            opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-medium truncate">{media.name}</p>
                        <p className="text-xs text-muted-foreground">{media.size}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <FileArchive className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Why Upload Brand Assets?</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Your brand assets help influencers understand your visual identity and create content
                  that aligns with your brand. These assets will be available to approved collaborators.
                </p>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BrandAssetsForm;
