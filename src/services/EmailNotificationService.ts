import { supabase } from '@/integrations/supabase/client';
import { EmailNotification } from '@/types/notification';
import { renderTemplate } from '@/utils/template-renderer';

class EmailNotificationService {
  /**
   * Send an email notification
   * In a real implementation, this would call a Supabase Edge Function that would use a service like SendGrid or other email provider
   */
  async sendEmailNotification(notification: EmailNotification): Promise<boolean> {
    try {
      // Get the email template
      const template = await this.getEmailTemplate(notification.type);
      
      // Render the template with notification data
      const renderedContent = await renderTemplate(template, {
        notification,
        user: notification.user,
        campaign: notification.campaign,
        action: notification.action
      });
      
      // Call Supabase Edge Function to send email
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: notification.user.email,
          subject: notification.title,
          html: renderedContent,
          notificationId: notification.id
        }
      });
      
      if (error) throw error;
      
      // Update email notification status
      const { error: updateError } = await supabase
        .from('email_notifications')
        .update({ 
          delivery_status: 'sent',
          sent_at: new Date().toISOString()
        })
        .eq('id', notification.id);
      
      if (updateError) throw updateError;
      
      return true;
    } catch (error) {
      console.error('Error sending email notification:', error);
      return false;
    }
  }

  private async getEmailTemplate(type: string): Promise<string> {
    // In a real implementation, this would fetch from a database or file system
    const templates = {
      'campaign_status': `
        <h1>Campaign Status Update</h1>
        <p>Hi {{ user.firstName }},</p>
        <p>{{ notification.message }}</p>
        <p>Your campaign "{{ campaign.name }}" has been {{ campaign.status }}.</p>
        <a href="{{ action.url }}">{{ action.text }}</a>
      `,
      // Add other templates as needed
    };
    
    return templates[type] || templates['default'];
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
