# Quick Start: Adding AI-Generated Blogs

## 🚀 5-Minute Setup

### 1. Generate Your Blog
1. Go to `/admin`
2. Click "Blogs" tab
3. Enter topic: "How to Ace Your IB Economics IA"
4. Click "Generate Blog"

### 2. Download & Save
1. Click "Download Component"
2. File downloads as: `how-to-ace-your-ib-economics-ia.tsx`
3. Move to: `src/pages/`

### 3. Add Route in App.tsx

Find this section (around line 87):
```tsx
const Blog = lazy(() => import("./pages/Blog"));
```

Add your import:
```tsx
const HowToAceYourIBEconomicsIA = lazy(() => import("./pages/how-to-ace-your-ib-economics-ia"));
```

Find the blog routes section (around line 148):
```tsx
{/* Blog Section */}
<Route path="/homepage/blog" element={<Blog />} />
<Route path="/homepage/blog/essay-guide" element={<HowToWriteEssay />} />
```

Add your route:
```tsx
<Route path="/homepage/blog/how-to-ace-your-ib-economics-ia" element={<HowToAceYourIBEconomicsIA />} />
```

### 4. Add Link in Blog.tsx

Open `src/pages/Blog.tsx` and find the `sections` array (around line 11):

```tsx
const sections = [
  {
    title: "How to Write an Essay",
    description: "Step-by-step essay writing guide",
    icon: BookOpen,
    path: "/homepage/blog/essay-guide",
  },
  // Add your new blog here:
  {
    title: "How to Ace Your IB Economics IA",
    description: "Complete guide to Economics Internal Assessment",
    icon: BookOpen,
    path: "/homepage/blog/how-to-ace-your-ib-economics-ia",
  },
];
```

### 5. Test It!
1. Save all files
2. Go to http://localhost:8081/homepage/blog
3. Click your new blog
4. Verify it loads correctly

## 📋 Template for Blog.tsx

Copy-paste this template for each new blog:

```tsx
{
  title: "YOUR BLOG TITLE",
  description: "Short description from AI generation",
  icon: BookOpen, // or GraduationCap, Lightbulb, Library, etc.
  path: "/homepage/blog/your-slug-here",
},
```

## 🎨 Icon Options

Import these at the top of Blog.tsx if needed:
```tsx
import { 
  BookOpen,      // Books, reading, general content
  Lightbulb,     // Ideas, tips, insights  
  GraduationCap, // Education, academic
  Library,       // Resources, research
  PenTool,       // Writing, composition
  Award,         // Achievement, success
  Target,        // Goals, objectives
  Brain,         // TOK, thinking
  Beaker,        // Sciences
  Globe,         // Geography, global
  Calculator,    // Math
  Palette,       // Arts
} from "lucide-react";
```

## ⚠️ Common Issues

### Blog doesn't load
- Check the import name matches the file name
- Verify the route path matches the slug
- Make sure the file is in `src/pages/`

### Route conflicts
- Ensure slug is unique
- Check for duplicate routes in App.tsx

### Styling issues
- ArticleWrapper handles all styling automatically
- No additional CSS needed

## 🔄 Quick Commands

```bash
# Restart dev server
npm run dev

# Build for production
npm run build

# Check for errors
npm run lint
```

## 💡 Pro Tips

1. **Consistent Naming**: Use kebab-case for slugs (words-separated-by-hyphens)
2. **SEO-Friendly**: Keep slugs under 60 characters
3. **Organize**: Group related blogs in subfolders if you have many
4. **Test First**: Always test locally before deploying
5. **Backup**: Keep generated content in case you need to regenerate

## 📱 Mobile Testing

Test on mobile by accessing:
```
http://192.168.0.67:8081/homepage/blog/your-slug
```

## 🚢 Deployment

After adding blogs:
1. Commit changes to git
2. Push to repository  
3. Deploy via your hosting platform
4. Verify in production

---

**Need Help?** Check [ADMIN_BLOG_MANAGEMENT.md](./ADMIN_BLOG_MANAGEMENT.md) for detailed documentation.
