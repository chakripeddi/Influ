
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CampaignCardProps {
  id: string;
  title: string;
  brandName: string;
  brandLogo?: string;
  budget: string;
  description: string;
  platforms: string[];
  deadline: string;
  category: string;
  className?: string;
}

const CampaignCard = ({
  id,
  title,
  brandName,
  brandLogo,
  budget,
  description,
  platforms,
  deadline,
  category,
  className
}: CampaignCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 h-full",
        "hover:shadow-lg hover:-translate-y-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 pb-2">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            {brandLogo ? (
              <img
                src={brandLogo}
                alt={brandName}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <Briefcase className="h-5 w-5 text-primary" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-base">{title}</h3>
            <p className="text-sm text-muted-foreground">{brandName}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {platforms.map((platform) => (
            <Badge key={platform} variant="secondary" className="text-xs">
              {platform}
            </Badge>
          ))}
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium">Budget:</span>
          <span className="font-semibold">{budget}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Deadline:</span>
          <span className="text-muted-foreground">{deadline}</span>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-muted/20">
        <div className="w-full">
          <div 
            className={cn(
              "transition-all duration-300 transform",
              isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
          >
            <Button 
              asChild 
              className="w-full" 
              variant="default" 
              size="sm"
              ripple
            >
              <Link to={`/campaigns/${id}`}>
                <span>View Details</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          <div 
            className={cn(
              "transition-all duration-300 transform absolute inset-x-6 bottom-4",
              isHovered ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"
            )}
          >
            <p className="text-xs font-medium text-center text-muted-foreground">
              Hover for actions
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
