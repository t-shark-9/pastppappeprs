import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-4xl mx-auto px-6 py-12">
        <BackButton
          fallbackPath="/"
          variant="ghost"
          className="mb-6"
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Contact Us</CardTitle>
            <CardDescription>
              Get in touch with us. We're here to help!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Contact Information */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:support@ibdpguide.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      support@ibdpguide.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5" />
                  <div>
                    <h3 className="font-semibold mb-1">Support</h3>
                    <p className="text-muted-foreground text-sm">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:+1234567890"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground text-sm">
                      123 Education Street<br />
                      Innovation District<br />
                      City, State 12345
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Send us a message</h3>
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  // Handle form submission
                  alert("Thank you for your message! We'll get back to you soon.");
                }}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="pt-8 border-t">
              <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">What is IBDP Guide?</h4>
                  <p className="text-sm text-muted-foreground">
                    IBDP Guide is a comprehensive platform designed to help International Baccalaureate 
                    Diploma Programme students with their academic writing, research, and study needs.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">How do I get started?</h4>
                  <p className="text-sm text-muted-foreground">
                    Simply create an account and start by planning your first assignment. Our guided 
                    workflow will walk you through planning, outlining, drafting, and reviewing your work.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Is my data secure?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! We use industry-standard encryption and security measures to protect your data. 
                    Read our Privacy Policy for more details.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Can I collaborate with others?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! Our platform supports real-time collaboration, allowing you to work together 
                    with peers and receive feedback from teachers.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links (Optional) */}
            <div className="pt-8 border-t text-center">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://twitter.com/ibdpguide" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://facebook.com/ibdpguide" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://instagram.com/ibdpguide" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
