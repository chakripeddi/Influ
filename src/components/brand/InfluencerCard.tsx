
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Influencer {
  id: number;
  name: string;
  profileImage: string;
  platform: string;
  engagementRate: string;
  cost: number;
  roi: number;
}

interface InfluencerCardProps {
  influencer: Influencer;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({ influencer }) => {
  const initials = influencer.name
    .replace('@', '')
    .split('_')
    .map(part => part[0]?.toUpperCase() || '')
    .join('');
    
  return (
    <motion.div 
      className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={influencer.profileImage} alt={influencer.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
          <div className="h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
            <TrendingUp className="h-2 w-2 text-white" />
          </div>
        </div>
      </div>
      
      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <div>
            <p className="font-medium text-sm">{influencer.name}</p>
            <p className="text-xs text-muted-foreground">{influencer.platform}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{influencer.engagementRate}</p>
            <p className="text-xs text-green-600">{influencer.roi}x ROI</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InfluencerCard;
