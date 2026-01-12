import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {

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
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Last updated: December 13, 2025
              </p>
              <p className="text-sm">
                Please read these Terms of Service ("Terms") carefully before using IBDP Guide.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
              <p className="text-sm text-muted-foreground">
                By accessing or using IBDP Guide, you agree to be bound by these Terms. If you do not agree to these Terms, 
                you may not access or use our service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">2. Use of Service</h2>
              <p className="text-sm text-muted-foreground mb-2">
                You agree to use IBDP Guide only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Use the service in any way that violates any applicable law or regulation</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use of the service</li>
                <li>Attempt to gain unauthorized access to any part of the service</li>
                <li>Use the service to transmit any viruses or malicious code</li>
                <li>Impersonate or attempt to impersonate another user or person</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">3. User Accounts</h2>
              <p className="text-sm text-muted-foreground">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities 
                that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">4. Academic Integrity</h2>
              <p className="text-sm text-muted-foreground">
                IBDP Guide is designed to assist with your learning and organization. You are responsible for ensuring 
                that your use of the service complies with your school's academic integrity policies. We do not condone 
                plagiarism or academic dishonesty.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">5. Content Ownership</h2>
              <p className="text-sm text-muted-foreground">
                You retain all rights to the content you create using IBDP Guide. By using our service, you grant us 
                a license to store, process, and display your content solely for the purpose of providing the service to you.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">6. AI-Generated Content</h2>
              <p className="text-sm text-muted-foreground">
                Our service may use AI to assist with outlining, planning, and suggestions. AI-generated content should 
                be reviewed and verified by you. We do not guarantee the accuracy or appropriateness of AI-generated content.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">7. Prohibited Content</h2>
              <p className="text-sm text-muted-foreground mb-2">
                You may not upload or share content that:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Infringes on intellectual property rights</li>
                <li>Contains hate speech, harassment, or threats</li>
                <li>Is illegal, fraudulent, or misleading</li>
                <li>Contains viruses or malicious code</li>
                <li>Violates the privacy of others</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">8. Service Availability</h2>
              <p className="text-sm text-muted-foreground">
                We strive to keep IBDP Guide available at all times, but we do not guarantee uninterrupted access. 
                We reserve the right to modify, suspend, or discontinue the service at any time without notice.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">9. Limitation of Liability</h2>
              <p className="text-sm text-muted-foreground">
                To the maximum extent permitted by law, IBDP Guide shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, including loss of data or profits, arising from your use 
                of the service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">10. Termination</h2>
              <p className="text-sm text-muted-foreground">
                We may terminate or suspend your account and access to the service immediately, without prior notice, 
                if you breach these Terms or engage in conduct that we deem inappropriate.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">11. Changes to Terms</h2>
              <p className="text-sm text-muted-foreground">
                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting 
                the new Terms on this page and updating the "Last updated" date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">12. Governing Law</h2>
              <p className="text-sm text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
                without regard to its conflict of law provisions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">13. Contact Information</h2>
              <p className="text-sm text-muted-foreground">
                If you have any questions about these Terms, please contact us at{" "}
                <a href="mailto:legal@ibdpguide.com" className="text-primary hover:underline">
                  legal@ibdpguide.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
