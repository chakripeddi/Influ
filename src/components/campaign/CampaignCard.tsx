
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, Youtube, Facebook, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface CampaignProps {
  id: string;
  title: string;
  brand: string;
  brandLogo?: string;
  description: string;
  budget: string;
  platforms: ('instagram' | 'youtube' | 'facebook')[];
  category: string;
  deadline: string;
}

const platformIcons = {
  instagram: <Instagram size={16} />,
  youtube: <Youtube size={16} />,
  facebook: <Facebook size={16} />
};

const CampaignCard: React.FC<CampaignProps> = ({
  id,
  title,
  brand,
  brandLogo,
  description,
  budget,
  platforms,
  category,
  deadline
}) => {
  return (
    <Card className="card-hover overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              {brandLogo ? (
                <img 
                  src={brandLogo} 
                  alt={brand} 
                  className="w-10 h-10 rounded-full object-cover border"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center border">
                  <span className="font-semibold text-brand-dark">
                    {brand.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-semibold truncate max-w-[200px]">{title}</h3>
                <p className="text-sm text-muted-foreground">{brand}</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-brand-light text-brand-dark">
              {category}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <DollarSign size={18} className="text-green-600" />
              <span className="font-medium">{budget}</span>
            </div>
            <div className="flex items-center gap-2">
              {platforms.map(platform => (
                <div 
                  key={platform}
                  className="bg-muted w-7 h-7 flex items-center justify-center rounded-full"
                >
                  {platformIcons[platform]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t px-6 py-3 bg-muted/30">
        <p className="text-xs text-muted-foreground">
          Deadline: {deadline}
        </p>
        <Link to={`/campaigns/${id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
