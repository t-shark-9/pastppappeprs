# Deploying the Blog Generator Edge Function

## Prerequisites

1. **Supabase CLI** installed
   ```bash
   npm install -g supabase
   ```

2. **Supabase Project** linked
   ```bash
   supabase login
   supabase link --project-ref jimfuknlntcqgtqfwcod
   ```

## Deployment Steps

### 1. Deploy the Function

```bash
# From your project root
supabase functions deploy generate-blog
```

Expected output:
```
Deploying function generate-blog...
Function generate-blog deployed successfully
URL: https://jimfuknlntcqgtqfwcod.supabase.co/functions/v1/generate-blog
```

### 2. Verify Deployment

Test the function:
```bash
curl -X POST 'https://jimfuknlntcqgtqfwcod.supabase.co/functions/v1/generate-blog' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "topic": "Test Blog Topic"
  }'
```

### 3. Set Environment Variables (If Not Set)

The function needs `LOVABLE_API_KEY`:

```bash
# Set the secret
supabase secrets set LOVABLE_API_KEY=your_api_key_here
```

### 4. Grant Permissions

Ensure authenticated users can call the function:

1. Go to Supabase Dashboard
2. Navigate to Database → RLS Policies
3. The function uses the `Authorization` header, so authenticated users should automatically have access

## Testing in Production

### Option 1: Via Admin Panel
1. Go to your deployed site
2. Log in as admin
3. Navigate to `/admin`
4. Click "Blogs" tab
5. Generate a test blog

### Option 2: Via cURL

```bash
# Get your auth token first
# Login to your site and check browser dev tools → Application → Local Storage
# Copy the "sb-access-token"

curl -X POST 'https://jimfuknlntcqgtqfwcod.supabase.co/functions/v1/generate-blog' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "topic": "How to Write an IB History IA",
    "style": "Educational and comprehensive",
    "targetUrl": "https://example.com/reference"
  }'
```

## Troubleshooting

### Function Not Found (404)
```bash
# List all deployed functions
supabase functions list

# Redeploy
supabase functions deploy generate-blog
```

### Authorization Error (401)
- Verify your access token is valid
- Check if you're logged in as admin
- Ensure RLS policies allow function access

### AI Generation Error (500)
- Verify LOVABLE_API_KEY is set correctly
- Check function logs:
  ```bash
  supabase functions logs generate-blog
  ```
- Ensure your Lovable AI account has credits

### Rate Limit Error (429)
- Wait a moment and try again
- The AI gateway has rate limits
- Consider implementing request queuing

## Monitoring

### View Function Logs
```bash
# Real-time logs
supabase functions logs generate-blog --tail

# Last 100 logs
supabase functions logs generate-blog --limit 100
```

### Check Function Performance
1. Go to Supabase Dashboard
2. Navigate to Edge Functions
3. Click on `generate-blog`
4. View metrics and logs

## Updating the Function

After making changes to `supabase/functions/generate-blog/index.ts`:

```bash
# Deploy the update
supabase functions deploy generate-blog

# Verify it's updated
supabase functions list
```

## Cost Considerations

### Supabase Edge Functions
- **Free Tier**: 500,000 invocations/month
- **Response Time**: Usually < 2 seconds
- **Cold Start**: First request may take longer

### Lovable AI API
- **Usage**: Each blog generation uses ~2,000-3,000 tokens
- **Cost**: Check your Lovable AI billing
- **Rate Limits**: Depends on your plan

## Security Best Practices

1. **Never commit secrets** to git
   ```bash
   # .gitignore should include:
   .env*
   supabase/.env*
   ```

2. **Rotate API keys** regularly
   ```bash
   supabase secrets set LOVABLE_API_KEY=new_key_here
   ```

3. **Monitor usage** to detect abuse
   - Check Supabase function metrics
   - Set up alerts for unusual activity

4. **Implement rate limiting** (optional)
   ```typescript
   // In your edge function
   const rateLimiter = new Map();
   const MAX_REQUESTS = 10; // per hour
   ```

## Production Checklist

- [ ] Function deployed successfully
- [ ] LOVABLE_API_KEY secret set
- [ ] Test blog generation works
- [ ] Admin authentication working
- [ ] Function logs are accessible
- [ ] Error handling tested
- [ ] Rate limits considered
- [ ] Cost monitoring set up

## Quick Commands Reference

```bash
# Deploy
supabase functions deploy generate-blog

# Logs
supabase functions logs generate-blog --tail

# List functions  
supabase functions list

# Set secret
supabase secrets set LOVABLE_API_KEY=xxx

# List secrets
supabase secrets list
```

## Support

If you encounter issues:
1. Check the [Supabase Edge Functions docs](https://supabase.com/docs/guides/functions)
2. Review function logs for error details
3. Test locally before deploying:
   ```bash
   supabase functions serve generate-blog
   ```

---

**Last Updated**: December 24, 2025
