import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MainNavigationProps {
  className?: string;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ className }) => {
  return (
    <nav className={cn("flex items-center gap-4", className)}>
      <Link to="/">
        <Button variant="ghost">Home</Button>
      </Link>
      <Link to="/about">
        <Button variant="ghost">About</Button>
      </Link>
      <Link to="/campaigns">
        <Button variant="ghost">Campaigns</Button>
      </Link>
      <Link to="/influencers">
        <Button variant="ghost">Influencers</Button>
      </Link>
    </nav>
  );
};

export default MainNavigation; 