import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Monitor, Apple, CheckCircle2, Wifi, WifiOff, HardDrive } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/back-button";
import { toast } from "sonner";

export default function DownloadPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <WifiOff className="h-5 w-5" />,
      title: "Work Offline",
      description: "Write your essays even without an internet connection"
    },
    {
      icon: <Wifi className="h-5 w-5" />,
      title: "Auto-Sync",
      description: "Your work syncs automatically when you're back online"
    },
    {
      icon: <HardDrive className="h-5 w-5" />,
      title: "Local Storage",
      description: "Your data is saved securely on your device"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-12">
        <BackButton />
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Download TooEssay Desktop
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get the full TooEssay experience as a native desktop app. Work offline, sync when online.
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Windows */}
          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-blue-500/10 rounded-full w-fit">
                <Monitor className="h-12 w-12 text-blue-500" />
              </div>
              <CardTitle className="text-2xl">Windows</CardTitle>
              <CardDescription>Windows 10 or later (64-bit)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => {
                  // Start download
                  const link = document.createElement('a');
                  link.href = '/downloads/TooEssay-Setup-1.0.0.exe';
                  link.download = 'TooEssay-Setup-1.0.0.exe';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  toast.success("Download started! Check your downloads folder.");
                }}
              >
                <Download className="mr-2 h-5 w-5" />
                Download for Windows
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                ~320 MB • NSIS Installer
              </p>
            </CardContent>
          </Card>

          {/* macOS */}
          <Card className="shadow-soft hover:shadow-medium transition-all">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-gray-500/10 rounded-full w-fit">
                <Apple className="h-12 w-12 text-gray-700 dark:text-gray-300" />
              </div>
              <CardTitle className="text-2xl">macOS</CardTitle>
              <CardDescription>macOS 10.12 or later (Apple Silicon)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => {
                  // Start download
                  const link = document.createElement('a');
                  link.href = '/downloads/TooEssay-1.0.0-arm64.dmg';
                  link.download = 'TooEssay-1.0.0-arm64.dmg';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  toast.success("Download started! Check your downloads folder.");
                }}
              >
                <Download className="mr-2 h-5 w-5" />
                Download for Mac
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                ~385 MB • DMG Installer
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Desktop App Features</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Installation Instructions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Installation Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Monitor className="h-4 w-4" /> Windows
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-6">
                <li>Download the installer (.exe file)</li>
                <li>Run the installer and follow the prompts</li>
                <li>Choose your installation directory</li>
                <li>Launch TooEssay from your desktop or Start menu</li>
              </ol>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Apple className="h-4 w-4" /> macOS
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-6">
                <li>Download the DMG file</li>
                <li>Open the DMG and drag TooEssay to Applications</li>
                <li>On first launch, right-click and select "Open" to bypass Gatekeeper</li>
                <li>Enjoy TooEssay on your Mac!</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
