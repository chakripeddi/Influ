import React from 'react';
import { Button } from '@/components/ui/button';
import { EyeIcon, Loader2, CircleCheck } from 'lucide-react';
import { toast } from 'sonner';

interface FormFooterProps {
  isSubmitting: boolean;
  isSavingDraft: boolean;
  saveDraft: () => Promise<void>;
  handleSubmit: () => Promise<void>;
  showPreview: () => void;
}

const FormFooter: React.FC<FormFooterProps> = ({
  isSubmitting,
  isSavingDraft,
  saveDraft,
  handleSubmit,
  showPreview
}) => {
  const handleSaveDraft = async () => {
    try {
      await saveDraft();
      toast.success('Draft saved successfully');
    } catch (error) {
      toast.error('Failed to save draft');
    }
  };

  const handleLaunch = async () => {
    try {
      await handleSubmit();
      toast.success('Campaign launched successfully');
    } catch (error) {
      toast.error('Failed to launch campaign');
    }
  };

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <Button
        variant="outline"
        onClick={handleSaveDraft}
        disabled={isSavingDraft || isSubmitting}
      >
        {isSavingDraft ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          'Save as Draft'
        )}
      </Button>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={showPreview}
          disabled={isSubmitting || isSavingDraft}
        >
          <EyeIcon className="mr-2 h-4 w-4" />
          Preview Campaign
        </Button>
        <Button
          onClick={handleLaunch}
          disabled={isSubmitting || isSavingDraft}
          className="min-w-[150px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Launching...
            </>
          ) : (
            <>
              <CircleCheck className="mr-2 h-4 w-4" />
              Launch Campaign
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormFooter;
