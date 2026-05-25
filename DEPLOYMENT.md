# Deployment Guide

## Deploying to Vercel

FolioAI is optimized for deployment on Vercel, the platform built by the creators of Next.js.

### Prerequisites

- Vercel account (free at https://vercel.com)
- GitHub account with your FolioAI repository
- PostgreSQL database (can use Vercel Postgres, Railway, Supabase, etc.)

### Step 1: Create PostgreSQL Database

Choose one of these options:

#### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel project
2. Navigate to Storage tab
3. Create a Postgres database
4. Copy the `POSTGRES_URL` and set it as `DATABASE_URL`

#### Option B: Railway
1. Go to https://railway.app
2. Create a new PostgreSQL database
3. Copy the connection string

#### Option C: Supabase
1. Go to https://supabase.com
2. Create a new project
3. Copy the connection string with password included

### Step 2: Set Up Clerk Authentication

1. Go to https://clerk.com
2. Create a new application
3. Get your publishable and secret keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

### Step 3: Set Up OpenAI API

1. Go to https://platform.openai.com
2. Create an API key
3. Set as `OPENAI_API_KEY`

### Step 4: Set Up Cloudinary

1. Go to https://cloudinary.com
2. Sign up for a free account
3. Get your credentials:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

### Step 5: Deploy to Vercel

#### Using Vercel Dashboard

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. In Environment Variables, add all credentials from steps 1-4
6. Click Deploy

#### Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add DATABASE_URL
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
vercel env add OPENAI_API_KEY
vercel env add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
vercel env add NEXT_PUBLIC_APP_URL

# Redeploy with environment variables
vercel --prod
```

### Step 6: Run Database Migrations

After deployment:

1. Connect to your Vercel environment:
   ```bash
   vercel env pull
   ```

2. Run migrations:
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

3. Seed initial data (optional):
   ```bash
   npm run prisma:seed
   ```

### Step 7: Configure Clerk Redirect URLs

1. Go to Clerk dashboard
2. Navigate to Your Applications > Settings
3. Set Redirect URLs:
   - Development: `http://localhost:3000`
   - Production: `https://your-vercel-domain.vercel.app`

## Post-Deployment Checklist

- [ ] Environment variables are set correctly
- [ ] Database is connected and migrations are complete
- [ ] Authentication is working (test sign-in/sign-up)
- [ ] AI features are functional
- [ ] Image uploads work with Cloudinary
- [ ] Portfolio pages are accessible at `/[username]`
- [ ] All API endpoints respond correctly

## Monitoring

Monitor your deployment with:

- **Vercel Analytics**: See performance metrics
- **Vercel Logs**: Check server logs in Vercel dashboard
- **Prisma Studio**: Run `npx prisma studio` to inspect database

```bash
# Check production logs
vercel logs
```

## Scaling Considerations

As your application grows:

1. **Database**: Monitor Postgres usage and upgrade if needed
2. **Image Storage**: Cloudinary handles scaling automatically
3. **API Rate Limits**: Monitor OpenAI API usage
4. **Edge Caching**: Enable ISR (Incremental Static Regeneration) for portfolio pages

## Troubleshooting

### Database Connection Issues
```bash
# Test connection locally
npm run prisma:studio

# Check connection string format
postgresql://user:password@host:port/database
```

### Build Failures
```bash
# Rebuild locally
npm run build

# Clear Vercel cache
vercel env pull
vercel --prod --force
```

### Environment Variables Not Loading
- Verify variables are set in Vercel dashboard
- Run `vercel env pull` to sync locally
- Redeploy after adding new variables

## Custom Domain

To add your own domain:

1. Go to Vercel project settings
2. Navigate to Domains
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXT_PUBLIC_APP_URL` in environment variables

## SSL/TLS

Vercel automatically provides free SSL certificates. No additional configuration needed.

## Database Backups

For Vercel Postgres:
- Automatic backups are included
- Access via Vercel dashboard

For other providers, refer to their documentation.

## Performance Optimization

### Enable Image Optimization
Images are already optimized via Next.js Image component.

### Enable CDN Caching
Vercel automatically uses edge network for static assets.

### Monitor Core Web Vitals
Check Vercel Analytics dashboard for performance metrics.

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Clerk Docs: https://clerk.com/docs
- OpenAI Docs: https://platform.openai.com/docs
- Cloudinary Docs: https://cloudinary.com/documentation
