import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Users, FileText, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-6 w-6 text-brand-purple" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                We collect information that you provide directly to us, including when you create an account,
                participate in campaigns, or communicate with us. This may include:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-purple" />
                  Name and contact information
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-brand-purple" />
                  Account credentials
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  Profile information
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  Campaign participation data
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-brand-purple" />
                  Payment information
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="h-6 w-6 text-brand-purple" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">We use the information we collect to:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Provide and maintain our services
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  Process transactions
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand-purple" />
                  Send you technical notices and support messages
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-purple" />
                  Communicate with you about products, services, and events
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Monitor and analyze trends and usage
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="h-6 w-6 text-brand-purple" />
                Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">We may share your information with:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Service providers who assist in our operations
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-purple" />
                  Business partners with your consent
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-brand-purple" />
                  Legal authorities when required by law
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-6 w-6 text-brand-purple" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">You have the right to:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  Access your personal information
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Correct inaccurate data
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-brand-purple" />
                  Request deletion of your data
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Object to processing of your data
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  Data portability
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Lock className="h-6 w-6 text-brand-purple" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction.
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
                If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy; 