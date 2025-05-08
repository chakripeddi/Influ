import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, Users, CreditCard, AlertTriangle, Mail, Scale, Clock } from 'lucide-react';

const TermsOfService = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground text-lg">
              Please read these terms carefully before using our platform.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="h-6 w-6 text-brand-purple" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                By accessing and using Influencer Adsense, you agree to be bound by these Terms of Service
                and all applicable laws and regulations. If you do not agree with any of these terms, you
                are prohibited from using or accessing this site.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-6 w-6 text-brand-purple" />
                Use License
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                Permission is granted to temporarily access the materials on Influencer Adsense for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="h-6 w-6 text-brand-purple" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">As a user of our platform, you agree to:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  Provide accurate and complete information
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Maintain the security of your account
                </li>
                <li className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-brand-purple" />
                  Comply with all applicable laws and regulations
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-brand-purple" />
                  Not engage in any fraudulent or deceptive practices
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Respect the intellectual property rights of others
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="h-6 w-6 text-brand-purple" />
                Campaign Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">When participating in campaigns, you must:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  Follow the campaign requirements and guidelines
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Submit authentic and original content
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-purple" />
                  Meet all deadlines and deliverables
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-purple" />
                  Maintain professional conduct
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <CreditCard className="h-6 w-6 text-brand-purple" />
                Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">Payment processing and terms will be as follows:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-purple" />
                  Payments will be processed according to the agreed schedule
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-brand-purple" />
                  All fees are non-refundable unless otherwise specified
                </li>
                <li className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-brand-purple" />
                  Taxes and other charges are the responsibility of the user
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <AlertTriangle className="h-6 w-6 text-brand-purple" />
                Termination
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                We reserve the right to terminate or suspend access to our service immediately, without prior
                notice or liability, for any reason whatsoever, including without limitation if you breach
                the Terms.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Clock className="h-6 w-6 text-brand-purple" />
                Changes to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. We will notify users of any material
                changes by posting the new Terms of Service on this page.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Mail className="h-6 w-6 text-brand-purple" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                If you have any questions about these Terms, please contact us at:
                <a href="mailto:legal@influenceradsense.com" className="text-brand-purple hover:underline ml-2">
                  legal@influenceradsense.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsOfService; 