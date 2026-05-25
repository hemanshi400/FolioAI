# Getting Started with FolioAI

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials for:
- PostgreSQL database URL
- Clerk authentication keys
- OpenAI API key
- Cloudinary credentials

### 3. Set Up Database
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed  # Optional: Add sample data
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features Overview

### For Users
- **Sign Up**: Create account with Google or email via Clerk
- **Resume Upload**: Upload PDF/DOCX to auto-fill profile
- **Dashboard**: Manage projects, skills, and portfolio settings
- **AI Optimization**: Improve bio, rewrite descriptions with AI
- **Portfolio Preview**: See how your portfolio looks
- **Share Portfolio**: Get a unique URL to share your portfolio

### For Developers
- Type-safe API routes with TypeScript
- Prisma ORM for database operations
- Zod validation for request data
- Framer Motion animations
- Tailwind CSS styling
- Server components for better performance

## Project Walkthrough

### Landing Page (`/`)
- Hero section with call-to-action
- Features overview
- How it works section
- Pricing information
- Footer

### Authentication
- Sign up at `/sign-up`
- Sign in at `/sign-in`
- Powered by Clerk
- Redirects to dashboard on success

### Dashboard (`/dashboard`)
- Welcome message with statistics
- Quick start checklist
- Navigation to projects and settings

### Projects Management (`/dashboard/projects`)
- List all user projects
- Create new project (`/dashboard/projects/new`)
- Edit project details
- Delete project

### Settings (`/dashboard/settings`)
- Update profile information
- Change portfolio theme
- Upload resume

### Public Portfolio (`/[username]`)
- Display user portfolio publicly
- Shows all sections (about, skills, projects, etc.)
- Beautiful responsive design
- SEO optimized

## Key Technologies

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **React Hook Form**: Form management
- **Zod**: Validation

### Backend
- **Next.js API Routes**: Serverless functions
- **Prisma**: ORM for database
- **Clerk**: Authentication
- **OpenAI API**: AI features
- **Cloudinary**: Image storage

### Database
- **PostgreSQL**: Primary database
- **Prisma**: Query builder and schema manager

## Development Tips

### Using TypeScript
All files should be `.ts` or `.tsx`. Define types in `lib/types.ts`:
```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
}
```

### Creating API Routes
Create files in `app/api/` with `route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ success: true });
}
```

### Using Prisma
Query database from API routes:
```typescript
import { prisma } from '@/lib/prisma';

const projects = await prisma.project.findMany({
  where: { userId: '...' },
});
```

### Styling Components
Use Tailwind CSS classes:
```tsx
<div className="bg-white dark:bg-dark-900 p-6 rounded-lg">
  <h1 className="text-3xl font-bold mb-4">Title</h1>
</div>
```

### Adding Animations
Use Framer Motion for animations:
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## Common Development Tasks

### Adding a New Page
1. Create folder under `app/`
2. Create `page.tsx` with default export
3. Add TypeScript types
4. Use Tailwind for styling

### Creating a New API Endpoint
1. Create folder under `app/api/`
2. Create `route.ts` with GET/POST functions
3. Validate request with Zod
4. Use Prisma for database operations
5. Return proper status codes

### Updating Database Schema
1. Modify `prisma/schema.prisma`
2. Run `npm run prisma:migrate`
3. Run `npm run prisma:generate`
4. Update types in `lib/types.ts`

### Testing API Endpoints
```bash
# Test with curl
curl http://localhost:3000/api/projects

# Or use Postman/Insomnia
# Add Authorization header with Clerk token
```

### Using Prisma Studio
```bash
npm run prisma:studio
```
Opens browser interface to view and edit database data.

## Troubleshooting

### Database Connection Failed
- Check `DATABASE_URL` in `.env.local`
- Ensure PostgreSQL is running
- Verify connection string format

### Clerk Authentication Not Working
- Check `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
- Verify redirect URLs in Clerk dashboard
- Clear browser cookies

### API Endpoints Returning 401
- Verify user is authenticated
- Check Clerk middleware configuration
- Ensure JWT token is valid

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Run `npm run prisma:generate`

## Next Steps

1. **Customize Landing Page**: Edit `app/page.tsx`
2. **Update Brand Colors**: Modify `tailwind.config.ts`
3. **Add More Themes**: Create theme components
4. **Implement Analytics**: Add page view tracking
5. **Deploy to Vercel**: See `DEPLOYMENT.md`

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## Support

For issues or questions, check the README.md or create an issue on GitHub.
