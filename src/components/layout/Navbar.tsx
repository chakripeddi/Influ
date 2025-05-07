
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';
import { Instagram, Youtube, Facebook } from 'lucide-react';
import { NotificationBell } from '@/components/notification/NotificationBell';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Campaigns", href: "/campaigns" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About", href: "/about" },
  ];
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link 
          key={item.label} 
          to={item.href} 
          className="text-foreground/80 hover:text-brand-purple transition-colors"
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full bg-brand-purple p-1">
              <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
                <span className="text-brand-purple font-bold text-sm">IA</span>
              </div>
            </div>
            <span className="font-bold text-xl">
              Influencer <span className="text-brand-purple">Adsense</span>
            </span>
          </Link>
        </div>
        
        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[540px]">
              <nav className="flex flex-col gap-6 text-lg mt-10">
                <NavLinks />
                <div className="flex flex-col gap-2 mt-4">
                  {user ? (
                    <>
                      <Link to="/brand">
                        <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                          Dashboard
                        </Button>
                      </Link>
                      <Button className="w-full" onClick={() => { handleSignOut(); setIsOpen(false); }}>
                        Sign out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                          Log in
                        </Button>
                      </Link>
                      <Link to="/signup">
                        <Button className="w-full" onClick={() => setIsOpen(false)}>
                          Sign up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="hidden md:flex items-center gap-6">
            <NavLinks />
          </nav>
        )}
        
        <div className="hidden md:flex items-center gap-4">
          {user && <NotificationBell />}
          <div className="flex gap-2">
            {user ? (
              <>
                <Link to="/brand">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Button onClick={handleSignOut}>Sign out</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
