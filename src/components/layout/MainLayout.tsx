import React from 'react';
import MainNavigation from './MainNavigation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">
            Influencer Adsense
          </Link>
          
          <MainNavigation />
          
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Influencer Adsense</h3>
              <p className="text-muted-foreground">
                Connecting brands with the perfect influencers through AI-powered matching.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/campaigns" className="text-muted-foreground hover:text-primary">
                    Campaigns
                  </Link>
                </li>
                <li>
                  <Link to="/influencers" className="text-muted-foreground hover:text-primary">
                    Influencers
                  </Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="text-muted-foreground hover:text-primary">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/blog" className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-muted-foreground hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/referrals" className="text-muted-foreground hover:text-primary">
                    Referral Program
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-muted-foreground hover:text-primary">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/gdpr" className="text-muted-foreground hover:text-primary">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Influencer Adsense. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
