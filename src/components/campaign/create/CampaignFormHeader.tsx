
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Save, EyeIcon, Loader2, CircleCheck } from 'lucide-react';

interface CampaignFormHeaderProps {
  isSubmitting: boolean;
  saveDraft: () => void;
  handleSubmit: () => void;
  showPreview: () => void;
}

const CampaignFormHeader: React.FC<CampaignFormHeaderProps> = ({
  isSubmitting,
  saveDraft,
  handleSubmit,
  showPreview
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">Create Campaign</h1>
        <p className="text-muted-foreground">
          Set up a new campaign to connect with perfect influencers
        </p>
      </div>
      
      <div className="flex gap-2 mt-4 md:mt-0">
        <Button 
          variant="outline" 
          onClick={saveDraft}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Draft
        </Button>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline"
              onClick={showPreview}
            >
              <EyeIcon className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Preview how your campaign will look to influencers</p>
          </TooltipContent>
        </Tooltip>
        
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CircleCheck className="mr-2 h-4 w-4" />
          )}
          Launch Campaign
        </Button>
      </div>
    </div>
  );
};

export default CampaignFormHeader;
