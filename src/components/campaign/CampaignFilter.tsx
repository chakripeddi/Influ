
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Instagram, Youtube, Facebook } from 'lucide-react';

interface CampaignFilterProps {
  setSearchQuery: (query: string) => void;
  setPlatformFilter: (platforms: string[]) => void;
  setCategoryFilter: (category: string) => void;
  platforms: string[];
}

const CampaignFilter: React.FC<CampaignFilterProps> = ({
  setSearchQuery,
  setPlatformFilter,
  setCategoryFilter,
  platforms
}) => {
  const handlePlatformToggle = (platform: string) => {
    setPlatformFilter(
      platforms.includes(platform)
        ? platforms.filter(p => p !== platform)
        : [...platforms, platform]
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 sticky top-20">
      <h3 className="font-medium mb-4">Filter Campaigns</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">
            Search
          </label>
          <Input
            type="text"
            placeholder="Search campaigns..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">
            Platforms
          </label>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={platforms.includes('instagram') ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                platforms.includes('instagram') ? 'bg-brand-purple' : ''
              }`}
              onClick={() => handlePlatformToggle('instagram')}
            >
              <Instagram size={16} />
              <span>Instagram</span>
            </Button>
            <Button
              size="sm"
              variant={platforms.includes('youtube') ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                platforms.includes('youtube') ? 'bg-brand-purple' : ''
              }`}
              onClick={() => handlePlatformToggle('youtube')}
            >
              <Youtube size={16} />
              <span>YouTube</span>
            </Button>
            <Button
              size="sm"
              variant={platforms.includes('facebook') ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                platforms.includes('facebook') ? 'bg-brand-purple' : ''
              }`}
              onClick={() => handlePlatformToggle('facebook')}
            >
              <Facebook size={16} />
              <span>Facebook</span>
            </Button>
          </div>
        </div>
        
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">
            Category
          </label>
          <Select onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="beauty">Beauty</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="w-full mt-2" size="sm">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default CampaignFilter;
