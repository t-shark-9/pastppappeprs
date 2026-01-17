import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";
import { Moon, Sun, Settings, PanelLeftClose, PanelRightClose, Menu, MousePointerClick, LayoutDashboard } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, setTheme } = useTheme();
  const { flags, updateFlag } = useFeatureFlags();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Customize your editor experience and preferences
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Theme Settings */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Theme</Label>
            <RadioGroup 
              value={theme} 
              onValueChange={(value: 'light' | 'dark') => setTheme(value)}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="light" id="light" className="peer sr-only" />
                <Label 
                  htmlFor="light" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Sun className="mb-3 h-6 w-6" />
                  Light
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                <Label 
                  htmlFor="dark" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Moon className="mb-3 h-6 w-6" />
                  Dark
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Panel Settings */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Panels
            </Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="left-panel" className="text-sm flex items-center gap-2">
                    <PanelLeftClose className="h-3.5 w-3.5" />
                    Left Panel
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Show outline and planning notes panel
                  </p>
                </div>
                <Switch
                  id="left-panel"
                  checked={flags.showLeftPanel}
                  onCheckedChange={(checked) => updateFlag('showLeftPanel', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="right-panel" className="text-sm flex items-center gap-2">
                    <PanelRightClose className="h-3.5 w-3.5" />
                    Right Panel
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Show comments and grading panel
                  </p>
                </div>
                <Switch
                  id="right-panel"
                  checked={flags.showRightPanel}
                  onCheckedChange={(checked) => updateFlag('showRightPanel', checked)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Menu Settings */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Menu className="h-4 w-4" />
              Menus & Toolbars
            </Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="menu-header" className="text-sm">Menu Header Bar</Label>
                  <p className="text-xs text-muted-foreground">
                    Show top toolbar with formatting options
                  </p>
                </div>
                <Switch
                  id="menu-header"
                  checked={flags.showMenuHeader}
                  onCheckedChange={(checked) => updateFlag('showMenuHeader', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="floating-toolbar" className="text-sm flex items-center gap-2">
                    <MousePointerClick className="h-3.5 w-3.5" />
                    Floating Selection Toolbar
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Show formatting toolbar when text is selected
                  </p>
                </div>
                <Switch
                  id="floating-toolbar"
                  checked={flags.showFloatingToolbar}
                  onCheckedChange={(checked) => updateFlag('showFloatingToolbar', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="slash-menu" className="text-sm">Slash Commands</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable typing / to access command menu
                  </p>
                </div>
                <Switch
                  id="slash-menu"
                  checked={!flags.standingToolbar}
                  onCheckedChange={(checked) => updateFlag('standingToolbar', !checked)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose}>Done</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SettingsButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={() => navigate("/work/settings")}>
            <Settings className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>
      <SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}