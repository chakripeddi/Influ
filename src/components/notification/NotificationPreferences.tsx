
import React from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function NotificationPreferences() {
  const { preferences, updatePreferences } = useNotifications();

  if (!preferences) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Loading your notification preferences...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const handleToggle = (field: string) => (checked: boolean) => {
    updatePreferences({ [field]: checked } as any);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Customize how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Notification Channels</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="in_app" className="font-medium">In-App Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications within the application</p>
              </div>
              <Switch 
                id="in_app" 
                checked={preferences.in_app_enabled} 
                onCheckedChange={handleToggle('in_app_enabled')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email" className="font-medium">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive important updates via email</p>
              </div>
              <Switch 
                id="email" 
                checked={preferences.email_enabled} 
                onCheckedChange={handleToggle('email_enabled')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="whatsapp" className="font-medium">WhatsApp Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via WhatsApp</p>
              </div>
              <Switch 
                id="whatsapp" 
                checked={preferences.whatsapp_enabled} 
                onCheckedChange={handleToggle('whatsapp_enabled')} 
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Alerts Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sound" className="font-medium">Sound Alerts</Label>
                <p className="text-sm text-muted-foreground">Play a sound when you receive a new notification</p>
              </div>
              <Switch 
                id="sound" 
                checked={preferences.sound_enabled} 
                onCheckedChange={handleToggle('sound_enabled')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="vibration" className="font-medium">Vibration</Label>
                <p className="text-sm text-muted-foreground">Vibrate when you receive a new notification (mobile only)</p>
              </div>
              <Switch 
                id="vibration" 
                checked={preferences.vibration_enabled} 
                onCheckedChange={handleToggle('vibration_enabled')} 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
