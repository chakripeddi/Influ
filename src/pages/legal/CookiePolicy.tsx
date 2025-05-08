import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie, Shield, Settings, BarChart, Users, AlertTriangle, Clock, Mail } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground text-lg">
              Learn about how we use cookies to enhance your browsing experience.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Cookie className="h-6 w-6 text-brand-purple" />
                What Are Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                Cookies are small text files that are placed on your computer or mobile device when you visit
                our website. They are widely used to make websites work more efficiently and provide useful
                information to website owners.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-6 w-6 text-brand-purple" />
                Types of Cookies We Use
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">We use the following types of cookies:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  <strong>Essential Cookies:</strong> Required for the website to function properly
                </li>
                <li className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-brand-purple" />
                  <strong>Performance Cookies:</strong> Help us understand how visitors interact with our website
                </li>
                <li className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-brand-purple" />
                  <strong>Functionality Cookies:</strong> Remember your preferences and settings
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-purple" />
                  <strong>Targeting Cookies:</strong> Used to deliver relevant advertisements
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Settings className="h-6 w-6 text-brand-purple" />
                How We Use Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">We use cookies to:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Keep you signed in
                </li>
                <li className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-brand-purple" />
                  Remember your preferences
                </li>
                <li className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-brand-purple" />
                  Understand how you use our website
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Improve our services
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-purple" />
                  Provide personalized content
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="h-6 w-6 text-brand-purple" />
                Third-Party Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                Some cookies are placed by third-party services that appear on our pages. We use these
                services to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-brand-purple" />
                  Analyze website usage
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-purple" />
                  Provide social media features
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-brand-purple" />
                  Deliver targeted advertisements
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Settings className="h-6 w-6 text-brand-purple" />
                Managing Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                You can control and/or delete cookies as you wish. You can delete all cookies that are
                already on your computer and you can set most browsers to prevent them from being placed.
                However, if you do this, you may have to manually adjust some preferences every time you
                visit our website.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Clock className="h-6 w-6 text-brand-purple" />
                Changes to This Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time. We will notify you of any changes by
                posting the new Cookie Policy on this page.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Mail className="h-6 w-6 text-brand-purple" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                If you have any questions about our Cookie Policy, please contact us at:
                <a href="mailto:privacy@influenceradsense.com" className="text-brand-purple hover:underline ml-2">
                  privacy@influenceradsense.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CookiePolicy; 