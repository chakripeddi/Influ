import React from 'react';
import { Eye, Heart, MousePointer, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Campaign {
  id: number;
  name: string;
  status: 'live' | 'draft' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  stats: {
    views: string;
    likes: string;
    clicks: string;
  };
}

interface CampaignCardProps {
  campaign: Campaign;
  onAction: (campaignId: number, action: string) => Promise<void>;
  isLoading?: boolean;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const statusColors = {
  live: 'bg-green-100 text-green-800',
  draft: 'bg-amber-100 text-amber-800',
  completed: 'bg-blue-100 text-blue-800',
};

const statusLabels = {
  live: 'Live',
  draft: 'Draft',
  completed: 'Completed',
};

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onAction, isLoading }) => {
  const progressPercentage = campaign.spent > 0 
    ? Math.min(Math.round((campaign.spent / campaign.budget) * 100), 100) 
    : 0;
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <div className="p-4 md:col-span-1">
            <h3 className="font-semibold mb-1">{campaign.name}</h3>
            <div className="flex items-center mb-3">
              <Badge 
                variant="secondary"
                className={statusColors[campaign.status]}
              >
                {statusLabels[campaign.status]}
              </Badge>
              
              <div className="text-xs text-muted-foreground ml-2 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
              </div>
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
                    <div 
                      className={`h-2.5 rounded-full ${
                        progressPercentage > 80 ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Budget spent: ${campaign.spent.toLocaleString()} of ${campaign.budget.toLocaleString()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="text-xs flex justify-between">
              <span className="text-muted-foreground">Budget</span>
              <span>{progressPercentage}%</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 flex items-center justify-around md:col-span-2 lg:col-span-2">
            <div className="flex flex-col items-center">
              <div className="flex items-center text-muted-foreground text-sm mb-1">
                <Eye className="h-3 w-3 mr-1" />
                <span>Views</span>
              </div>
              <span className="font-semibold">{campaign.stats.views}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center text-muted-foreground text-sm mb-1">
                <Heart className="h-3 w-3 mr-1" />
                <span>Likes</span>
              </div>
              <span className="font-semibold">{campaign.stats.likes}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center text-muted-foreground text-sm mb-1">
                <MousePointer className="h-3 w-3 mr-1" />
                <span>Clicks</span>
              </div>
              <span className="font-semibold">{campaign.stats.clicks}</span>
            </div>
          </div>

          <div className="p-4 flex items-center justify-center bg-gray-50 border-l border-gray-200 lg:col-span-1">
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Button variant="ghost" size="sm" className="flex items-center">
                View Details
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;
