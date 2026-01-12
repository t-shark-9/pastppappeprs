import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Imprint() {
  const navigate = useNavigate();

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
            <CardTitle className="text-3xl">Imprint / Legal Notice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Information according to § 5 TMG</h2>
              <div className="space-y-1 text-sm">
                <p><strong>IBDP Guide</strong></p>
                <p>[Your Company Name]</p>
                <p>[Street Address]</p>
                <p>[Postal Code, City]</p>
                <p>[Country]</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Contact</h2>
              <div className="space-y-1 text-sm">
                <p>Email: <a href="mailto:contact@ibdpguide.com" className="text-primary hover:underline">contact@ibdpguide.com</a></p>
                <p>Phone: [Your Phone Number]</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Responsible for Content</h2>
              <div className="space-y-1 text-sm">
                <p>[Name of Responsible Person]</p>
                <p>[Address]</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Liability for Content</h2>
              <p className="text-sm text-muted-foreground">
                As a service provider, we are responsible for our own content on these pages in accordance with general legislation. 
                However, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances 
                that indicate illegal activity. Obligations to remove or block the use of information in accordance with general 
                legislation remain unaffected.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Liability for Links</h2>
              <p className="text-sm text-muted-foreground">
                Our website contains links to external third-party websites over whose content we have no influence. Therefore, 
                we cannot assume any liability for this third-party content. The respective provider or operator of the pages is 
                always responsible for the content of the linked pages.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Copyright</h2>
              <p className="text-sm text-muted-foreground">
                The content and works created by the site operators on these pages are subject to copyright law. The reproduction, 
                editing, distribution and any kind of use outside the limits of copyright law require the written consent of the 
                respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Data Protection</h2>
              <p className="text-sm text-muted-foreground">
                For more information about how we handle your personal data, please refer to our{" "}
                <button onClick={() => navigate('/homepage/privacy')} className="text-primary hover:underline">
                  Privacy Policy
                </button>.
              </p>
            </div>

            <div className="pt-6 border-t">
              <p className="text-xs text-muted-foreground">
                Last updated: December 13, 2025
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
