
import React from 'react';
import { Button } from '@/components/ui/button';
import { EyeIcon, Loader2, CircleCheck } from 'lucide-react';

interface FormFooterProps {
  isSubmitting: boolean;
  saveDraft: () => void;
  handleSubmit: () => void;
  showPreview: () => void;
}

const FormFooter: React.FC<FormFooterProps> = ({
  isSubmitting,
  saveDraft,
  handleSubmit,
  showPreview
}) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <Button
        variant="outline"
        onClick={saveDraft}
      >
        Save as Draft
      </Button>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={showPreview}
        >
          <EyeIcon className="mr-2 h-4 w-4" />
          Preview Campaign
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
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
