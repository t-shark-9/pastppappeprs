# Admin Blog Management System

## Overview
The admin panel now includes an AI-powered blog generation system that allows you to create SEO-optimized blog articles with a single click.

## Features

### 1. AI Blog Generator
- **Topic-based Generation**: Enter any IB-related topic and get a comprehensive blog article
- **Style Customization**: Specify writing style, tone, or requirements
- **Reference URL Support**: Provide a URL for the AI to use as inspiration (creates original content)
- **SEO Optimization**: Automatically generates:
  - SEO-friendly titles (60-70 characters)
  - Meta descriptions (150-160 characters)
  - Relevant keywords (8-12 keywords)
  - URL-friendly slugs
  - Proper category assignment

### 2. Generated Content Features
- **1500-2500 words** of high-quality, educational content
- Proper markdown formatting with headings
- IB-specific terminology and context
- Practical examples and actionable advice
- Student-friendly language with academic tone

### 3. Export Options
- **Preview**: View the generated content in a formatted preview
- **Copy to Clipboard**: Copy the complete React component code
- **Download Component**: Download as a ready-to-use .tsx file

## How to Use

### Step 1: Access Admin Panel
1. Log in with admin credentials (mail@tjark-osterloh.de)
2. Navigate to `/admin`
3. Click on the "Blogs" tab

### Step 2: Generate a Blog
1. **Enter Topic**: Type your blog topic (e.g., "How to Write a TOK Essay")
2. **Optional - Style**: Specify any style requirements or tone preferences
3. **Optional - Reference URL**: Add a URL for inspiration (e.g., from Revision Dojo)
4. Click "Generate Blog"

### Step 3: Review Generated Content
The AI will generate:
- Title
- Description
- Full article content
- Keywords
- Category
- URL slug

### Step 4: Deploy the Blog
1. Click "Download Component" to get the .tsx file
2. Save the file to `src/pages/[slug].tsx`
3. Add a route in `App.tsx`:
   ```tsx
   const NewBlog = lazy(() => import("./pages/[slug]"));
   // ...
   <Route path="/homepage/blog/[slug]" element={<NewBlog />} />
   ```
4. Add a link in `Blog.tsx`:
   ```tsx
   {
     title: "Your New Blog Title",
     description: "Your blog description",
     icon: BookOpen, // or appropriate icon
     path: "/homepage/blog/[slug]",
   }
   ```

## Using Reference URLs (Revision Dojo Integration)

### Important Notes
- Reference URLs are for **inspiration only**
- The AI creates **100% original content**
- Use it to match structure, depth, and topic coverage
- Never directly copies content

### Example Workflow
1. Find a Revision Dojo article on a similar topic
2. Copy the URL (e.g., `https://revisiondojo.com/ib-chemistry-ia-guide`)
3. Paste it in the "Reference URL" field
4. The AI will analyze the structure and create original content

### Ethical Considerations
- ✅ Use for inspiration and structure reference
- ✅ Generate unique, original content
- ✅ Add your own expertise and insights
- ❌ Don't directly copy content
- ❌ Don't plagiarize
- ❌ Always create value-added content

## Component Structure

Generated blogs use the `ArticleWrapper` component which includes:
- **SEO Meta Tags**: Open Graph, Twitter Cards
- **Schema.org Markup**: Article structured data
- **Breadcrumb Navigation**: Enhanced SEO
- **Responsive Design**: Mobile-friendly layout
- **Dark Mode Support**: Automatic theme switching

## Technical Details

### Edge Function
Location: `supabase/functions/generate-blog/index.ts`

The function:
- Uses Google Gemini 2.5 Flash model
- Generates JSON-formatted responses
- Includes rate limiting and error handling
- Supports optional reference URLs

### Component Location
Location: `src/components/admin/BlogManagement.tsx`

Features:
- React state management
- Supabase authentication
- Real-time generation status
- Clipboard API integration
- File download functionality

## Example Topics

### Good Topics
- "Complete Guide to IB Chemistry IA"
- "TOK Essay Writing Tips and Examples"
- "How to Choose an Extended Essay Topic"
- "Business Management IA Ideas"
- "IB Physics IA Experimental Design"

### Tips for Better Results
1. Be specific about the level (HL/SL)
2. Mention specific assessment criteria if relevant
3. Include the subject area
4. Specify if you want examples or case studies

## Troubleshooting

### Generation Fails
- Check your internet connection
- Verify Supabase functions are deployed
- Ensure LOVABLE_API_KEY is configured
- Check the browser console for errors

### Component Won't Download
- Check browser download permissions
- Try "Copy to Clipboard" instead
- Manually create file from copied content

### Route Not Working
- Verify the import statement is correct
- Check the route path matches the slug
- Ensure the file is in the correct directory
- Clear browser cache and restart dev server

## Future Enhancements

Potential features to add:
- **Auto-deploy**: Automatically create files and routes
- **Image Generation**: AI-generated featured images
- **Content Calendar**: Schedule blog publications
- **Analytics Integration**: Track blog performance
- **Multi-language**: Generate in different languages
- **Version Control**: Save draft versions
- **Direct Publishing**: Publish without manual deployment

## Security

- Admin access restricted to verified email
- All API calls authenticated with Supabase
- Edge functions with CORS protection
- Rate limiting on AI generation

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify admin permissions
3. Test with a simple topic first
4. Contact the development team

---

**Last Updated**: December 24, 2025
**Version**: 1.0.0
