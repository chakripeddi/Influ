
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Menu } from 'lucide-react';

interface MobileNavigationProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="lg:hidden mb-4">
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="mr-2 h-4 w-4" />
        {sidebarOpen ? 'Hide Navigation' : 'Show Navigation'}
      </Button>
      
      {sidebarOpen && (
        <Card className="mt-2 p-4 lg:hidden">
          <nav className="space-y-2">
            <a href="#campaign-details" className="block p-2 hover:bg-accent rounded">Campaign Details</a>
            <a href="#target-audience" className="block p-2 hover:bg-accent rounded">Target Audience</a>
            <a href="#platform-selection" className="block p-2 hover:bg-accent rounded">Platform Selection</a>
            <a href="#influencer-criteria" className="block p-2 hover:bg-accent rounded">Influencer Criteria</a>
            <a href="#deliverables-timeline" className="block p-2 hover:bg-accent rounded">Deliverables & Timeline</a>
            <a href="#budget-compensation" className="block p-2 hover:bg-accent rounded">Budget & Compensation</a>
            <a href="#referral-system" className="block p-2 hover:bg-accent rounded">Referral System</a>
            <a href="#ai-assistance" className="block p-2 hover:bg-accent rounded">AI Assistance</a>
            <a href="#compliance" className="block p-2 hover:bg-accent rounded">Compliance</a>
          </nav>
        </Card>
      )}
    </div>
  );
};

export default MobileNavigation;
