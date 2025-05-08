import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import MainLayout from '@/components/layout/MainLayout';
import CampaignCard from '@/components/campaign/CampaignCard';
import CampaignFilter from '@/components/campaign/CampaignFilter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { AuthStatus } from '@/components/auth/AuthStatus';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';
import { CampaignCategory, CampaignStatus } from '@/types/campaign';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

const Campaigns = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Setup infinite scroll
  const { ref: loadMoreRef, inView } = useInView();

  // Fetch campaigns with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error
  } = useInfiniteQuery({
    queryKey: ['campaigns', {
      search: debouncedSearch,
      platforms: platformFilter,
      category: categoryFilter,
      minBudget: budgetRange[0],
      maxBudget: budgetRange[1],
      sortBy,
      sortOrder
    }],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get('/campaigns', {
        params: {
          page: pageParam,
          limit: 10,
          search: debouncedSearch,
          platform: platformFilter,
          category: categoryFilter !== 'all' ? categoryFilter : undefined,
          minBudget: budgetRange[0],
          maxBudget: budgetRange[1],
          sortBy,
          sortOrder
        }
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) return undefined;
      return lastPage.page + 1;
    }
  });

  // Load more when scrolling to bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Handle error
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load campaigns. Please try again.",
        variant: "destructive"
      });
    }
  }, [error, toast]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? '↑' : '↓';
  };

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
                budgetRange={budgetRange}
                setBudgetRange={setBudgetRange}
              />
            </div>
            
            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search campaigns..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created_at">Newest First</SelectItem>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="ai_score">Match Score</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {status === 'loading' ? (
                <div className="text-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-muted-foreground">Loading campaigns...</p>
                </div>
              ) : status === 'error' ? (
                <div className="text-center p-8 bg-destructive/10 rounded-lg">
                  <p className="text-destructive">Failed to load campaigns</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {data?.pages.map((page, i) => (
                      <React.Fragment key={i}>
                        {page.data.map(campaign => (
                          <CampaignCard 
                            key={campaign.id}
                            id={campaign.id}
                            title={campaign.title}
                            brand={campaign.brand}
                            description={campaign.description}
                            budget={campaign.budget}
                            platforms={campaign.platforms}
                            category={campaign.category}
                            deadline={campaign.deadline}
                            aiScore={campaign.ai_score}
                          />
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  {/* Infinite scroll trigger */}
                  <div ref={loadMoreRef} className="h-10 mt-4">
                    {isFetchingNextPage && (
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                      </div>
                    )}
                  </div>
                  
                  {!hasNextPage && data?.pages[0].data.length > 0 && (
                    <div className="text-center text-muted-foreground mt-4">
                      No more campaigns to load
                    </div>
                  )}
                  
                  {data?.pages[0].data.length === 0 && (
                    <div className="text-center p-8 bg-muted rounded-lg">
                      <Search className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No campaigns found</h3>
                      <p className="mt-2 text-muted-foreground">
                        Try adjusting your search filters
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthStatus>
  );
};

export default Campaigns;
