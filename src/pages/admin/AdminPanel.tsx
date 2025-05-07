
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { SidebarProvider } from '@/components/ui/sidebar';

// Admin roles with corresponding permissions
export type AdminRole = 'admin' | 'moderator' | 'auditor';

const AdminPanel = () => {
  const { user, loading } = useAuth();
  
  // Check if user has admin access - in a real app, this would validate against admin roles in the database
  // For now, we'll just use a placeholder implementation
  const isAdmin = user && ['admin', 'moderator', 'auditor'].includes('admin'); // Replace with actual role check
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading admin panel...</div>;
  }
  
  // Redirect non-admin users to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <Helmet>
          <title>Admin Panel | Influencer Adsense</title>
        </Helmet>
        
        <div className="flex h-screen overflow-hidden">
          <AdminSidebar />
          
          <div className="flex flex-col flex-1 overflow-x-hidden">
            <AdminHeader />
            
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPanel;
