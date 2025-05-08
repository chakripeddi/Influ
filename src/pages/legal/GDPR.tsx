import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText, Users, Lock, Globe, AlertTriangle, Mail, Clock } from 'lucide-react';

const GDPR = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">GDPR Compliance</h1>
            <p className="text-muted-foreground text-lg">
              Learn about your rights and our commitment to protecting your personal data under GDPR.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-6 w-6 text-brand-purple" />
                Your Rights Under GDPR
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                Under the General Data Protection Regulation (GDPR), you have the following rights:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  Right to be informed about data collection and processing
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Right of access to your personal data
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  Right to rectification of inaccurate data
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-brand-purple" />
                  Right to erasure ("right to be forgotten")
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Right to restrict processing
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  Right to data portability
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-purple" />
                  Right to object to processing
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-brand-purple" />
                  Rights related to automated decision making and profiling
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="h-6 w-6 text-brand-purple" />
                Data Controller
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                Influencer Adsense is the data controller for the personal data we collect and process.
                We are responsible for ensuring that your personal data is processed in compliance with
                GDPR requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-6 w-6 text-brand-purple" />
                Legal Basis for Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">We process your personal data on the following legal bases:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-purple" />
                  Your consent
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  Performance of a contract
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Legal obligation
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-brand-purple" />
                  Legitimate interests
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Lock className="h-6 w-6 text-brand-purple" />
                Data Protection Measures
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to ensure a level of security
                appropriate to the risk, including:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-brand-purple" />
                  Encryption of personal data
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Regular security assessments
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-purple" />
                  Access controls and authentication
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  Staff training on data protection
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Globe className="h-6 w-6 text-brand-purple" />
                International Data Transfers
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                When we transfer your personal data outside the European Economic Area (EEA), we ensure
                appropriate safeguards are in place through:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-purple" />
                  Standard contractual clauses
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  Adequacy decisions
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-brand-purple" />
                  Binding corporate rules
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <AlertTriangle className="h-6 w-6 text-brand-purple" />
                Data Breach Notification
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                In the event of a personal data breach, we will notify the relevant supervisory authority
                and affected individuals in accordance with GDPR requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="h-6 w-6 text-brand-purple" />
                Data Protection Officer
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                For any questions regarding our GDPR compliance or to exercise your rights, please contact
                our Data Protection Officer at:
                <a href="mailto:dpo@influenceradsense.com" className="text-brand-purple hover:underline ml-2">
                  dpo@influenceradsense.com
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Clock className="h-6 w-6 text-brand-purple" />
                Changes to This Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-purple max-w-none">
              <p className="text-muted-foreground">
                We may update this GDPR policy from time to time. We will notify you of any changes by
                posting the new policy on this page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default GDPR; 