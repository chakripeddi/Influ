import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import { NotificationPreferences } from '@/components/notification/NotificationPreferences';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Separator } from '@/components/ui/separator';
import { Form, Switch, Button, Input } from 'antd';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const NotificationSettings = () => {
  const { user } = useAuth();
  const [form] = Form.useForm(); // Changed from useForm() to Form.useForm()
  const { toast } = useToast();


  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.user_metadata?.first_name,
        lastName: user.user_metadata?.last_name,
        email: user.email,
        phone: user.user_metadata?.phone,
        bio: user.user_metadata?.bio
      });
    }
  }, [user, form]);
  
  const handleSubmit = async (values: any) => {
    try {
      const tableName = user.user_metadata?.role === 'brand' ? 'brand_profiles' : 'influencer_profiles';
      const { error } = await supabase
        .from(tableName)
        .update({
          first_name: values.firstName,
          last_name: values.lastName,
          phone: values.phone,
          bio: values.bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: 'email' }]}
      >
        <Input disabled />
      </Form.Item>
      
      <Form.Item
        name="phone"
        label="Phone"
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        name="bio"
        label="Bio"
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      
      <Button type="primary" htmlType="submit">
        Save Changes
      </Button>
    </Form>
  );
};

const SecuritySettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const handlePasswordChange = async (values: { currentPassword: string; newPassword: string }) => {
    setIsChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: values.newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    } catch (error) {
      console.error('Error changing password:', error);
      toast({
        title: "Update failed",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  const handleTwoFactorToggle = async (enabled: boolean) => {
    try {
      // Implement 2FA toggle logic here
      toast({
        title: "2FA " + (enabled ? "enabled" : "disabled"),
        description: "Two-factor authentication has been " + (enabled ? "enabled" : "disabled") + ".",
      });
    } catch (error) {
      console.error('Error toggling 2FA:', error);
      toast({
        title: "Update failed",
        description: "Failed to update 2FA settings. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Change Password</h3>
        <Form onFinish={handlePasswordChange}>
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
          >
            <Input.Password />
          </Form.Item>
          
          <Button 
            type="primary" 
            htmlType="submit"
            loading={isChangingPassword}
          >
            Change Password
          </Button>
        </Form>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
        <Switch
          onChange={handleTwoFactorToggle}
          checkedChildren="Enabled"
          unCheckedChildren="Disabled"
        />
      </div>
    </div>
  );
};

export default NotificationSettings;
