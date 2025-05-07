import React from 'react';
import { Bell, Search, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const AdminHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Implement search functionality
    console.log('Search query:', e.target.value);
  };

  const handleProfileClick = () => {
    navigate('/admin/profile');
  };

  const handleSettingsClick = () => {
    navigate('/admin/settings');
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <div className="hidden flex-1 md:block">
        <div className="relative w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search admin..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            onChange={handleSearch}
            aria-label="Search admin panel"
          />
        </div>
      </div>
      
      <div className="flex flex-1 items-center justify-end gap-4 md:justify-end">
        <Button
          variant="outline"
          size="icon"
          className="relative h-8 w-8"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <Badge
            className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[10px]"
            variant="destructive"
          >
            3
          </Badge>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8"
              aria-label="User menu"
            >
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.email || 'Admin User'}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.role || 'Administrator'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;