<!-- Use this file to provide workspace-specific custom instructions to Copilot. -->

# FolioAI Project Guidelines

## Project Overview
FolioAI is a modern SaaS application that automatically generates professional personal portfolio websites. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Technology Stack
- **Frontend**: Next.js 15 with App Router, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes with Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **AI**: OpenAI API (Claude 3.5 Sonnet)
- **File Uploads**: Cloudinary
- **UI**: shadcn/ui components, Lucide icons, Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner

## Project Structure
```
app/
├── api/                    # API routes
│   ├── ai/                # AI optimization
│   ├── projects/          # Project CRUD
│   ├── uploads/           # File uploads
│   └── portfolio/         # Public portfolio data
├── dashboard/             # User dashboard pages
├── [username]/            # Public portfolio pages
├── sign-in/              # Auth pages
├── sign-up/
├── layout.tsx            # Root layout
└── page.tsx              # Landing page

components/
├── ui/                   # UI components
├── navbar.tsx            # Navigation
├── animations.tsx        # Framer Motion animations
└── loading-skeleton.tsx   # Loading skeletons

lib/
├── utils.ts              # Utility functions
├── types.ts              # TypeScript types
├── prisma.ts             # Prisma client
├── helpers.ts            # Helper functions
├── validations.ts        # Zod schemas
└── metadata.ts           # SEO metadata

prisma/
├── schema.prisma         # Database schema
└── seed.ts               # Seed data
```

## Code Standards

### TypeScript
- Always use TypeScript for type safety
- Define types in `lib/types.ts` for shared types
- Use proper types for all function parameters and returns

### Styling
- Use Tailwind CSS utility classes
- Keep custom CSS in global.css
- Follow the color scheme defined in tailwind.config.ts
- Use CSS variables for themes

### Components
- Keep components small and focused
- Use functional components with hooks
- Extract reusable components to `components/` directory
- Name components with PascalCase
- Use TypeScript for prop types

### Forms
- Use React Hook Form for form state management
- Validate with Zod schemas in `lib/validations.ts`
- Show validation errors to users
- Implement loading states during submission

### API Routes
- Use Next.js API routes in `app/api/`
- Always check authentication with Clerk `auth()`
- Return proper HTTP status codes
- Handle errors gracefully with try-catch
- Validate request data with Zod schemas

### Database
- Use Prisma for all database operations
- Define models in `prisma/schema.prisma`
- Run migrations with `npm run prisma:migrate`
- Use the Prisma client from `lib/prisma.ts`

## Development Workflow

### Running Locally
```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

### Database Management
```bash
npm run prisma:studio      # Open Prisma Studio
npm run prisma:seed        # Seed test data
```

### Linting & Formatting
```bash
npm run lint               # Run ESLint
```

### Building
```bash
npm run build              # Production build
npm start                  # Start server
```

## Best Practices

### Performance
- Use Server Components where possible
- Implement proper loading states
- Optimize images with Next.js Image component
- Use dynamic imports for large components

### Security
- Always validate user input with Zod
- Check authentication before sensitive operations
- Use HTTPS for all external APIs
- Never expose secrets in client-side code

### Accessibility
- Use semantic HTML elements
- Add proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

### SEO
- Set proper meta tags using `lib/metadata.ts`
- Use descriptive page titles
- Add schema markup for structured data
- Ensure fast page load times

## Common Tasks

### Adding a New API Endpoint
1. Create file in `app/api/[feature]/route.ts`
2. Export `GET`, `POST`, `PUT`, `DELETE` functions
3. Use Clerk `auth()` to check authentication
4. Validate request with Zod schema
5. Return proper status codes

### Creating a New Page
1. Create folder in `app/[feature]/`
2. Create `page.tsx` file
3. Export default component
4. Add proper TypeScript types
5. Set metadata if needed

### Adding a New Component
1. Create file in `components/`
2. Use functional component with hooks
3. Export component with proper types
4. Add JSDoc comments for complex logic
5. Reuse existing UI components

### Adding Database Model
1. Add model to `prisma/schema.prisma`
2. Run `npm run prisma:migrate`
3. Update Prisma client with `npm run prisma:generate`
4. Create API routes for CRUD operations
5. Add TypeScript types in `lib/types.ts`

## Environment Variables
All environment variables should be defined in `.env.example` and used from `process.env`.

### Required Variables
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `OPENAI_API_KEY` - OpenAI API key
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `NEXT_PUBLIC_APP_URL` - Application URL

## Testing Guidelines
- Test API endpoints with Postman or curl
- Test authentication flows in different scenarios
- Test portfolio pages with different user data
- Test responsive design on mobile devices
- Test database operations with Prisma Studio

## Deployment
See `DEPLOYMENT.md` for detailed deployment instructions.

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev)

## Git Workflow
- Create feature branches from `main`
- Use descriptive commit messages
- Keep commits small and focused
- Create pull requests for review before merging

## Support & Questions
For questions or issues, refer to the documentation or project README.
