# UX/UI Patterns Guide

This guide documents the user experience and user interface patterns used throughout the IBDP Guide platform. Following these patterns ensures a consistent, accessible, and intuitive experience for IB students.

## Table of Contents

1. [Design System Overview](#design-system-overview)
2. [Color Palette & Theming](#color-palette--theming)
3. [Typography](#typography)
4. [Layout Patterns](#layout-patterns)
5. [Navigation Patterns](#navigation-patterns)
6. [Component Library](#component-library)
7. [Form Patterns](#form-patterns)
8. [Feedback & Loading States](#feedback--loading-states)
9. [Responsive Design](#responsive-design)
10. [Accessibility Guidelines](#accessibility-guidelines)
11. [Animation & Transitions](#animation--transitions)

---

## Design System Overview

The platform uses a cohesive design system built on:

- **shadcn/ui:** Component library with Radix UI primitives
- **Tailwind CSS:** Utility-first CSS framework
- **Lucide Icons:** Consistent icon set
- **CSS Variables:** Dynamic theming support

### Core Dependencies

```json
{
  "@radix-ui/react-*": "Various Radix primitives",
  "tailwindcss": "^3.x",
  "class-variance-authority": "For component variants",
  "clsx": "Conditional class names",
  "tailwind-merge": "Merge Tailwind classes"
}
```

### Utility Function

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Color Palette & Theming

### CSS Variables

The theme is defined using CSS custom properties for light/dark mode support:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode values */
}
```

### Semantic Colors

| Variable | Usage |
|----------|-------|
| `--primary` | Primary actions, buttons, links |
| `--secondary` | Secondary actions, muted buttons |
| `--destructive` | Delete actions, errors |
| `--muted` | Backgrounds, disabled states |
| `--accent` | Highlights, hover states |

### Using Theme Colors

```tsx
// In Tailwind classes
<div className="bg-background text-foreground" />
<Button className="bg-primary text-primary-foreground" />
<span className="text-muted-foreground" />

// For custom styling
<div className="bg-destructive/10 text-destructive" />
```

---

## Typography

### Font Stack

```css
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 
             "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Type Scale

| Class | Size | Usage |
|-------|------|-------|
| `text-xs` | 0.75rem | Badges, captions |
| `text-sm` | 0.875rem | Body text, labels |
| `text-base` | 1rem | Default body |
| `text-lg` | 1.125rem | Card titles |
| `text-xl` | 1.25rem | Section headers |
| `text-2xl` | 1.5rem | Page titles |
| `text-3xl` | 1.875rem | Hero text |

### Text Styling Patterns

```tsx
// Page title
<h1 className="text-2xl font-bold tracking-tight">Page Title</h1>

// Section header
<h2 className="text-lg font-semibold">Section Header</h2>

// Card title
<h3 className="font-medium">Card Title</h3>

// Body text
<p className="text-sm text-muted-foreground">Description text...</p>

// Caption
<span className="text-xs text-muted-foreground">Caption text</span>
```

---

## Layout Patterns

### Page Container

```tsx
// Standard page layout
<div className="min-h-screen bg-background">
  {/* Header */}
  <header className="border-b px-6 py-4">
    <h1 className="text-2xl font-bold">Page Title</h1>
  </header>
  
  {/* Content */}
  <main className="container mx-auto px-4 py-8">
    {/* Page content */}
  </main>
</div>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {item.description}
      </CardContent>
    </Card>
  ))}
</div>
```

### Resizable Panel Layout

```tsx
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

<ResizablePanelGroup direction="horizontal" className="min-h-screen">
  {/* Sidebar */}
  <ResizablePanel 
    defaultSize={20} 
    minSize={15} 
    maxSize={35}
    collapsible
    collapsedSize={3}
  >
    <nav className="p-4">Sidebar content</nav>
  </ResizablePanel>
  
  <ResizableHandle withHandle />
  
  {/* Main content */}
  <ResizablePanel defaultSize={60}>
    <main className="p-6">Main content</main>
  </ResizablePanel>
  
  <ResizableHandle withHandle />
  
  {/* Right panel */}
  <ResizablePanel defaultSize={20} collapsible collapsedSize={3}>
    <aside className="p-4">Right panel</aside>
  </ResizablePanel>
</ResizablePanelGroup>
```

### Two-Column Layout

```tsx
<div className="flex gap-8">
  <div className="w-64 shrink-0">
    {/* Sidebar */}
  </div>
  <div className="flex-1 min-w-0">
    {/* Main content */}
  </div>
</div>
```

---

## Navigation Patterns

### Top Navigation Bar

```tsx
<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="container flex h-14 items-center">
    {/* Logo */}
    <Link to="/" className="mr-6 flex items-center space-x-2">
      <Logo className="h-6 w-6" />
      <span className="font-bold">IBDP Guide</span>
    </Link>
    
    {/* Navigation links */}
    <nav className="flex items-center space-x-6 text-sm font-medium">
      <Link to="/dashboard" className="text-foreground/60 hover:text-foreground">
        Dashboard
      </Link>
      <Link to="/notes" className="text-foreground/60 hover:text-foreground">
        Notes
      </Link>
    </nav>
    
    {/* Right side */}
    <div className="ml-auto flex items-center space-x-4">
      <ThemeToggle />
      <UserMenu />
    </div>
  </div>
</header>
```

### Breadcrumb Navigation

```tsx
<nav className="flex items-center space-x-2 text-sm text-muted-foreground">
  <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
  <ChevronRight className="h-4 w-4" />
  <Link to="/ia-guides" className="hover:text-foreground">IA Guides</Link>
  <ChevronRight className="h-4 w-4" />
  <span className="text-foreground">Biology</span>
</nav>
```

### Tab Navigation

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="overview" className="w-full">
  <TabsList className="grid w-full grid-cols-4">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="criteria">Criteria</TabsTrigger>
    <TabsTrigger value="timeline">Timeline</TabsTrigger>
    <TabsTrigger value="references">References</TabsTrigger>
  </TabsList>
  
  <TabsContent value="overview">
    {/* Overview content */}
  </TabsContent>
  
  <TabsContent value="criteria">
    {/* Criteria content */}
  </TabsContent>
</Tabs>
```

### Back Button Pattern

```tsx
<Button 
  variant="ghost" 
  size="sm"
  onClick={() => navigate(-1)}
  className="gap-2"
>
  <ChevronLeft className="h-4 w-4" />
  Back
</Button>
```

---

## Component Library

### Buttons

```tsx
import { Button } from "@/components/ui/button";

// Primary action
<Button>Save Changes</Button>

// Secondary action
<Button variant="secondary">Cancel</Button>

// Outline
<Button variant="outline">View Details</Button>

// Ghost (minimal)
<Button variant="ghost">Edit</Button>

// Destructive
<Button variant="destructive">Delete</Button>

// With icon
<Button>
  <Plus className="h-4 w-4 mr-2" />
  Add Item
</Button>

// Icon only
<Button variant="ghost" size="icon">
  <Settings className="h-4 w-4" />
</Button>

// Loading state
<Button disabled>
  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
  Saving...
</Button>
```

### Cards

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Biology IA</CardTitle>
    <CardDescription>Internal Assessment Guide</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here...</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Continue</Button>
  </CardFooter>
</Card>
```

### Interactive Cards

```tsx
<Card 
  className="cursor-pointer hover:bg-muted/50 transition-colors"
  onClick={() => navigate(`/guides/${id}`)}
>
  <CardHeader className="flex flex-row items-center gap-4">
    <div className="p-2 rounded-lg bg-primary/10">
      <BookOpen className="h-6 w-6 text-primary" />
    </div>
    <div>
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </div>
    <ChevronRight className="h-5 w-5 ml-auto text-muted-foreground" />
  </CardHeader>
</Card>
```

### Badges

```tsx
import { Badge } from "@/components/ui/badge";

// Default
<Badge>New</Badge>

// Secondary
<Badge variant="secondary">Draft</Badge>

// Outline
<Badge variant="outline">v2.0</Badge>

// Destructive
<Badge variant="destructive">Overdue</Badge>

// Custom colors
<Badge className="bg-green-100 text-green-800">Completed</Badge>
<Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
```

### Tooltips

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Info className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>More information here</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Dialogs/Modals

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description explaining the action.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      {/* Dialog content */}
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Scroll Area

```tsx
import { ScrollArea } from "@/components/ui/scroll-area";

<ScrollArea className="h-[400px] rounded-md border p-4">
  <div className="space-y-4">
    {items.map(item => (
      <div key={item.id}>{item.content}</div>
    ))}
  </div>
</ScrollArea>
```

---

## Form Patterns

### Input with Label

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="space-y-2">
  <Label htmlFor="title">Assignment Title</Label>
  <Input
    id="title"
    placeholder="Enter title..."
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
</div>
```

### Select Dropdown

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select value={subject} onValueChange={setSubject}>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select subject" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="biology">Biology</SelectItem>
    <SelectItem value="chemistry">Chemistry</SelectItem>
    <SelectItem value="physics">Physics</SelectItem>
  </SelectContent>
</Select>
```

### Search Input

```tsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input
    placeholder="Search..."
    className="pl-9"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>
```

### Form with Validation

```tsx
<form onSubmit={handleSubmit} className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input
      id="email"
      type="email"
      required
      className={errors.email ? "border-destructive" : ""}
    />
    {errors.email && (
      <p className="text-sm text-destructive">{errors.email}</p>
    )}
  </div>
  
  <Button type="submit" className="w-full">
    Submit
  </Button>
</form>
```

---

## Feedback & Loading States

### Loading Spinner

```tsx
import { Loader2 } from "lucide-react";

// Inline spinner
<Loader2 className="h-4 w-4 animate-spin" />

// Centered loading state
<div className="flex items-center justify-center h-64">
  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
</div>

// With text
<div className="flex items-center gap-2 text-muted-foreground">
  <Loader2 className="h-4 w-4 animate-spin" />
  <span>Loading...</span>
</div>
```

### Skeleton Loading

```tsx
import { Skeleton } from "@/components/ui/skeleton";

// Card skeleton
<Card>
  <CardHeader>
    <Skeleton className="h-5 w-40" />
    <Skeleton className="h-4 w-60" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-20 w-full" />
  </CardContent>
</Card>
```

### Toast Notifications

```tsx
import { toast } from "sonner";

// Success
toast.success("Changes saved successfully!");

// Error
toast.error("Failed to save changes");

// Loading with promise
toast.promise(saveData(), {
  loading: "Saving...",
  success: "Saved!",
  error: "Failed to save",
});

// Custom
toast("Custom message", {
  description: "Additional details",
  action: {
    label: "Undo",
    onClick: () => undoAction(),
  },
});
```

### Empty States

```tsx
<div className="text-center py-12">
  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
    <FileText className="h-6 w-6 text-muted-foreground" />
  </div>
  <h3 className="text-lg font-medium mb-2">No documents yet</h3>
  <p className="text-sm text-muted-foreground mb-4">
    Get started by creating your first document.
  </p>
  <Button>
    <Plus className="h-4 w-4 mr-2" />
    Create Document
  </Button>
</div>
```

### Error States

```tsx
<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
  <div className="flex items-start gap-3">
    <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
    <div>
      <h4 className="font-medium text-destructive">Error loading data</h4>
      <p className="text-sm text-destructive/80 mt-1">
        Please try again or contact support if the problem persists.
      </p>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-3"
        onClick={retry}
      >
        Try Again
      </Button>
    </div>
  </div>
</div>
```

---

## Responsive Design

### Breakpoints

```
sm: 640px   - Small devices
md: 768px   - Tablets
lg: 1024px  - Laptops
xl: 1280px  - Desktops
2xl: 1536px - Large screens
```

### Responsive Patterns

```tsx
// Grid that adapts
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

// Hidden on mobile
<div className="hidden md:block">Desktop only</div>

// Visible only on mobile
<div className="md:hidden">Mobile only</div>

// Stack on mobile, row on desktop
<div className="flex flex-col sm:flex-row gap-4">

// Different padding
<div className="p-4 md:p-6 lg:p-8">
```

### Mobile-First Header

```tsx
<header className="border-b">
  <div className="flex items-center justify-between p-4">
    <Logo />
    
    {/* Desktop nav */}
    <nav className="hidden md:flex items-center gap-6">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/notes">Notes</Link>
    </nav>
    
    {/* Mobile menu button */}
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu className="h-5 w-5" />
    </Button>
  </div>
</header>
```

---

## Accessibility Guidelines

### Focus States

```tsx
// Default focus ring
<button className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">

// Focus visible only
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
```

### ARIA Labels

```tsx
// Icon button
<Button variant="ghost" size="icon" aria-label="Close menu">
  <X className="h-4 w-4" />
</Button>

// Loading state
<Button disabled aria-busy="true">
  <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
  <span>Saving...</span>
</Button>

// Expandable section
<button 
  aria-expanded={isExpanded} 
  aria-controls="panel-content"
>
  Toggle
</button>
<div id="panel-content" hidden={!isExpanded}>
  Content
</div>
```

### Keyboard Navigation

```tsx
// Handle keyboard events
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Interactive element
</div>
```

### Screen Reader Text

```tsx
// Visually hidden but screen reader accessible
<span className="sr-only">Loading content</span>

// Skip link
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-background px-4 py-2"
>
  Skip to main content
</a>
```

---

## Animation & Transitions

### Standard Transitions

```tsx
// Hover transition
<div className="transition-colors hover:bg-muted">

// All transitions
<div className="transition-all duration-200">

// Specific property
<div className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
```

### Animation Classes

```tsx
// Spin
<Loader2 className="animate-spin" />

// Pulse
<div className="animate-pulse bg-muted h-4 w-32 rounded" />

// Bounce
<div className="animate-bounce">↓</div>
```

### Framer Motion Patterns

```tsx
import { motion, AnimatePresence } from "framer-motion";

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  Content
</motion.div>

// Slide in
<motion.div
  initial={{ x: -20, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.2 }}
>
  Content
</motion.div>

// List stagger
<motion.ul>
  {items.map((item, i) => (
    <motion.li
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
    >
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

### Collapsible Animations

```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger className="flex items-center gap-2">
    <ChevronRight className={cn(
      "h-4 w-4 transition-transform duration-200",
      isOpen && "rotate-90"
    )} />
    Section Title
  </CollapsibleTrigger>
  <CollapsibleContent className="pt-2">
    Hidden content that animates open/closed
  </CollapsibleContent>
</Collapsible>
```

---

## Best Practices Summary

1. **Consistency:** Use the same component variants across the app
2. **Feedback:** Always show loading, success, and error states
3. **Accessibility:** Include ARIA labels and keyboard support
4. **Responsive:** Design mobile-first, enhance for larger screens
5. **Animation:** Keep animations subtle (200-300ms)
6. **Whitespace:** Use consistent spacing (multiples of 4px)
7. **Color:** Use semantic colors from the theme
8. **Icons:** Use Lucide icons at consistent sizes (h-4 w-4, h-5 w-5)

---

## Related Documentation

- [Editor Patterns](./EDITOR_PATTERNS.md) - Editor component patterns
- [Draft Page Guide](./DRAFT_PAGE_GUIDE.md) - Draft page implementation
- [Notes Page Guide](./NOTES_PAGE_GUIDE.md) - Notes page implementation
- [AI Commands Guide](./AI_COMMANDS_GUIDE.md) - AI integration patterns
