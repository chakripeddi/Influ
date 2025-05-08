import { api } from '@/lib/api';
import { Notification, NotificationPreferences, NotificationType } from '@/types/notification';

class NotificationService {
  // Get all notifications for the current user
  async getNotifications(limit = 50, offset = 0, filters: { isRead?: boolean, typeId?: string } = {}): Promise<Notification[]> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
      ...(filters.isRead !== undefined && { isRead: filters.isRead.toString() }),
      ...(filters.typeId && { typeId: filters.typeId })
    });

    const response = await api.get(`/notifications?${params}`);
    return response.data;
  }

  // Get unread notification count
  async getUnreadCount(): Promise<number> {
    const response = await api.get('/notifications/unread/count');
    return response.data.count;
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<void> {
    await api.patch(`/notifications/${notificationId}/read`);
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    await api.patch('/notifications/read-all');
  }

  // Get user notification preferences
  async getPreferences(): Promise<NotificationPreferences> {
    const response = await api.get('/notifications/preferences');
    return response.data;
  }

  // Update user notification preferences
  async updatePreferences(preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    const response = await api.patch('/notifications/preferences', preferences);
    return response.data;
  }

  // Get all notification types
  async getNotificationTypes(): Promise<NotificationType[]> {
    const response = await api.get('/notifications/types');
    return response.data;
  }

  // Listen for new notifications in real-time
  async subscribeToNotifications(callback: (notification: Notification) => void) {
    // For now, we'll use polling since we don't have WebSocket support
    // In a real implementation, we would use WebSocket or Server-Sent Events
    const pollInterval = setInterval(async () => {
      try {
        const notifications = await this.getNotifications(1, 0, { isRead: false });
        if (notifications.length > 0) {
          callback(notifications[0]);
        }
      } catch (error) {
        console.error('Error polling for notifications:', error);
      }
    }, 30000); // Poll every 30 seconds

    return {
      unsubscribe: () => clearInterval(pollInterval)
    };
  }
}

export const notificationService = new NotificationService();
