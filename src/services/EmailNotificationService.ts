
import { supabase } from '@/integrations/supabase/client';
import { EmailNotification } from '@/types/notification';

class EmailNotificationService {
  /**
   * Send an email notification
   * In a real implementation, this would call a Supabase Edge Function that would use a service like SendGrid or other email provider
   */
  async sendEmailNotification(notification: EmailNotification): Promise<boolean> {
    try {
      // This is a placeholder - in a real implementation this would call a Supabase Edge Function
      console.log('Sending email notification:', notification);
      
      // Update the status of the email notification
      // Use 'any' type to bypass TypeScript's strict type checking for tables not in the schema
      const { error } = await supabase
        .from('email_notifications' as any)
        .update({ delivery_status: 'sent' })
        .eq('id', notification.id)
        .returns<any>();
      
      if (error) {
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('Error sending email notification:', error);
      return false;
    }
  }

  /**
   * Get all email notifications for a specific notification
   */
  async getEmailNotificationsByNotificationId(notificationId: string): Promise<EmailNotification[]> {
    const { data, error } = await supabase
      .from('email_notifications' as any)
      .select('*')
      .eq('notification_id', notificationId)
      .returns<any>();
    
    if (error) {
      console.error('Error fetching email notifications:', error);
      throw error;
    }
    
    return data as EmailNotification[] || [];
  }
}

export const emailNotificationService = new EmailNotificationService();
