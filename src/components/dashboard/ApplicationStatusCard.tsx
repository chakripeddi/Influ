
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Clock, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ApplicationStep = 'submitted' | 'in_review' | 'approved' | 'rejected' | 'deliverables' | 'completed';

interface ApplicationStatusCardProps {
  campaignTitle: string;
  brandName: string;
  currentStep: ApplicationStep;
  notes?: Record<ApplicationStep, string>;
  className?: string;
}

const ApplicationStatusCard = ({
  campaignTitle,
  brandName,
  currentStep,
  notes,
  className,
}: ApplicationStatusCardProps) => {
  const steps: { key: ApplicationStep; label: string }[] = [
    { key: 'submitted', label: 'Application Submitted' },
    { key: 'in_review', label: 'In Review' },
    { key: 'approved', label: 'Approved' },
    { key: 'deliverables', label: 'Deliverables' },
    { key: 'completed', label: 'Completed' },
  ];

  // Remove "Approved" step if application was rejected
  const filteredSteps = currentStep === 'rejected'
    ? steps.filter(step => step.key !== 'approved' && step.key !== 'deliverables' && step.key !== 'completed')
    : steps;
  
  // Add "Rejected" step if application was rejected
  if (currentStep === 'rejected') {
    filteredSteps.push({ key: 'rejected', label: 'Rejected' });
  }

  const getStepStatus = (step: ApplicationStep) => {
    const stepOrder: Record<ApplicationStep, number> = {
      submitted: 1,
      in_review: 2,
      approved: 3,
      rejected: 3,
      deliverables: 4,
      completed: 5
    };

    const currentStepOrder = stepOrder[currentStep];
    const thisStepOrder = stepOrder[step];

    if (thisStepOrder < currentStepOrder) {
      return 'completed';
    } else if (thisStepOrder === currentStepOrder) {
      return 'current';
    } else {
      return 'upcoming';
    }
  };

  const getStepIcon = (step: ApplicationStep) => {
    const status = getStepStatus(step);

    if (status === 'completed') {
      return <Check className="h-5 w-5 text-white" />;
    } else if (status === 'current') {
      if (step === 'rejected') {
        return <X className="h-5 w-5 text-white" />;
      }
      return <Loader2 className="h-5 w-5 text-white animate-spin" />;
    } else {
      return <Clock className="h-5 w-5 text-muted" />;
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="text-lg">{campaignTitle}</CardTitle>
        <p className="text-sm text-muted-foreground">{brandName}</p>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-4 top-0 w-[1px] h-full bg-muted" />
          
          <div className="space-y-8">
            {filteredSteps.map((step, index) => {
              const status = getStepStatus(step.key);
              const isRejected = step.key === 'rejected';
              
              return (
                <div key={step.key} className="relative pl-12">
                  {/* Step indicator */}
                  <div 
                    className={cn(
                      "absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full",
                      status === 'completed' ? "bg-primary" :
                      status === 'current' && isRejected ? "bg-destructive" :
                      status === 'current' ? "bg-primary" :
                      "bg-secondary border border-muted"
                    )}
                  >
                    {getStepIcon(step.key)}
                  </div>
                  
                  {/* Step content */}
                  <div>
                    <h4 className="text-sm font-medium">{step.label}</h4>
                    {notes && notes[step.key] && (
                      <p className="mt-1 text-xs text-muted-foreground">{notes[step.key]}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationStatusCard;
