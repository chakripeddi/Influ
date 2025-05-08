import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  LineChart, 
  Shield, 
  DollarSign, 
  Share2, 
  BarChart4, 
  Settings, 
  Bell, 
  Zap 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';

const AdminSidebar = () => {
  const { user } = useAuth();
  
  const menuItems = [
    { 
      title: "Dashboard", 
      icon: <BarChart4 className="h-5 w-5" />, 
      href: "/admin", 
      role: ['admin', 'moderator', 'auditor']
    },
    { 
      title: "Users", 
      icon: <Users className="h-5 w-5" />, 
      href: "/admin/users", 
      role: ['admin', 'moderator'] 
    },
    { 
      title: "Campaigns", 
      icon: <LineChart className="h-5 w-5" />, 
      href: "/admin/campaigns", 
      role: ['admin', 'moderator'] 
    },
    { 
      title: "Wallet", 
      icon: <DollarSign className="h-5 w-5" />, 
      href: "/admin/wallet", 
      role: ['admin', 'auditor'] 
    },
    { 
      title: "Referrals", 
      icon: <Share2 className="h-5 w-5" />, 
      href: "/admin/referrals", 
      role: ['admin', 'moderator', 'auditor'] 
    },
    { 
      title: "Analytics", 
      icon: <BarChart4 className="h-5 w-5" />, 
      href: "/admin/analytics", 
      role: ['admin', 'auditor'] 
    },
    { 
      title: "Moderation", 
      icon: <Shield className="h-5 w-5" />, 
      href: "/admin/moderation", 
      role: ['admin', 'moderator'] 
    },
    { 
      title: "AI Alerts", 
      icon: <Zap className="h-5 w-5" />, 
      href: "/admin/ai-alerts", 
      role: ['admin'] 
    },
    { 
      title: "Notifications", 
      icon: <Bell className="h-5 w-5" />, 
      href: "/admin/notifications", 
      role: ['admin', 'moderator'] 
    },
    { 
      title: "Settings", 
      icon: <Settings className="h-5 w-5" />, 
      href: "/admin/settings", 
      role: ['admin'] 
    }
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => 
    item.role.includes(user?.role || '')
  );

  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-3 py-4">
          <div className="flex items-center mb-6 px-2">
            <div className="rounded-full bg-brand-purple p-1 mr-2">
              <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
                <span className="text-brand-purple font-bold text-sm">IA</span>
              </div>
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
          
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.href}
                        end={item.href === "/admin"}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                            isActive 
                              ? "bg-accent text-accent-foreground" 
                              : "transparent hover:bg-accent hover:text-accent-foreground"
                          )
                        }
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
