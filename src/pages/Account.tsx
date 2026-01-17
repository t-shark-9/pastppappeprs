import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Languages, Moon, Sun, Monitor, FileEdit, Sparkles, User, LogOut, Mail, School, GraduationCap, Calendar, Edit } from "lucide-react";
import { SUPPORTED_LANGUAGES, getLanguageFromProgram } from "@/i18n/config";
import { supabase } from "@/integrations/supabase/client";
import { ProfileEditor, GhostProfileEditor } from "@/components/profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Account() {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const { isGhostMode } = useGhostSession();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [autoDetectLanguage, setAutoDetectLanguage] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [schoolProgram, setSchoolProgram] = useState<string | null>(null);
  const [profile, setProfile] = useState<{
    full_name: string | null;
    school_name: string | null;
    education_type: string | null;
    school_program: string | null;
    created_at: string | null;
  } | null>(null);
  const [preferSimpleEditor, setPreferSimpleEditor] = useState(() => {
    return localStorage.getItem('tooessay-prefer-simple-editor') === 'true';
  });
  const [activeTab, setActiveTab] = useState<"profile" | "settings">("profile");
  
  // Refs for saving on exit
  const profileEditorRef = useRef<{ save: () => Promise<void> }>(null);
  const ghostProfileEditorRef = useRef<{ save: () => void }>(null);

  useEffect(() => {
    // Load user preferences
    const loadPreferences = async () => {
      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name, school_name, education_type, school_program, created_at')
          .eq('id', user.id)
          .maybeSingle();

        if (profileData) {
          setProfile(profileData);
          setSchoolProgram(profileData.school_program);
          
          // Auto-detect from school program
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

  const handleLanguageChange = async (language: string) => {
    setSelectedLanguage(language);
    setAutoDetectLanguage(false);
    i18n.changeLanguage(language);
    toast.success(t('settings.save'));
  };

  const handleAutoDetectToggle = async (checked: boolean) => {
    setAutoDetectLanguage(checked);

    if (checked && schoolProgram) {
      // Auto-detect language from school program
      const detectedLang = getLanguageFromProgram(schoolProgram);
      setSelectedLanguage(detectedLang);
      i18n.changeLanguage(detectedLang);
    }
  };

  const handleEditorPreferenceChange = (checked: boolean) => {
    setPreferSimpleEditor(checked);
    localStorage.setItem('tooessay-prefer-simple-editor', checked.toString());
    toast.success(checked ? 'Simple editor enabled' : 'Rich editor enabled');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data.")) {
      return;
    }

    try {
      const { error } = await supabase.from('profiles').delete().eq('id', user?.id);
      if (error) throw error;
      
      await signOut();
      navigate('/');
      toast.success("Your account has been deleted.");
    } catch (error: any) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account. Please try again or contact support.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <BackButton
            fallbackPath="/work"
            size="icon"
            tooltip={t('common.back')}
            onClick={async () => {
              if (activeTab === 'profile') {
                if (user && profileEditorRef.current) {
                  await profileEditorRef.current.save();
                } else if (!user && isGhostMode && ghostProfileEditorRef.current) {
                  ghostProfileEditorRef.current.save();
                }
              }
              navigate('/work');
            }}
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold">Account</h1>
          </div>
        </div>

        {/* Tabs for Profile / Settings */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "profile" | "settings")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </TabsTrigger>
            <TabsTrigger value="settings">
              <FileEdit className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6 space-y-6">
            {user ? (
              <ProfileEditor ref={profileEditorRef} onSave={() => navigate('/work')} />
            ) : isGhostMode ? (
              <GhostProfileEditor ref={ghostProfileEditorRef} onSave={() => navigate('/work')} />
            ) : (
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-center mb-4">
                    Sign in to edit and save your profile permanently.
                  </p>
                  <Button className="w-full gap-2" onClick={() => navigate('/auth')}>
                    <Mail className="h-4 w-4" />
                    Sign In
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6 space-y-6">
            {/* Quick Profile Summary */}
            {user && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    <CardTitle>Account</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{profile?.full_name || user.email}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full gap-2" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Language Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-primary" />
                  <CardTitle>{t('settings.language')}</CardTitle>
                </div>
                <CardDescription>
                  {t('settings.selectLanguage')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {user && schoolProgram && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-detect">{t('settings.autoDetect')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('schoolProgram.' + schoolProgram)} → {SUPPORTED_LANGUAGES.find(l => l.code === getLanguageFromProgram(schoolProgram))?.nativeName}
                      </p>
                    </div>
                    <Switch
                      id="auto-detect"
                      checked={autoDetectLanguage}
                      onCheckedChange={handleAutoDetectToggle}
                    />
                  </div>
                )}

                {(!autoDetectLanguage || !user || !schoolProgram) && (
                  <div className="space-y-2">
                    <Label>{t('settings.language')}</Label>
                    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SUPPORTED_LANGUAGES.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.nativeName} ({lang.name})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Theme Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-primary" />
                  <CardTitle>{t('settings.theme')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <Button 
                    variant={theme === 'light' ? 'default' : 'outline'} 
                    className="h-20 flex-col gap-2"
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="h-5 w-5" />
                    {t('settings.light')}
                  </Button>
                  <Button 
                    variant={theme === 'dark' ? 'default' : 'outline'} 
                    className="h-20 flex-col gap-2"
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="h-5 w-5" />
                    {t('settings.dark')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    disabled
                  >
                    <Monitor className="h-5 w-5" />
                    {t('settings.system')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Editor Preference */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileEdit className="h-5 w-5 text-primary" />
                  <CardTitle>Editor Preference</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="simple-editor">Use Simple Editor</Label>
                    <p className="text-sm text-muted-foreground">
                      {preferSimpleEditor 
                        ? "Google Docs-style editor with page breaks" 
                        : "Rich BlockNote editor with advanced formatting"}
                    </p>
                  </div>
                  <Switch
                    id="simple-editor"
                    checked={preferSimpleEditor}
                    onCheckedChange={handleEditorPreferenceChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            {user && (
              <Card className="border-destructive/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <LogOut className="h-5 w-5 text-destructive" />
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-destructive/5 p-4 rounded-lg border border-destructive/10">
                    <div className="space-y-1">
                      <p className="font-medium text-destructive">Sign Out</p>
                      <p className="text-sm text-muted-foreground">Sign out of your account on this device</p>
                    </div>
                    <Button variant="outline" className="border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-destructive/5 p-4 rounded-lg border border-destructive/10">
                    <div className="space-y-1">
                      <p className="font-medium text-destructive">Delete Account</p>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
