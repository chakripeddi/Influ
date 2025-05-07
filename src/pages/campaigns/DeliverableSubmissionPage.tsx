
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthStatus } from '@/components/auth/AuthStatus';
import MainLayout from '@/components/layout/MainLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Check,
  Image,
  Link2,
  Upload,
  X,
} from 'lucide-react';

type UploadState = 'idle' | 'uploading' | 'success' | 'error';
type ContentSubmissionItem = {
  id: string;
  type: 'image' | 'video' | 'link';
  url: string;
  caption?: string;
  hashtags?: string;
  progress: number;
  status: UploadState;
};

const DeliverableSubmissionPage = () => {
  const { id } = useParams<{ id: string }>();
  const [submissionItems, setSubmissionItems] = useState<ContentSubmissionItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock campaign data
  const campaign = {
    id: id || '1',
    title: 'Summer Fashion Collection Showcase',
    brandName: 'FashionForward',
    deliverables: [
      '2 Instagram Feed Posts with product tags',
      '3 Instagram Stories with swipe-up links',
      '1 TikTok video (30-60 seconds)'
    ]
  };

  const handleAddContent = (type: 'image' | 'video' | 'link') => {
    const newItem: ContentSubmissionItem = {
      id: `item-${Date.now()}`,
      type,
      url: '',
      caption: '',
      hashtags: '',
      progress: 0,
      status: 'idle'
    };
    
    setSubmissionItems([...submissionItems, newItem]);
  };

  const handleRemoveContent = (id: string) => {
    setSubmissionItems(submissionItems.filter(item => item.id !== id));
  };

  const handleUrlChange = (id: string, url: string) => {
    setSubmissionItems(
      submissionItems.map(item => 
        item.id === id ? { ...item, url } : item
      )
    );
  };

  const handleCaptionChange = (id: string, caption: string) => {
    setSubmissionItems(
      submissionItems.map(item => 
        item.id === id ? { ...item, caption } : item
      )
    );
  };

  const handleHashtagsChange = (id: string, hashtags: string) => {
    setSubmissionItems(
      submissionItems.map(item => 
        item.id === id ? { ...item, hashtags } : item
      )
    );
  };

  const simulateUpload = (id: string) => {
    // Find the item
    const item = submissionItems.find(i => i.id === id);
    if (!item) return;
    
    // Set status to uploading
    setSubmissionItems(
      submissionItems.map(item => 
        item.id === id ? { ...item, status: 'uploading', progress: 0 } : item
      )
    );
    
    // Simulate progress updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // After a short delay, set to success
        setTimeout(() => {
          setSubmissionItems(
            submissionItems.map(item => 
              item.id === id ? { ...item, status: 'success', progress: 100 } : item
            )
          );
        }, 500);
      }
      
      setSubmissionItems(
        submissionItems.map(item => 
          item.id === id ? { ...item, progress } : item
        )
      );
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Start uploading each item
    submissionItems.forEach(item => {
      if (item.status !== 'success') {
        simulateUpload(item.id);
      }
    });
    
    // Show success message after all uploads complete
    setTimeout(() => {
      setShowSuccess(true);
    }, 3000);
  };

  return (
    <AuthStatus>
      <MainLayout>
        <Helmet>
          <title>Submit Deliverables | Influencer Adsense</title>
        </Helmet>
        
        <div className="container py-8">
          <div className="mb-6">
            <Link to={`/campaigns/${id}`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Campaign
              </Button>
            </Link>
          </div>
          
          {showSuccess ? (
            <Card className="max-w-3xl mx-auto animate-fade-in">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4 animate-bounce">
                  <Check className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Submission Complete!</h2>
                <p className="text-muted-foreground mb-6">
                  Your content has been successfully submitted to {campaign.brandName}.
                  They will review your deliverables and provide feedback soon.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/campaigns">Find More Campaigns</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="max-w-3xl mx-auto">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Submit Deliverables</CardTitle>
                  <CardDescription>
                    Upload content for {campaign.title} campaign
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="font-medium">Required Deliverables:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {campaign.deliverables.map((deliverable, index) => (
                        <li key={index} className="text-sm">{deliverable}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6 mb-6">
                  {submissionItems.map((item) => (
                    <Card key={item.id} className="relative overflow-hidden">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => handleRemoveContent(item.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                      
                      {item.status === 'uploading' && (
                        <div className="absolute bottom-0 left-0 right-0">
                          <Progress value={item.progress} className="h-1 rounded-none" />
                        </div>
                      )}
                      
                      <CardHeader>
                        <CardTitle className="text-base">
                          {item.type === 'image' && "Image Content"}
                          {item.type === 'video' && "Video Content"}
                          {item.type === 'link' && "Link Content"}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`url-${item.id}`}>
                            {item.type === 'link' ? 'Content URL' : 'Upload File'}
                          </Label>
                          {item.type === 'link' ? (
                            <div className="flex">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted">
                                <Link2 className="h-4 w-4 text-muted-foreground" />
                              </span>
                              <Input
                                id={`url-${item.id}`}
                                placeholder="https://"
                                value={item.url}
                                onChange={(e) => handleUrlChange(item.id, e.target.value)}
                                className="rounded-l-none"
                              />
                            </div>
                          ) : (
                            <div className="border border-dashed border-input rounded-md p-4 text-center">
                              {item.status === 'success' ? (
                                <div className="flex items-center justify-center">
                                  <Check className="h-6 w-6 text-green-500 mr-2" />
                                  <span className="text-sm">Upload complete</span>
                                </div>
                              ) : (
                                <>
                                  <Image className="h-8 w-8 mx-auto text-muted-foreground" />
                                  <p className="text-sm mt-2">Drag and drop or click to upload</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {item.type === 'image' ? 'JPG, PNG, WebP (max 10MB)' : 'MP4, MOV (max 100MB)'}
                                  </p>
                                  <Button type="button" variant="outline" size="sm" className="mt-4">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Choose File
                                  </Button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`caption-${item.id}`}>Caption</Label>
                          <Textarea
                            id={`caption-${item.id}`}
                            placeholder="Write a compelling caption..."
                            value={item.caption}
                            onChange={(e) => handleCaptionChange(item.id, e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`hashtags-${item.id}`}>Hashtags</Label>
                          <Input
                            id={`hashtags-${item.id}`}
                            placeholder="#brandname #campaign"
                            value={item.hashtags}
                            onChange={(e) => handleHashtagsChange(item.id, e.target.value)}
                          />
                        </div>
                      </CardContent>
                      
                      {item.status === 'success' && (
                        <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center pointer-events-none">
                          <div className="bg-white rounded-full p-3 shadow-lg animate-bounce">
                            <Check className="h-6 w-6 text-green-500" />
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAddContent('image')}
                  >
                    <Image className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAddContent('video')}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                    Add Video
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAddContent('link')}
                  >
                    <Link2 className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={submissionItems.length === 0} ripple>
                    Submit Deliverables <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </MainLayout>
    </AuthStatus>
  );
};

export default DeliverableSubmissionPage;
