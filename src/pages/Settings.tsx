import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Languages, Moon, Sun, Monitor, FileEdit, Sparkles, SpellCheck } from "lucide-react";
import { SUPPORTED_LANGUAGES, getLanguageFromProgram } from "@/i18n/config";
import { supabase } from "@/integrations/supabase/client";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [autoDetectLanguage, setAutoDetectLanguage] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [schoolProgram, setSchoolProgram] = useState<string | null>(null);
  const [preferSimpleEditor, setPreferSimpleEditor] = useState(() => {
    return localStorage.getItem('tooessay-prefer-simple-editor') === 'true';
  });

  useEffect(() => {
    // Load user preferences
    const loadPreferences = async () => {
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('school_program')
          .eq('id', user.id)
          .maybeSingle();

        if (profile) {
          setSchoolProgram(profile.school_program);
          
          // Auto-detect from school program
          const detectedLang = getLanguageFromProgram(profile.school_program);
          setSelectedLanguage(detectedLang);
          i18n.changeLanguage(detectedLang);
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

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <BackButton
            fallbackPath="/work"
            size="icon"
            tooltip={t('common.back')}
          />
          <div>
            <h1 className="text-4xl font-bold">{t('settings.title')}</h1>
          </div>
        </div>

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
            {/* Auto-detect Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-detect">{t('settings.autoDetect')}</Label>
                <p className="text-sm text-muted-foreground">
                  {schoolProgram && `${t('schoolProgram.' + schoolProgram)} → ${SUPPORTED_LANGUAGES.find(l => l.code === getLanguageFromProgram(schoolProgram))?.nativeName}`}
                </p>
              </div>
              <Switch
                id="auto-detect"
                checked={autoDetectLanguage}
                onCheckedChange={handleAutoDetectToggle}
              />
            </div>

            {/* Manual Language Selection */}
            {!autoDetectLanguage && (
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

            {/* Language Info */}
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <p className="text-sm font-medium">
                Current Language: {SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.nativeName}
              </p>
              <p className="text-xs text-muted-foreground">
                Language preferences are saved automatically and will be remembered across sessions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-primary" />
              <CardTitle>{t('settings.theme')}</CardTitle>
            </div>
            <CardDescription>
              Choose your preferred color theme
            </CardDescription>
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
            <p className="text-xs text-muted-foreground mt-4">
              Current theme: <strong>{theme === 'light' ? 'Light' : 'Dark'}</strong>
            </p>
          </CardContent>
        </Card>

        {/* Editor Preference */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileEdit className="h-5 w-5 text-primary" />
              <CardTitle>Editor Preference</CardTitle>
            </div>
            <CardDescription>
              Choose your preferred editor for drafts
            </CardDescription>
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
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                This preference applies to new drafts. You can still switch editors using the toggle button in the draft page.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Text Autocomplete */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>Text Autocomplete</CardTitle>
            </div>
            <CardDescription>
              Get smart phrase and word completions as you type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autocomplete">Enable Autocomplete</Label>
                <p className="text-sm text-muted-foreground">
                  Suggests common academic phrases and word completions. Press Tab to accept.
                </p>
              </div>
              <Switch
                id="autocomplete"
                checked={localStorage.getItem('tooessay-autocomplete-enabled') !== 'false'}
                onCheckedChange={(checked) => {
                  localStorage.setItem('tooessay-autocomplete-enabled', checked.toString());
                  toast.success(checked ? 'Autocomplete enabled' : 'Autocomplete disabled');
                }}
              />
            </div>
            <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                <strong>Tip:</strong> Type common academic phrases like "In conclusion", "Furthermore", "However" etc. Suggestions appear instantly. Press <kbd className="px-1.5 py-0.5 bg-background border rounded text-xs">Tab</kbd> to accept or <kbd className="px-1.5 py-0.5 bg-background border rounded text-xs">Esc</kbd> to dismiss.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Autocorrect / Spell Check */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <SpellCheck className="h-5 w-5 text-primary" />
              <CardTitle>Autocorrect</CardTitle>
            </div>
            <CardDescription>
              Get spelling suggestions for misspelled words as you type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autocorrect">Enable Autocorrect</Label>
                <p className="text-sm text-muted-foreground">
                  Suggests corrections for potentially misspelled words using fuzzy matching.
                </p>
              </div>
              <Switch
                id="autocorrect"
                checked={localStorage.getItem('tooessay-autocorrect-enabled') !== 'false'}
                onCheckedChange={(checked) => {
                  localStorage.setItem('tooessay-autocorrect-enabled', checked.toString());
                  toast.success(checked ? 'Autocorrect enabled' : 'Autocorrect disabled');
                }}
              />
            </div>
            <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
              <p className="text-sm text-green-600 dark:text-green-400">
                <strong>How it works:</strong> After typing a word and pressing space, if the word appears misspelled, you'll see suggestions. Use <kbd className="px-1.5 py-0.5 bg-background border rounded text-xs">↑</kbd><kbd className="px-1.5 py-0.5 bg-background border rounded text-xs">↓</kbd> to navigate and <kbd className="px-1.5 py-0.5 bg-background border rounded text-xs">Tab</kbd> or <kbd className="px-1.5 py-0.5 bg-background border rounded text-xs">Enter</kbd> to accept.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
