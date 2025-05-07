
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FormSectionProps {
  title: string;
  children: ReactNode;
  tooltip?: string;
  className?: string;
}

const FormSection = ({ title, children, tooltip, className = '' }: FormSectionProps) => {
  return (
    <Card className={`mb-6 overflow-visible ${className} animate-fade-in`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg md:text-xl flex items-center gap-2">
          {title}
          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormSection;
