import { r as reactExports, j as jsxRuntimeExports, av as GraduationCap, $ as LoaderCircle } from './vendor-react-BeQHm2Hb.js';
import { u as useAuth, B as Button, s as supabase } from './index-C9tyh6tO.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { I as Input } from './input-2hnN3JAu.js';
import { L as Label } from './label-BfT9c56I.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-BTaNjRSt.js';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs-D8pTTJCu.js';
import { eN as ue } from './vendor-misc-CQ2gQV2M.js';
import { u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
import './vendor-react-dom-b1tP6waW.js';
import './vendor-export-COR0N_gy.js';
import './vendor-blocknote-BAmltmDn.js';
import './vendor-prosemirror-l_ukq4jw.js';
import './vendor-yjs-BarRwqAh.js';
import './vendor-tiptap-tuOT8GNt.js';
import './vendor-mantine-CpjnkULY.js';
import './vendor-utils-B8uxCDj6.js';
import './vendor-radix-BjF_gpzx.js';
import './vendor-i18n-BRT6rIp6.js';
import './vendor-datefns-Cgc6WLhj.js';
import './vendor-syncfusion-B9hbBizT.js';
import './vendor-ketcher-B9jnF8te.js';
import './vendor-supabase-B1aOSilF.js';

function Auth() {
  const { signUp, signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [showForgotPassword, setShowForgotPassword] = reactExports.useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = reactExports.useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!loading && user) {
      navigate("/work");
    }
  }, [user, loading, navigate]);
  const [signUpEmail, setSignUpEmail] = reactExports.useState("");
  const [signUpPassword, setSignUpPassword] = reactExports.useState("");
  const [fullName, setFullName] = reactExports.useState("");
  const [isTeacher, setIsTeacher] = reactExports.useState(false);
  const [signInEmail, setSignInEmail] = reactExports.useState("");
  const [signInPassword, setSignInPassword] = reactExports.useState("");
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }
    const domain = email.split("@")[1].toLowerCase();
    const knownProviders = [
      "gmail.com",
      "googlemail.com",
      "outlook.com",
      "hotmail.com",
      "live.com",
      "yahoo.com",
      "icloud.com",
      "me.com",
      "mac.com",
      "protonmail.com",
      "aol.com",
      "mail.com",
      "zoho.com",
      "yandex.com",
      "gmx.com"
    ];
    if (knownProviders.includes(domain)) {
      return true;
    }
    const validTLDs = [
      ".com",
      ".net",
      ".org",
      ".edu",
      ".gov",
      ".mil",
      ".int",
      ".se",
      ".uk",
      ".de",
      ".fr",
      ".it",
      ".es",
      ".nl",
      ".be",
      ".ch",
      ".at",
      ".ca",
      ".au",
      ".nz",
      ".jp",
      ".cn",
      ".in",
      ".br",
      ".mx",
      ".ru",
      ".io",
      ".co",
      ".app",
      ".dev",
      ".tech",
      ".online",
      ".site",
      ".store"
    ];
    return validTLDs.some((tld) => domain.endsWith(tld));
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateEmail(signUpEmail)) {
      ue.error("Please use a valid email address from a recognized provider or domain");
      return;
    }
    setIsLoading(true);
    const { error } = await signUp(signUpEmail, signUpPassword, fullName, isTeacher ? "teacher" : "student", "", "", "");
    setIsLoading(false);
    if (error) {
      ue.error(error.message);
    } else {
      ue.success("Account created successfully!");
    }
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(signInEmail, signInPassword);
    setIsLoading(false);
    if (error) {
      ue.error(error.message);
    }
  };
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail.trim()) {
      ue.error("Please enter your email address");
      return;
    }
    if (!validateEmail(forgotPasswordEmail)) {
      ue.error("Please enter a valid email address");
      return;
    }
    setForgotPasswordLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-password-reset", {
        body: {
          email: forgotPasswordEmail.trim(),
          redirectTo: `${window.location.origin}/auth`
        }
      });
      if (error) {
        console.error("Error sending reset email:", error);
        ue.error("Failed to send reset email. Please try again.");
      } else {
        ue.success("If an account exists with this email, you'll receive a password reset link.");
        setShowForgotPassword(false);
        setForgotPasswordEmail("");
      }
    } catch (err) {
      console.error("Error:", err);
      ue.error("Failed to send reset email. Please try again.");
    } finally {
      setForgotPasswordLoading(false);
    }
  };
  if (showForgotPassword) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/20 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-2xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-8 w-8 text-primary" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "TooEssay" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-strong border-border/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Forgot Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Enter your email to receive a password reset link" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleForgotPassword, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "forgot-email", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "forgot-email",
                type: "email",
                placeholder: "you@example.com",
                value: forgotPasswordEmail,
                onChange: (e) => setForgotPasswordEmail(e.target.value),
                required: true,
                autoFocus: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: forgotPasswordLoading, children: forgotPasswordLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Sending..."
          ] }) : "Send Reset Link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BackButton,
            {
              fallbackPath: "#",
              variant: "ghost",
              label: "Back to Sign In",
              className: "w-full",
              onClick: () => setShowForgotPassword(false)
            }
          )
        ] }) })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-accent/20 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-2xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-8 w-8 text-primary" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "TooEssay" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-strong border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Welcome" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Sign in to continue or create a new account" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "signin", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "signin", children: "Sign In" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "signup", children: "Sign Up" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "signin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSignIn, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "signin-email", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "signin-email",
                type: "email",
                placeholder: "you@example.com",
                value: signInEmail,
                onChange: (e) => setSignInEmail(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "signin-password", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowForgotPassword(true),
                  className: "text-sm text-primary hover:underline",
                  children: "Forgot password?"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "signin-password",
                type: "password",
                value: signInPassword,
                onChange: (e) => setSignInPassword(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? "Signing in..." : "Sign In" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "signup", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSignUp, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "full-name", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setIsTeacher(!isTeacher),
                  className: "text-sm text-muted-foreground hover:text-primary hover:underline",
                  children: isTeacher ? "Are you a student?" : "Are you a teacher?"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "full-name",
                type: "text",
                placeholder: "John Doe",
                value: fullName,
                onChange: (e) => setFullName(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "signup-email", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "signup-email",
                type: "email",
                placeholder: "you@example.com",
                value: signUpEmail,
                onChange: (e) => setSignUpEmail(e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "signup-password", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "signup-password",
                type: "password",
                value: signUpPassword,
                onChange: (e) => setSignUpPassword(e.target.value),
                required: true,
                minLength: 6
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? "Creating account..." : "Create Account" })
        ] }) })
      ] }) })
    ] })
  ] }) });
}

export { Auth as default };
