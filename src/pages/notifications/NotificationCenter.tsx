
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNotifications } from '@/contexts/NotificationContext';
import { formatDistanceToNow, format } from 'date-fns';
import { 
  Bell, 
  CheckCircle, 
  Filter, 
  RefreshCcw, 
  Search 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ToggleGroup,
  ToggleGroupItem
} from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import MainLayout from '@/components/layout/MainLayout';
import { Notification } from '@/types/notification';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const NotificationCenter = () => {
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead, refreshNotifications } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');

  // Filter notifications based on search term and filters
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesReadFilter = 
      filter === 'all' || 
      (filter === 'unread' && !notification.is_read) || 
      (filter === 'read' && notification.is_read);

    const matchesDateFilter = (() => {
      if (dateRange === 'all') return true;
      
      const notificationDate = new Date(notification.created_at);
      const now = new Date();
      
      if (dateRange === 'today') {
        return notificationDate.toDateString() === now.toDateString();
      } else if (dateRange === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return notificationDate >= oneWeekAgo;
      } else if (dateRange === 'month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return notificationDate >= oneMonthAgo;
      }
      
      return true;
    })();

    return matchesSearch && matchesReadFilter && matchesDateFilter;
  });

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.is_read) {
      await markAsRead(notification.id);
    }
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Notification Center</title>
      </Helmet>
      
      <div className="container max-w-4xl py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Notification Center</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={refreshNotifications}>
              <RefreshCcw className="h-4 w-4 mr-1" /> Refresh
            </Button>
            {unreadCount > 0 && (
              <Button variant="default" size="sm" onClick={markAllAsRead}>
                <CheckCircle className="h-4 w-4 mr-1" /> Mark all as read
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notifications"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={dateRange} onValueChange={(value: any) => setDateRange(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Past week</SelectItem>
                <SelectItem value="month">Past month</SelectItem>
              </SelectContent>
            </Select>
            <ToggleGroup type="single" value={filter} onValueChange={(value: any) => value && setFilter(value)}>
              <ToggleGroupItem value="all" aria-label="Show all notifications">
                All
              </ToggleGroupItem>
              <ToggleGroupItem value="unread" aria-label="Show unread notifications">
                Unread
              </ToggleGroupItem>
              <ToggleGroupItem value="read" aria-label="Show read notifications">
                Read
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading notifications...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <Alert className="bg-muted/50">
            <Bell className="h-4 w-4" />
            <AlertTitle>No notifications found</AlertTitle>
            <AlertDescription>
              {searchTerm || filter !== 'all' || dateRange !== 'all' ? 
                "Try changing your filters or search term." : 
                "You don't have any notifications yet."}
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4 border rounded-lg overflow-hidden">
            {filteredNotifications.map((notification, index) => (
              <div key={notification.id}>
                {index > 0 && <Separator />}
                <div 
                  className={`p-4 ${!notification.is_read ? 'bg-muted/50' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="font-medium">{notification.title}</h3>
                        {!notification.is_read && (
                          <Badge variant="default" className="ml-2 text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>
                          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                        </span>
                        <span className="mx-1">•</span>
                        <span>
                          {format(new Date(notification.created_at), 'PPp')}
                        </span>
                        {notification.type && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{notification.type.name}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NotificationCenter;
