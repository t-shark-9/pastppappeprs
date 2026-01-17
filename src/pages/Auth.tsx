import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useGhostSession, GhostUserType } from "@/contexts/GhostSessionContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { GraduationCap, Loader2, Users, Briefcase, BookOpen, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { groupedPrograms } from "@/data/educationPrograms";

// Helper to check if a role is "private" (no education selection needed)
const isPrivateRole = (r: string) => r === 'private' || r === 'private_user';

export default function Auth() {
  const { signUp, signIn, user, loading } = useAuth();
  const { setGhostUserType, ghostUserType } = useGhostSession();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  
  // Flow States
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(false); // Guest Flow
  const [showSignupRoleSelector, setShowSignupRoleSelector] = useState(false); // Signup Role Flow
  const [showProgramSelector, setShowProgramSelector] = useState(false); // Shared Program Selection
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'guest'>('signin'); // Track current flow

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/work");
    }
  }, [user, loading, navigate]);

  // Sign up form state
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("student"); // Used for Sign Up
  const [selectedProgram, setSelectedProgram] = useState(""); // Used for both

  // Initialize role from ghost session if available
  useEffect(() => {
    const ghostRole = localStorage.getItem("tooessay_ghost_user_type");
    if (ghostRole) {
      setRole(ghostRole);
    }
  }, []);

  // Sign in form state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Guest State
  const [guestRole, setGuestRole] = useState<GhostUserType>('student');

  const validateEmail = (email: string): boolean => {
    // Check basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    const domain = email.split('@')[1].toLowerCase();
    
    // List of known legitimate email providers
    const knownProviders = [
      'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com', 'live.com',
      'yahoo.com', 'icloud.com', 'me.com', 'mac.com', 'protonmail.com',
      'aol.com', 'mail.com', 'zoho.com', 'yandex.com', 'gmx.com'
    ];

    // Check if it's a known provider
    if (knownProviders.includes(domain)) {
      return true;
    }

    // Otherwise, check if domain has a valid TLD
    const validTLDs = [
      '.com', '.net', '.org', '.edu', '.gov', '.mil', '.int',
      '.se', '.uk', '.de', '.fr', '.it', '.es', '.nl', '.be', '.ch', '.at',
      '.ca', '.au', '.nz', '.jp', '.cn', '.in', '.br', '.mx', '.ru',
      '.io', '.co', '.app', '.dev', '.tech', '.online', '.site', '.store'
    ];

    return validTLDs.some(tld => domain.endsWith(tld));
  };

  // Step 1: Handle Initial Sign Up Form
  const handleSignUpStart = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(signUpEmail)) {
      toast.error("Please use a valid email address from a recognized provider or domain");
      return;
    }

    // Move to role selection step
    setShowSignupRoleSelector(true);
  };

  // Handle role selection from post-signup-init screen
  const handleSignupRoleSelect = async (selectedRole: string) => {
    setRole(selectedRole);
    // Proceed to actual signup
    // We pass the role explicitly to ensure we use the selected one
    await performSignUp(selectedRole);
  };

  // Finsh Sign Up
  const performSignUp = async (explicitRole?: string) => {
    setIsLoading(true);
    
    // Check for ghost data to migrate/use (program/education type only)
    const ghostProgram = localStorage.getItem("tooessay_school_program");
    const ghostEducationType = localStorage.getItem("tooessay_education_type");

    // Use explicit role if provided, otherwise fallback to state/ghost
    // This allows the role selector to override any previous state
    const roleToUse = explicitRole || role;

    // We use the 'role' state which is initialized from ghost data but can be changed by user
    // However, we preserve the program/education type from ghost session if the roles match 
    // or if the new role supports it.
    
    // If user explicitly chose private, clear program
    const finalProgram = (roleToUse === 'private') ? '' : (ghostProgram || '');
    const finalEducationType = (roleToUse === 'private') ? '' : (ghostEducationType || '');
    
    const { error } = await signUp(signUpEmail, signUpPassword, fullName, roleToUse, '', finalProgram, finalEducationType);
    setIsLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created successfully!");
    }
  };

  // Step 1: Guest User Role Selection
  const handleGuestRoleSelect = (type: GhostUserType) => {
    setGuestRole(type);
    
    if (type === 'private') {
      // Private guests go straight to work
      setGhostUserType('private');
      // Clear program for private users
      localStorage.removeItem("tooessay_school_program"); 
      navigate("/work");
    } else {
      // Students/Teachers go to program selection
      setAuthMode('guest');
      setShowUserTypeSelector(false);
      setShowProgramSelector(true);
    }
  };

  // Finish Guest Setup
  const finishGuestSetup = () => {
    if (!selectedProgram) {
      toast.error("Please select an education program");
      return;
    }

    setGhostUserType(guestRole);
    // Store program locally for guests
    localStorage.setItem("tooessay_school_program", selectedProgram);
    navigate("/work");
  };


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(signInEmail, signInPassword);
    setIsLoading(false);

    if (error) {
      toast.error(error.message);
    }
  };


  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(forgotPasswordEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setForgotPasswordLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-password-reset', {
        body: {
          email: forgotPasswordEmail.trim(),
          redirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) {
        console.error("Error sending reset email:", error);
        toast.error("Failed to send reset email. Please try again.");
      } else {
        toast.success("If an account exists with this email, you'll receive a password reset link.");
        setShowForgotPassword(false);
        setForgotPasswordEmail("");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/20 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">TooEssay</h1>
          </div>

          <Card className="shadow-strong border-border/50">
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>Enter your email to receive a password reset link</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="you@example.com"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full" disabled={forgotPasswordLoading}>
                  {forgotPasswordLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
                <BackButton
                  fallbackPath="#"
                  variant="ghost"
                  label="Back to Sign In"
                  className="w-full"
                  onClick={() => setShowForgotPassword(false)}
                />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Program Selector Screen (Shared by Sign Up and Guest)
  if (showProgramSelector) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/20 p-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Select Your Education Program</h1>
            <p className="text-muted-foreground mt-2">
              We'll customize your experience based on your curriculum
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label>Education Program</Label>
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your program..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {Object.entries(groupedPrograms).map(([region, programs]) => (
                      <SelectGroup key={region}>
                        <SelectLabel>{region}</SelectLabel>
                        {programs.map((program) => (
                          <SelectItem key={program.value} value={program.value}>
                            {program.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground">
                <p>
                  <strong>Why do we ask?</strong>
                  <br />
                  Different programs have different grading criteria, requirements, and structures. 
                  Selecting the correct one ensures AI coaching is accurate for you.
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full h-12 text-base" 
                  onClick={authMode === 'guest' ? finishGuestSetup : () => performSignUp()}
                  disabled={!selectedProgram || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => {
                    setShowProgramSelector(false);
                    if (authMode === 'guest') setShowUserTypeSelector(true);
                  }}
                  disabled={isLoading}
                >
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // User type selector for guest/try without account
  if (showSignupRoleSelector) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/20 p-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">How will you use TooEssay?</h1>
            <p className="text-muted-foreground mt-2">Select your role to personalize your experience</p>
          </div>

          <div className="grid gap-4">
            <Card 
              className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
              onClick={() => handleSignupRoleSelect('student')}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <GraduationCap className="h-8 w-8 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Student</h3>
                  <p className="text-sm text-muted-foreground">
                    Access study tools, assignments, flashcards, and exam prep for school or university
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
              onClick={() => handleSignupRoleSelect('teacher')}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <Users className="h-8 w-8 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Teacher / Educator</h3>
                  <p className="text-sm text-muted-foreground">
                    Create assignments, grade student work, and access teaching resources
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
              onClick={() => handleSignupRoleSelect('private')}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Briefcase className="h-8 w-8 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Private User</h3>
                  <p className="text-sm text-muted-foreground">
                    Write documents and notes without school templates or grading
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center">
             <Button 
              disabled={isLoading}
              variant="ghost" 
              onClick={() => setShowSignupRoleSelector(false)}
              className="text-muted-foreground"
            >
              {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "← Back"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // User type selector for guest/try without account
  if (showUserTypeSelector) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/20 p-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">How will you use TooEssay?</h1>
            <p className="text-muted-foreground mt-2">Select your role to personalize your experience</p>
          </div>

          <div className="grid gap-4">
            <Card 
              className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
              onClick={() => handleGuestRoleSelect('student')}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <GraduationCap className="h-8 w-8 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Student</h3>
                  <p className="text-sm text-muted-foreground">
                    Access study tools, assignments, flashcards, and exam prep for school or university
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
              onClick={() => handleGuestRoleSelect('teacher')}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <Users className="h-8 w-8 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Teacher / Educator</h3>
                  <p className="text-sm text-muted-foreground">
                    Create assignments, grade student work, and access teaching resources
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
              onClick={() => handleGuestRoleSelect('private')}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Briefcase className="h-8 w-8 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Private User</h3>
                  <p className="text-sm text-muted-foreground">
                    Write documents and notes without school templates or grading
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => setShowUserTypeSelector(false)}
              className="text-muted-foreground"
            >
              ← Back to Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-2xl bg-primary/10">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">TooEssay</h1>
        </div>

        <Card className="shadow-strong border-border/50">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in to continue or create a new account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="signin-password">Password</Label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="signin-password"
                      type="password"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUpStart} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  {/* Role selection moved to next step */}
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 pt-6 border-t">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowUserTypeSelector(true)}
              >
                Try without an account →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
