# FolioAI Troubleshooting Guide

## Common Issues and Solutions

### Installation & Setup

#### Issue: `npm install` fails with dependency conflicts
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Issue: PostgreSQL connection string not working
**Solution:**
1. Verify PostgreSQL is running
2. Check connection string format:
   ```
   postgresql://username:password@localhost:5432/database_name
   ```
3. Test connection:
   ```bash
   psql postgresql://username:password@localhost:5432/database_name -c "SELECT 1"
   ```

#### Issue: Prisma client generation fails
**Solution:**
```bash
# Remove Prisma cache
rm -rf node_modules/.prisma

# Regenerate
npm run prisma:generate
```

### Development Server

#### Issue: `npm run dev` starts but pages show 404
**Solution:**
1. Clear Next.js cache:
   ```bash
   rm -rf .next
   ```
2. Restart dev server
3. Check file paths match routes

#### Issue: Hot reload not working
**Solution:**
1. Clear `.next` folder
2. Kill dev server process completely
3. Restart with `npm run dev`

#### Issue: Cannot connect to localhost:3000
**Solution:**
1. Check if port 3000 is in use:
   ```bash
   lsof -i :3000  # macOS/Linux
   netstat -ano | findstr :3000  # Windows
   ```
2. Kill process on port 3000
3. Try different port: `npm run dev -- -p 3001`

### Database Issues

#### Issue: Migration fails with "Cannot find migration"
**Solution:**
```bash
# Reset database (caution: deletes data)
npm run prisma:migrate reset

# Or manually create migration
npm run prisma:migrate -- --name add_new_field
```

#### Issue: Prisma Studio won't open
**Solution:**
```bash
# Install browser-like dependencies
npm install

# Try again
npm run prisma:studio

# If still fails, check if port 5555 is available
```

#### Issue: "Column 'X' does not exist" error
**Solution:**
1. Check if schema is deployed to database
2. Run migrations:
   ```bash
   npm run prisma:migrate
   ```
3. Regenerate client:
   ```bash
   npm run prisma:generate
   ```

### Authentication Issues

#### Issue: Clerk authentication not working
**Solution:**
1. Verify environment variables:
   ```bash
   echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   echo $CLERK_SECRET_KEY
   ```
2. Check Clerk dashboard for correct keys
3. Verify redirect URLs in Clerk settings
4. Clear browser cookies and try again

#### Issue: "Redirected to sign-in after successful auth"
**Solution:**
1. Check middleware.ts configuration
2. Verify sign-in/sign-up routes are public
3. Check redirect URL matches Clerk config
4. Clear browser cache

#### Issue: Session not persisting after page refresh
**Solution:**
1. Check if localStorage is enabled
2. Verify Clerk provider wraps entire app
3. Check browser cookie settings
4. Try in incognito mode to rule out extensions

### API Endpoints

#### Issue: API returns 401 Unauthorized
**Solution:**
1. Verify user is authenticated
2. Check Clerk middleware is loaded
3. Ensure `auth()` is called at route start
4. Verify JWT token is valid

#### Issue: "CORS error" when calling API
**Solution:**
1. Check CORS configuration
2. Verify request headers
3. Use relative URLs: `/api/...` instead of `http://localhost:3000/api/...`
4. For cross-origin, add CORS headers to API routes

#### Issue: 500 Internal Server Error
**Solution:**
1. Check server logs in terminal
2. Add try-catch error handling
3. Verify database connection
4. Check environment variables

### AI Features

#### Issue: OpenAI API returns 401
**Solution:**
1. Verify `OPENAI_API_KEY` is correct
2. Check API key hasn't expired
3. Verify API key has sufficient credits
4. Ensure key is for correct organization

#### Issue: AI requests timeout
**Solution:**
1. Increase request timeout in API route:
   ```typescript
   const timeout = 30000; // 30 seconds
   ```
2. Check OpenAI API status
3. Reduce prompt complexity
4. Add retry logic

#### Issue: No response from Claude API
**Solution:**
```typescript
// Add error handling
try {
  const message = await openai.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });
} catch (error) {
  console.error('Claude API error:', error);
}
```

### File Uploads

#### Issue: File upload to Cloudinary fails
**Solution:**
1. Verify Cloudinary credentials
2. Check file size limits
3. Verify file format is allowed
4. Check Cloudinary quota

#### Issue: Resume parsing not extracting data
**Solution:**
1. Ensure resume format is supported (PDF/DOCX)
2. Check if resume has readable text
3. Scanned PDFs may not work - require OCR
4. Implement fallback manual entry

### Frontend Issues

#### Issue: Styles not applying (Tailwind)
**Solution:**
1. Verify file paths in `tailwind.config.ts`
2. Check if you're in app or pages directory
3. Restart dev server after config changes
4. Clear build cache: `rm -rf .next`

#### Issue: Animations not working (Framer Motion)
**Solution:**
1. Verify Framer Motion is installed
2. Check component is marked with `'use client'`
3. Verify initial and animate props
4. Check for conflicting CSS transitions

#### Issue: Dark mode not working
**Solution:**
1. Verify `tailwind.config.ts` has dark mode enabled
2. Check if HTML has `dark` class
3. Use `useEffect` to update class on client
4. Check localStorage for theme preference

### Form Validation

#### Issue: Zod validation not triggering
**Solution:**
1. Ensure schema is imported correctly
2. Verify `.parse()` is called
3. Add error logging to see validation errors
4. Check field names match schema

#### Issue: Form not submitting
**Solution:**
1. Check for validation errors in console
2. Verify form data matches API expectations
3. Check network tab for failed requests
4. Add loading state to prevent double submission

### Build & Deployment

#### Issue: Build fails locally
**Solution:**
```bash
# Clear build cache
rm -rf .next out

# Run full build
npm run build

# Check TypeScript errors
npx tsc --noEmit

# Run ESLint
npm run lint
```

#### Issue: Vercel deployment fails
**Solution:**
1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Run local build first: `npm run build`
4. Check for missing dependencies

#### Issue: Build succeeds but 500 errors in production
**Solution:**
1. Check Vercel logs for errors
2. Verify environment variables match production
3. Check database connection string
4. Run migrations on production database

### Performance Issues

#### Issue: Page loads slowly
**Solution:**
1. Check Core Web Vitals in Vercel Analytics
2. Optimize images with Next.js Image
3. Use dynamic imports for heavy components
4. Check for N+1 queries in Prisma

#### Issue: API response is slow
**Solution:**
1. Add database indexes
2. Use pagination for large datasets
3. Cache frequently accessed data
4. Check for blocking operations

### Browser Issues

#### Issue: Works in Chrome but not Safari
**Solution:**
1. Check for polyfills needed
2. Test with different browser versions
3. Check localStorage availability
4. Verify CSS compatibility

#### Issue: Mobile responsive design broken
**Solution:**
1. Verify viewport meta tag in head
2. Test with actual device, not just DevTools
3. Check for fixed widths (use max-width)
4. Test Touch events work properly

### Data Issues

#### Issue: Data not persisting between sessions
**Solution:**
1. Verify database operations are awaited
2. Check transaction handling
3. Verify data is actually saved to database
4. Check for silent errors in try-catch

#### Issue: Duplicate data in database
**Solution:**
1. Add unique constraints to schema
2. Check for race conditions
3. Implement idempotency
4. Clean up duplicates and add unique index

## Debugging Tips

### Enable Debug Logging
```typescript
// In API routes
console.log('Debug:', { userId, data });

// In components
console.log('Render with props:', props);
```

### Check Environment Variables
```bash
# List all env vars
printenv | grep NEXT_PUBLIC  # public vars
```

### Database Debugging
```bash
# Open Prisma Studio
npm run prisma:studio

# Check schema
npx prisma db inspect
```

### Network Debugging
1. Open DevTools → Network tab
2. Make request and check:
   - Status code
   - Response body
   - Request headers
3. Check for CORS errors

### React Debugging
1. Install React DevTools extension
2. Check component state and props
3. Look for unnecessary re-renders
4. Use Profiler to check performance

## Performance Optimization

### Reduce Build Size
```bash
# Analyze bundle
npm install --save-dev @next/bundle-analyzer
```

### Database Query Optimization
```typescript
// Good: Load related data in one query
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: { projects: true, skills: true },
});

// Avoid: N+1 queries
const users = await prisma.user.findMany();
for (const user of users) {
  user.projects = await prisma.project.findMany({ where: { userId: user.id } });
}
```

### API Response Caching
```typescript
export async function GET(request: NextRequest) {
  // Cache for 60 seconds
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=60' },
  });
}
```

## Getting Help

1. **Check Documentation**: README.md, GETTING_STARTED.md
2. **Search GitHub Issues**: Existing solutions
3. **Stack Overflow**: General web development questions
4. **Framework Docs**: Next.js, Prisma, Clerk docs
5. **Community Discord**: Next.js, TypeScript communities

## Reporting Bugs

When reporting issues, include:
1. Error message and stack trace
2. Steps to reproduce
3. Browser/Node version
4. Environment variables (without secrets)
5. Screenshots if UI issue
