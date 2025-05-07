
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Notification, NotificationPreferences } from '@/types/notification';
import { notificationService } from '@/services/NotificationService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  preferences: NotificationPreferences | null;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const refreshNotifications = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      const data = await notificationService.getNotifications(20);
      setNotifications(data);

      const count = await notificationService.getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error('Error refreshing notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPreferences = async () => {
    if (!user) return;
    
    try {
      const prefs = await notificationService.getPreferences();
      setPreferences(prefs);
    } catch (error) {
      console.error('Error loading notification preferences:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => 
          notification.id === id 
            ? { ...notification, is_read: true, read_at: new Date().toISOString() } 
            : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => ({ 
          ...notification, 
          is_read: true, 
          read_at: new Date().toISOString() 
        }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const updatePreferences = async (prefs: Partial<NotificationPreferences>) => {
    try {
      const updatedPrefs = await notificationService.updatePreferences(prefs);
      setPreferences(updatedPrefs);
      toast({
        title: "Preferences updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast({
        title: "Update failed",
        description: "Failed to update notification preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      refreshNotifications();
      loadPreferences();
      
      // Subscribe to new notifications
      let subscription: { unsubscribe: () => void } | null = null;
      
      const setupSubscription = async () => {
        try {
          subscription = await notificationService.subscribeToNotifications((notification) => {
            // Add new notification to the list
            setNotifications(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);
            
            // Show toast for new notification
            if (preferences?.in_app_enabled) {
              toast({
                title: notification.title,
                description: notification.message,
              });
            }
            
            // Play sound if enabled
            if (preferences?.sound_enabled) {
              // We would add sound playing logic here when implementing mobile features
            }
          });
        } catch (error) {
          console.error('Error setting up notification subscription:', error);
        }
      };
      
      setupSubscription();
      
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }
  }, [user, preferences?.in_app_enabled, preferences?.sound_enabled]);

  const value = {
    notifications,
    unreadCount,
    loading,
    preferences,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
    updatePreferences,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
