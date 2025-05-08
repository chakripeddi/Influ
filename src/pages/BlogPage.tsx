import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, Tag } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Future of Influencer Marketing in 2024",
    excerpt: "Discover the latest trends and predictions for influencer marketing in the coming year.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    category: "Trends",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "How to Build an Authentic Brand-Influencer Relationship",
    excerpt: "Learn the key strategies for creating genuine partnerships between brands and influencers.",
    author: "David Chen",
    date: "March 10, 2024",
    category: "Strategy",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Measuring ROI in Influencer Marketing Campaigns",
    excerpt: "A comprehensive guide to tracking and analyzing the success of your influencer campaigns.",
    author: "Emily Rodriguez",
    date: "March 5, 2024",
    category: "Analytics",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&auto=format&fit=crop&q=60"
  }
];

const categories = [
  "All Posts",
  "Trends",
  "Strategy",
  "Analytics",
  "Case Studies",
  "Platform Updates"
];

const BlogPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Blog | Influencer Adsense</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Influencer Marketing Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends, strategies, and insights in influencer marketing
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-6">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Tag className="h-4 w-4" />
                  <span>Featured</span>
                </div>
                <CardTitle className="text-2xl mb-2">
                  The Ultimate Guide to Influencer Marketing in 2024
                </CardTitle>
                <CardDescription className="text-base">
                  Everything you need to know about creating successful influencer marketing campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Sarah Johnson</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>March 20, 2024</span>
                  </div>
                </div>
                <Button className="mt-4">Read More</Button>
              </CardContent>
            </div>
            <div className="relative h-64 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60"
                alt="Featured post"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Tag className="h-4 w-4" />
                  <span>{post.category}</span>
                </div>
                <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <Button variant="ghost" className="mt-4 w-full">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Subscribe to Our Newsletter</CardTitle>
            <CardDescription>
              Get the latest articles and insights delivered straight to your inbox
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input placeholder="Enter your email" type="email" />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default BlogPage; 