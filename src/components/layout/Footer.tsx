
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-brand-purple p-1">
                <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
                  <span className="text-brand-purple font-bold text-sm">IA</span>
                </div>
              </div>
              <span className="font-bold text-xl">
                Influencer <span className="text-brand-purple">Adsense</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting brands with influencers for impactful promotional campaigns
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-brand-purple">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-purple">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-purple">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">For Brands</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-brand-purple">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-brand-purple">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-muted-foreground hover:text-brand-purple">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/create-campaign" className="text-muted-foreground hover:text-brand-purple">
                  Create Campaign
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">For Influencers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-brand-purple">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="text-muted-foreground hover:text-brand-purple">
                  Find Campaigns
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-brand-purple">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-muted-foreground hover:text-brand-purple">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-brand-purple">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-brand-purple">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-brand-purple">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-brand-purple">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} Influencer Adsense. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
