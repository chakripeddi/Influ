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
import { Slider } from '@/components/ui/slider';
import { Instagram, Youtube, Facebook, TikTok, Twitch } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CampaignCategory } from '@/types/campaign';

interface CampaignFilterProps {
  setSearchQuery: (query: string) => void;
  setPlatformFilter: (platforms: string[]) => void;
  setCategoryFilter: (category: string) => void;
  platforms: string[];
  budgetRange: [number, number];
  setBudgetRange: (range: [number, number]) => void;
}

const platformIcons = {
  instagram: <Instagram className="h-4 w-4" />,
  youtube: <Youtube className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
  tiktok: <TikTok className="h-4 w-4" />,
  twitch: <Twitch className="h-4 w-4" />,
};

const categories = [
  { value: 'fashion', label: 'Fashion', color: 'bg-purple-100 text-purple-800' },
  { value: 'beauty', label: 'Beauty', color: 'bg-pink-100 text-pink-800' },
  { value: 'tech', label: 'Tech', color: 'bg-blue-100 text-blue-800' },
  { value: 'fitness', label: 'Fitness', color: 'bg-green-100 text-green-800' },
  { value: 'food', label: 'Food', color: 'bg-orange-100 text-orange-800' },
  { value: 'travel', label: 'Travel', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'gaming', label: 'Gaming', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'lifestyle', label: 'Lifestyle', color: 'bg-gray-100 text-gray-800' },
];

const CampaignFilter: React.FC<CampaignFilterProps> = ({
  setSearchQuery,
  setPlatformFilter,
  setCategoryFilter,
  platforms,
  budgetRange,
  setBudgetRange,
}) => {
  const handlePlatformToggle = (platform: string) => {
    setPlatformFilter(
      platforms.includes(platform)
        ? platforms.filter(p => p !== platform)
        : [...platforms, platform]
    );
  };

  const formatBudget = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Filter Campaigns</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
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

        {/* Platforms */}
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">
            Platforms
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(platformIcons).map(([platform, icon]) => (
              <Button
                key={platform}
                size="sm"
                variant={platforms.includes(platform) ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  platforms.includes(platform) ? 'bg-brand-purple' : ''
                }`}
                onClick={() => handlePlatformToggle(platform)}
              >
                {icon}
                <span className="capitalize">{platform}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">
            Categories
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.value}
                variant="outline"
                className={`cursor-pointer hover:opacity-80 ${
                  category.color
                }`}
                onClick={() => setCategoryFilter(category.value)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Budget Range */}
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">
            Budget Range
          </label>
          <div className="px-2">
            <Slider
              min={0}
              max={10000}
              step={100}
              value={budgetRange}
              onValueChange={setBudgetRange}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatBudget(budgetRange[0])}</span>
              <span>{formatBudget(budgetRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">
            Target Audience
          </label>
          <Select onValueChange={(value) => console.log('Age range:', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Age Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="13-17">13-17 years</SelectItem>
              <SelectItem value="18-24">18-24 years</SelectItem>
              <SelectItem value="25-34">25-34 years</SelectItem>
              <SelectItem value="35-44">35-44 years</SelectItem>
              <SelectItem value="45-54">45-54 years</SelectItem>
              <SelectItem value="55+">55+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">
            Location
          </label>
          <Select onValueChange={(value) => console.log('Location:', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="north-america">North America</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
              <SelectItem value="africa">Africa</SelectItem>
              <SelectItem value="south-america">South America</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full" size="sm">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default CampaignFilter;
