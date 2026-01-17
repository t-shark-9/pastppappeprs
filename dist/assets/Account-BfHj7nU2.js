import { as as useTranslation, r as reactExports, j as jsxRuntimeExports, aD as User, de as School, av as GraduationCap, aM as Calendar, aE as LogOut, d1 as Mail, da as Languages, db as Sun, dc as Moon, dd as Monitor, aL as FilePen, az as Sparkles } from './vendor-react-BeQHm2Hb.js';
import { u as useAuth, p as useTheme, B as Button, S as SUPPORTED_LANGUAGES, q as getLanguageFromProgram, s as supabase } from './index-C9tyh6tO.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-BTaNjRSt.js';
import { L as Label } from './label-BfT9c56I.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-DtVQdYEt.js';
import { S as Switch } from './switch-CK-TAwbC.js';
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

function Account() {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [autoDetectLanguage, setAutoDetectLanguage] = reactExports.useState(true);
  const [selectedLanguage, setSelectedLanguage] = reactExports.useState(i18n.language);
  const [schoolProgram, setSchoolProgram] = reactExports.useState(null);
  const [profile, setProfile] = reactExports.useState(null);
  const [preferSimpleEditor, setPreferSimpleEditor] = reactExports.useState(() => {
    return localStorage.getItem("tooessay-prefer-simple-editor") === "true";
  });
  reactExports.useEffect(() => {
    const loadPreferences = async () => {
      if (user) {
        const { data: profileData } = await supabase.from("profiles").select("full_name, school_name, education_type, school_program, created_at").eq("id", user.id).maybeSingle();
        if (profileData) {
          setProfile(profileData);
          setSchoolProgram(profileData.school_program);
          if (profileData.school_program) {
            const detectedLang = getLanguageFromProgram(profileData.school_program);
            setSelectedLanguage(detectedLang);
            i18n.changeLanguage(detectedLang);
          }
        }
      }
    };
    loadPreferences();
  }, [user, i18n]);
  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language);
    setAutoDetectLanguage(false);
    i18n.changeLanguage(language);
    ue.success(t("settings.save"));
  };
  const handleAutoDetectToggle = async (checked) => {
    setAutoDetectLanguage(checked);
    if (checked && schoolProgram) {
      const detectedLang = getLanguageFromProgram(schoolProgram);
      setSelectedLanguage(detectedLang);
      i18n.changeLanguage(detectedLang);
    }
  };
  const handleEditorPreferenceChange = (checked) => {
    setPreferSimpleEditor(checked);
    localStorage.setItem("tooessay-prefer-simple-editor", checked.toString());
    ue.success(checked ? "Simple editor enabled" : "Rich editor enabled");
  };
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-6 py-16 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BackButton,
        {
          fallbackPath: "/work",
          size: "icon",
          tooltip: t("common.back"),
          onClick: () => navigate("/work")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold", children: "Account" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Profile" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your account information" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-lg bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: profile?.full_name || user.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: user.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
          profile?.school_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(School, { className: "h-5 w-5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "School" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: profile.school_name })
            ] })
          ] }),
          profile?.school_program && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Program" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: t(`schoolProgram.${profile.school_program}`) })
            ] })
          ] }),
          profile?.education_type && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Education Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium capitalize", children: profile.education_type })
            ] })
          ] }),
          profile?.created_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Member Since" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: new Date(profile.created_at).toLocaleDateString(void 0, { year: "numeric", month: "long", day: "numeric" }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full gap-2", onClick: handleSignOut, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          "Sign Out"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "You're currently using guest mode. Sign in to save your work permanently." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full gap-2", onClick: () => navigate("/auth"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
          "Sign In"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: t("settings.language") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: t("settings.selectLanguage") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
        user && schoolProgram && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "auto-detect", children: t("settings.autoDetect") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              t("schoolProgram." + schoolProgram),
              " → ",
              SUPPORTED_LANGUAGES.find((l) => l.code === getLanguageFromProgram(schoolProgram))?.nativeName
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "auto-detect",
              checked: autoDetectLanguage,
              onCheckedChange: handleAutoDetectToggle
            }
          )
        ] }),
        (!autoDetectLanguage || !user || !schoolProgram) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("settings.language") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedLanguage, onValueChange: handleLanguageChange, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SUPPORTED_LANGUAGES.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: lang.code, children: [
              lang.nativeName,
              " (",
              lang.name,
              ")"
            ] }, lang.code)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
            "Current Language: ",
            SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage)?.nativeName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Language preferences are saved automatically and will be remembered across sessions." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: t("settings.theme") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Choose your preferred color theme" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: theme === "light" ? "default" : "outline",
              className: "h-20 flex-col gap-2",
              onClick: () => setTheme("light"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-5 w-5" }),
                t("settings.light")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: theme === "dark" ? "default" : "outline",
              className: "h-20 flex-col gap-2",
              onClick: () => setTheme("dark"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-5 w-5" }),
                t("settings.dark")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "h-20 flex-col gap-2",
              disabled: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-5 w-5" }),
                t("settings.system")
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-4", children: [
          "Current theme: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: theme === "light" ? "Light" : "Dark" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilePen, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Editor Preference" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Choose your preferred editor for drafts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "simple-editor", children: "Use Simple Editor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: preferSimpleEditor ? "Google Docs-style editor with page breaks" : "Rich BlockNote editor with advanced formatting" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "simple-editor",
              checked: preferSimpleEditor,
              onCheckedChange: handleEditorPreferenceChange
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This preference applies to new drafts. You can still switch editors using the toggle button in the draft page." }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "AI Autocomplete" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Get AI-powered writing suggestions as you type" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "autocomplete", children: "Enable Autocomplete" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "AI will suggest completions for your sentences. Press Tab to accept." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "autocomplete",
              checked: localStorage.getItem("tooessay-autocomplete-enabled") !== "false",
              onCheckedChange: (checked) => {
                localStorage.setItem("tooessay-autocomplete-enabled", checked.toString());
                ue.success(checked ? "Autocomplete enabled" : "Autocomplete disabled");
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-blue-500/10 border border-blue-500/20 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-blue-600 dark:text-blue-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tip:" }),
          " Start typing a sentence and wait a moment. The AI will suggest how to complete it. Press ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-1.5 py-0.5 bg-background border rounded text-xs", children: "Tab" }),
          " to accept or ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-1.5 py-0.5 bg-background border rounded text-xs", children: "Esc" }),
          " to dismiss."
        ] }) })
      ] })
    ] })
  ] }) });
}

export { Account as default };
