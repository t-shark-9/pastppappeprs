import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";

export default function Privacy() {

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-6 py-12">
        <BackButton
          fallbackPath="/"
          variant="ghost"
          label="Back to Home"
          className="mb-6"
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Last updated: December 13, 2025
              </p>
              <p className="text-sm">
                This Privacy Policy describes how IBDP Guide ("we", "us", or "our") collects, uses, and shares your personal information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
              <p className="text-sm text-muted-foreground mb-2">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Account information (email address, name)</li>
                <li>Assignment content and notes</li>
                <li>Usage data and analytics</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
              <p className="text-sm text-muted-foreground mb-2">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Data Storage and Security</h2>
              <p className="text-sm text-muted-foreground">
                We use industry-standard security measures to protect your personal information. Your data is stored securely 
                using Supabase infrastructure with encryption at rest and in transit. However, no method of transmission over 
                the Internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
              <p className="text-sm text-muted-foreground mb-2">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Cookies and Tracking</h2>
              <p className="text-sm text-muted-foreground">
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Third-Party Services</h2>
              <p className="text-sm text-muted-foreground">
                We use third-party services (Supabase, Google Analytics) that may collect, monitor and analyze data to improve 
                our service. These third parties have their own privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Children's Privacy</h2>
              <p className="text-sm text-muted-foreground">
                Our service is intended for students aged 16 and above. We do not knowingly collect personal information from 
                children under 16 without parental consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Changes to This Policy</h2>
              <p className="text-sm text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
              <p className="text-sm text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@ibdpguide.com" className="text-primary hover:underline">
                  privacy@ibdpguide.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
