
import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import { NotificationPreferences } from '@/components/notification/NotificationPreferences';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Separator } from '@/components/ui/separator';

const NotificationSettings = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <MainLayout>
        <div className="container max-w-3xl py-8">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          <p>Please log in to access your settings</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>Notification Settings</title>
      </Helmet>
      <div className="container max-w-3xl py-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-6">Manage your account settings and preferences</p>
        
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
            <Separator className="mb-6" />
            <p className="text-muted-foreground">Profile settings will be implemented in a future update.</p>
          </TabsContent>
          
          <TabsContent value="notifications">
            <h2 className="text-2xl font-semibold mb-4">Notification Settings</h2>
            <Separator className="mb-6" />
            <NotificationPreferences />
          </TabsContent>
          
          <TabsContent value="security">
            <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
            <Separator className="mb-6" />
            <p className="text-muted-foreground">Security settings will be implemented in a future update.</p>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default NotificationSettings;
