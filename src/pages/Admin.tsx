import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Mail, Plus, X, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { BlogManagement } from "@/components/admin/BlogManagement";

interface User {
  id: string;
  email: string;
  full_name: string | null;
  school_name: string | null;
  roles: string[];
  created_at: string;
  last_sign_in: string | null;
}

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [users, setUsers] = useState<User[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Newsletter state
  const [showNewsletterDialog, setShowNewsletterDialog] = useState(false);
  const [newsletterSubject, setNewsletterSubject] = useState("");
  const [newsletterHeading, setNewsletterHeading] = useState("");
  const [newsletterContent, setNewsletterContent] = useState("");
  const [newsletterFeatures, setNewsletterFeatures] = useState<string[]>([""]);
  const [newsletterCtaText, setNewsletterCtaText] = useState("Try It Now");
  const [newsletterCtaUrl, setNewsletterCtaUrl] = useState("");
  const [sendingNewsletter, setSendingNewsletter] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      // Check if user has admin email
      const ADMIN_EMAIL = 'mail@tjark-osterloh.de';
      if (user.email === ADMIN_EMAIL) {
        setIsAdmin(true);
        fetchUsers();
      } else {
        toast.error("Unauthorized: Admin access denied");
        navigate("/work");
      }
    }
  }, [user, loading, navigate]);

  const fetchUsers = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("No session");
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ action: "list" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const result = await response.json();
      setUsers(result.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteUserId) return;

    setDeleting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("No session");
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ action: "delete", userId: deleteUserId }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete user");
      }

      toast.success("User deleted successfully");
      setUsers(users.filter((u) => u.id !== deleteUserId));
      setDeleteUserId(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  const addFeatureField = () => {
    setNewsletterFeatures([...newsletterFeatures, ""]);
  };

  const removeFeatureField = (index: number) => {
    setNewsletterFeatures(newsletterFeatures.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, value: string) => {
    const updated = [...newsletterFeatures];
    updated[index] = value;
    setNewsletterFeatures(updated);
  };

  const resetNewsletterForm = () => {
    setNewsletterSubject("");
    setNewsletterHeading("");
    setNewsletterContent("");
    setNewsletterFeatures([""]);
    setNewsletterCtaText("Try It Now");
    setNewsletterCtaUrl("");
  };

  const handleSendNewsletter = async () => {
    if (!newsletterSubject.trim() || !newsletterHeading.trim() || !newsletterContent.trim()) {
      toast.error("Please fill in subject, heading, and content");
      return;
    }

    setSendingNewsletter(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("No session");
      }

      const features = newsletterFeatures.filter(f => f.trim());

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-newsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            subject: newsletterSubject.trim(),
            heading: newsletterHeading.trim(),
            content: newsletterContent.trim(),
            features,
            ctaText: newsletterCtaText.trim(),
            ctaUrl: newsletterCtaUrl.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send newsletter");
      }

      toast.success(`Newsletter sent to ${result.sent} users!`);
      if (result.failed > 0) {
        toast.warning(`${result.failed} emails failed to send`);
      }
      
      setShowNewsletterDialog(false);
      resetNewsletterForm();
    } catch (error) {
      console.error("Error sending newsletter:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send newsletter");
    } finally {
      setSendingNewsletter(false);
    }
  };

  if (loading || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton
            fallbackPath="/dashboard"
            size="icon"
            tooltip="Back to Dashboard"
          />
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage users and communications</p>
          </div>
        </div>
        <Button onClick={() => setShowNewsletterDialog(true)}>
          <Mail className="h-4 w-4 mr-2" />
          Send Newsletter
        </Button>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          {loadingUsers ? (
            <div className="text-center py-8 text-muted-foreground">Loading users...</div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Sign In</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.email}</TableCell>
                      <TableCell>{u.full_name || "-"}</TableCell>
                      <TableCell>{u.school_name || "-"}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {u.roles.map((role) => (
                            <Badge key={role} variant="secondary">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(u.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {u.last_sign_in
                          ? new Date(u.last_sign_in).toLocaleDateString()
                          : "Never"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteUserId(u.id)}
                          disabled={u.id === user?.id}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="blogs">
          <BlogManagement />
        </TabsContent>

        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <CardTitle>Email Communications</CardTitle>
              <CardDescription>Send newsletters and announcements to all users</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowNewsletterDialog(true)}>
                <Mail className="h-4 w-4 mr-2" />
                Compose Newsletter
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete User Dialog */}
      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user account? This action cannot be
              undone. All user data, assignments, and drafts will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Newsletter Compose Dialog */}
      <Dialog open={showNewsletterDialog} onOpenChange={setShowNewsletterDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Compose Newsletter</DialogTitle>
            <DialogDescription>
              Send an email to all {users.length} registered users about new features
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Email Subject</Label>
              <Input
                id="subject"
                placeholder="New Features in TooEssay!"
                value={newsletterSubject}
                onChange={(e) => setNewsletterSubject(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heading">Email Heading</Label>
              <Input
                id="heading"
                placeholder="Exciting New Features Just Launched!"
                value={newsletterHeading}
                onChange={(e) => setNewsletterHeading(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Main Content</Label>
              <Textarea
                id="content"
                placeholder="We're excited to announce some amazing new features that will help you write better essays..."
                value={newsletterContent}
                onChange={(e) => setNewsletterContent(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Feature List (optional)</Label>
                <Button type="button" variant="outline" size="sm" onClick={addFeatureField}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {newsletterFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Feature ${index + 1}...`}
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                    />
                    {newsletterFeatures.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeatureField(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ctaText">Button Text</Label>
                <Input
                  id="ctaText"
                  placeholder="Try It Now"
                  value={newsletterCtaText}
                  onChange={(e) => setNewsletterCtaText(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaUrl">Button URL</Label>
                <Input
                  id="ctaUrl"
                  placeholder="https://tooessay.com/dashboard"
                  value={newsletterCtaUrl}
                  onChange={(e) => setNewsletterCtaUrl(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewsletterDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendNewsletter} disabled={sendingNewsletter}>
              {sendingNewsletter ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send to {users.length} Users
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
