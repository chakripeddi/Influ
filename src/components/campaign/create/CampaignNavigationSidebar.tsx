
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Target, 
  Share2, 
  Users, 
  Calendar, 
  CreditCard, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CampaignNavigationSidebarProps {
  className?: string;
}

const CampaignNavigationSidebar: React.FC<CampaignNavigationSidebarProps> = ({ 
  className = '' 
}) => {
  return (
    <div className={`w-64 ${className}`}>
      <div className="sticky top-20">
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-semibold mb-4">Campaign Navigator</div>
            <nav className="space-y-1">
              <a href="#campaign-details" className="flex items-center p-2 rounded-md hover:bg-accent">
                <FileText className="mr-2 h-4 w-4" />
                Campaign Details
              </a>
              <a href="#target-audience" className="flex items-center p-2 rounded-md hover:bg-accent">
                <Target className="mr-2 h-4 w-4" />
                Target Audience
              </a>
              <a href="#platform-selection" className="flex items-center p-2 rounded-md hover:bg-accent">
                <Share2 className="mr-2 h-4 w-4" />
                Platform Selection
              </a>
              <a href="#influencer-criteria" className="flex items-center p-2 rounded-md hover:bg-accent">
                <Users className="mr-2 h-4 w-4" />
                Influencer Criteria
              </a>
              <a href="#deliverables-timeline" className="flex items-center p-2 rounded-md hover:bg-accent">
                <Calendar className="mr-2 h-4 w-4" />
                Deliverables & Timeline
              </a>
              <a href="#budget-compensation" className="flex items-center p-2 rounded-md hover:bg-accent">
                <CreditCard className="mr-2 h-4 w-4" />
                Budget & Compensation
              </a>
              <a href="#referral-system" className="flex items-center p-2 rounded-md hover:bg-accent">
                <Share2 className="mr-2 h-4 w-4" />
                Referral System
              </a>
              <a href="#ai-assistance" className="flex items-center p-2 rounded-md hover:bg-accent">
                <Sparkles className="mr-2 h-4 w-4" />
                AI Assistance
              </a>
              <a href="#compliance" className="flex items-center p-2 rounded-md hover:bg-accent">
                <AlertCircle className="mr-2 h-4 w-4" />
                Compliance
              </a>
            </nav>
          </CardContent>
        </Card>
        
        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="text-lg font-semibold mb-2">Need help?</div>
            <p className="text-sm text-muted-foreground mb-4">
              Contact our support team for assistance with setting up your campaign.
            </p>
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignNavigationSidebar;
