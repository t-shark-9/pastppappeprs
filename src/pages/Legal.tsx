import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { Shield, FileText, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Legal() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Privacy Policy",
      description: "How we handle your data",
      icon: Shield,
      path: "/homepage/legal/privacy",
    },
    {
      title: "Terms of Service",
      description: "Terms and conditions of use",
      icon: FileText,
      path: "/homepage/legal/terms",
    },
    {
      title: "Imprint",
      description: "Legal information and contact",
      icon: Building,
      path: "/homepage/legal/imprint",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <BackButton fallbackPath="/homepage" />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Legal Information
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our policies and legal information
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Card
                  key={section.path}
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                  onClick={() => navigate(section.path)}
                >
                  <CardHeader>
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{section.title}</CardTitle>
                        <CardDescription className="mt-2">{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
