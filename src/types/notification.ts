
export type NotificationChannel = 'in_app' | 'email' | 'whatsapp';

export type UserRole = 'brand' | 'influencer' | 'campaigner' | 'admin';

export interface NotificationType {
  id: string;
  code: string;
  name: string;
  description: string | null;
  applicable_roles: UserRole[];
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type_id: string;
  title: string;
  message: string;
  data: Record<string, any>;
  is_read: boolean;
  created_at: string;
  read_at: string | null;
  type?: NotificationType; // Joined from notification_types
}

export interface NotificationPreferences {
  id: string;
  user_id: string;
  in_app_enabled: boolean;
  email_enabled: boolean;
  whatsapp_enabled: boolean;
  sound_enabled: boolean;
  vibration_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmailNotification {
  id: string;
  notification_id: string;
  email_to: string;
  subject: string;
  html_content: string;
  sent_at: string;
  delivery_status: 'pending' | 'sent' | 'failed' | 'delivered';
}
