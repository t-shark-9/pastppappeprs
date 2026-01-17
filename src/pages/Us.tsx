import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { Users, Target, Mail, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Us() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "About",
      description: "Learn about our mission and vision",
      icon: Users,
      path: "/homepage/us/about",
    },
    {
      title: "Plan",
      description: "Our roadmap and future plans",
      icon: Target,
      path: "/homepage/us/plan",
    },
    {
      title: "Contact",
      description: "Get in touch with us",
      icon: Mail,
      path: "/homepage/us/contact",
    },
    {
      title: "Improvements",
      description: "Suggest features and improvements",
      icon: TrendingUp,
      path: "/homepage/us/improvements",
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
              About Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn more about TooEssay and how we can help you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Card
                  key={section.path}
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                  onClick={() => navigate(section.path)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
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
