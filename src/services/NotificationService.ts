
import { supabase } from '@/integrations/supabase/client';
import { Notification, NotificationPreferences, NotificationType } from '@/types/notification';

class NotificationService {
  // Get all notifications for the current user
  async getNotifications(limit = 50, offset = 0, filters: { isRead?: boolean, typeId?: string } = {}): Promise<Notification[]> {
    let query = supabase
      .from('notifications' as any)
      .select(`
        *,
        type:notification_types(*)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    // Apply filters if provided
    if (filters.isRead !== undefined) {
      query = query.eq('is_read', filters.isRead);
    }
    
    if (filters.typeId) {
      query = query.eq('type_id', filters.typeId);
    }

    const { data, error } = await query.returns<any>();
    
    if (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
    
    return data as Notification[] || [];
  }

  // Get unread notification count
  async getUnreadCount(): Promise<number> {
    const { count, error } = await supabase
      .from('notifications' as any)
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false)
      .returns<any>();
    
    if (error) {
      console.error('Error fetching unread count:', error);
      throw error;
    }
    
    return count || 0;
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications' as any)
      .update({ 
        is_read: true,
        read_at: new Date().toISOString()
      })
      .eq('id', notificationId)
      .returns<any>();
    
    if (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    const { error } = await supabase
      .from('notifications' as any)
      .update({ 
        is_read: true, 
        read_at: new Date().toISOString()
      })
      .eq('is_read', false)
      .returns<any>();
    
    if (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  // Get user notification preferences
  async getPreferences(): Promise<NotificationPreferences> {
    const { data, error } = await supabase
      .from('notification_preferences' as any)
      .select('*')
      .single()
      .returns<any>();
    
    if (error) {
      console.error('Error fetching notification preferences:', error);
      throw error;
    }
    
    return data as NotificationPreferences;
  }

  // Update user notification preferences
  async updatePreferences(preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    // Add updated_at timestamp
    const updates = {
      ...preferences,
      updated_at: new Date().toISOString()
    };
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('notification_preferences' as any)
      .update(updates)
      .eq('user_id', user?.id || '')
      .select()
      .single()
      .returns<any>();
    
    if (error) {
      console.error('Error updating notification preferences:', error);
      throw error;
    }
    
    return data as NotificationPreferences;
  }

  // Get all notification types
  async getNotificationTypes(): Promise<NotificationType[]> {
    const { data, error } = await supabase
      .from('notification_types' as any)
      .select('*')
      .returns<any>();
    
    if (error) {
      console.error('Error fetching notification types:', error);
      throw error;
    }
    
    return data as NotificationType[] || [];
  }

  // Listen for new notifications in real-time
  async subscribeToNotifications(callback: (notification: Notification) => void) {
    // Get current user - properly await the Promise
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id || '';
    
    return supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new as Notification);
        }
      )
      .subscribe();
  }
}

export const notificationService = new NotificationService();
