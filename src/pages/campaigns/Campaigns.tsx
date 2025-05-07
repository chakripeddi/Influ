
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import CampaignCard from '@/components/campaign/CampaignCard';
import CampaignFilter from '@/components/campaign/CampaignFilter';
import { Button } from '@/components/ui/button';
import { AuthStatus } from '@/components/auth/AuthStatus';

const Campaigns = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Mock data - would be replaced by API calls
  const campaignsData = [
    {
      id: '1',
      title: 'Summer Fashion Collection',
      brand: 'StyleVibe',
      description: 'Looking for fashion influencers to showcase our new summer collection with a focus on sustainable materials and beach wear.',
      budget: '$1,000 - $2,500',
      platforms: ['instagram', 'facebook'],
      category: 'fashion',
      deadline: 'June 15, 2025'
    },
    {
      id: '2',
      title: 'Tech Gadget Review',
      brand: 'TechNova',
      description: 'Seeking tech reviewers to create in-depth video reviews of our latest smart home devices.',
      budget: '$2,500 - $5,000',
      platforms: ['youtube'],
      category: 'tech',
      deadline: 'May 30, 2025'
    },
    {
      id: '3',
      title: 'Fitness Program Promotion',
      brand: 'ActiveLife',
      description: 'Looking for fitness influencers to promote our 30-day workout program with before/after results.',
      budget: '$1,500 - $3,000',
      platforms: ['instagram', 'youtube', 'facebook'],
      category: 'fitness',
      deadline: 'June 5, 2025'
    },
    {
      id: '4',
      title: 'Vegan Meal Kit Partnership',
      brand: 'GreenEats',
      description: 'Seeking food influencers to showcase our plant-based meal kits with recipe preparations.',
      budget: '$1,200 - $3,500',
      platforms: ['instagram', 'youtube'],
      category: 'food',
      deadline: 'June 20, 2025'
    },
  ];
  
  // Filter campaigns based on search and filters
  const filteredCampaigns = campaignsData.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          campaign.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || campaign.category === categoryFilter;
    
    const matchesPlatform = platformFilter.length === 0 || 
                           campaign.platforms.some(platform => platformFilter.includes(platform));
    
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  return (
    <AuthStatus requireAuth={false}>
      <MainLayout>
        <Helmet>
          <title>Find Campaigns | Influencer Adsense</title>
        </Helmet>
        
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Find Campaigns</h1>
              <p className="text-muted-foreground">
                Browse opportunities that match your audience and platform
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button asChild>
                <Link to="/campaigns/create">Create Campaign</Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <CampaignFilter 
                setSearchQuery={setSearchQuery}
                setPlatformFilter={setPlatformFilter}
                setCategoryFilter={setCategoryFilter}
                platforms={platformFilter}
              />
            </div>
            
            <div className="lg:col-span-3">
              <div className="mb-4 text-muted-foreground">
                Showing {filteredCampaigns.length} campaigns
              </div>
              
              <div className="space-y-6">
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map(campaign => (
                    <CampaignCard 
                      key={campaign.id}
                      id={campaign.id}
                      title={campaign.title}
                      brand={campaign.brand}
                      description={campaign.description}
                      budget={campaign.budget}
                      platforms={campaign.platforms as ('instagram' | 'youtube' | 'facebook')[]}
                      category={campaign.category}
                      deadline={campaign.deadline}
                    />
                  ))
                ) : (
                  <div className="text-center p-8 bg-muted rounded-lg">
                    <p className="text-lg mb-2">No campaigns found</p>
                    <p className="text-muted-foreground">
                      Try adjusting your search filters
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthStatus>
  );
};

export default Campaigns;
