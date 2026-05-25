# FolioAI Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface Layer                       │
│  (Next.js React Components, Tailwind CSS, Framer Motion)    │
└────────────┬────────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────────┐
│              API Routes Layer (Next.js)                      │
│  - Authentication (Clerk integration)                       │
│  - Project Management (CRUD)                                │
│  - AI Features (OpenAI integration)                         │
│  - File Uploads (Cloudinary)                                │
│  - Portfolio Data                                           │
└────────────┬────────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────────┐
│              Data Layer (Prisma ORM)                         │
│  - Type-safe database queries                               │
│  - Schema validation                                        │
│  - Migration management                                     │
└────────────┬────────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────────┐
│              PostgreSQL Database                             │
│  - User profiles                                            │
│  - Projects                                                 │
│  - Skills                                                   │
│  - Experience                                               │
│  - Education                                                │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Page Components
- **Landing Page** (`app/page.tsx`) - Marketing landing page
- **Dashboard** (`app/dashboard/page.tsx`) - User dashboard
- **Portfolio Pages** (`app/[username]/page.tsx`) - Public portfolio view
- **Auth Pages** - Sign in/up with Clerk

### Layout Components
- **RootLayout** (`app/layout.tsx`) - Global layout with Clerk provider
- **DashboardLayout** (`app/dashboard/layout.tsx`) - Dashboard layout with sidebar

### UI Components
- **Button** - Reusable button component
- **Card** - Card container with header, title, description, content
- **Input** - Text input component
- **TextArea** - Multi-line text input

### Features Components
- **Navbar** - Navigation component
- **LoadingSkeleton** - Loading placeholder components
- **Animations** - Framer Motion animation utilities

## Data Flow

### User Authentication Flow
```
User → Sign Up/In Page → Clerk Auth → API Route → Prisma → DB → Dashboard
```

### Project Creation Flow
```
User → Dashboard → New Project Form → API Route → Validate (Zod) → Prisma → DB
```

### Portfolio Display Flow
```
Public URL → [username] Page → Fetch API → Get Portfolio Data → Render
```

### AI Optimization Flow
```
User → Dashboard → AI Feature → API Route → OpenAI API → Response → UI
```

## Database Schema

### User Model
```prisma
model User {
  id            String
  clerkId       String (unique)
  email         String (unique)
  name          String
  username      String (unique)
  bio           String?
  headline      String?
  profileImage  String?
  resumeUrl     String?
  theme         String (minimal|dark)
  projects      Project[]
  skills        Skill[]
  education     Education[]
  experience    Experience[]
}
```

### Project Model
```prisma
model Project {
  id          String
  userId      String
  user        User
  title       String
  description String
  imageUrl    String?
  githubUrl   String?
  liveUrl     String?
  order       Int
  createdAt   DateTime
  updatedAt   DateTime
}
```

### Relationships
- User has many Projects (1:N)
- User has many Skills (1:N)
- User has many Education (1:N)
- User has many Experience (1:N)

All relations use CASCADE delete for data integrity.

## API Endpoints Structure

```
/api/
├── portfolio/
│   └── [username]/route.ts      # GET: Get public portfolio
├── projects/
│   └── route.ts                 # GET: List, POST: Create
├── ai/
│   └── optimize/route.ts        # POST: AI features
└── uploads/
    └── resume/route.ts          # POST: Resume upload
```

## Authentication Flow

1. User lands on application
2. Clicks "Sign Up" or "Sign In"
3. Redirected to Clerk authentication page
4. After auth, user redirected to `/dashboard`
5. Middleware verifies Clerk session
6. All API routes protected with `auth()` check
7. Public portfolio pages accessible without auth

## File Organization Best Practices

### Components
```
components/
├── ui/                  # Basic UI components
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
├── navbar.tsx           # Layout components
├── animations.tsx       # Animation utilities
└── loading-skeleton.tsx # Loading states
```

### API Routes
```
app/api/
├── projects/
│   ├── route.ts         # GET, POST
│   └── [id]/route.ts    # GET, PUT, DELETE
├── ai/
│   └── optimize/route.ts
└── uploads/
    └── resume/route.ts
```

### Pages
```
app/
├── page.tsx             # Landing
├── dashboard/
│   ├── page.tsx         # Dashboard home
│   ├── projects/
│   ├── settings/
│   └── layout.tsx
├── [username]/
│   └── page.tsx         # Public portfolio
└── sign-in|sign-up/
    └── page.tsx
```

## Deployment Architecture

```
┌─────────────┐
│  Vercel     │  ← Hosting
└──────┬──────┘
       │
┌──────▼──────────────────────────────┐
│    Next.js Application              │
│  - Frontend                         │
│  - API Routes                       │
│  - Server Components                │
└──────┬──────────────────────────────┘
       │
  ┌────┴────┬──────────┬───────────┐
  │          │          │           │
┌─▼──┐  ┌───▼───┐  ┌──▼───┐   ┌─▼──────┐
│ DB │  │Clerk  │  │OpenAI│   │CloudinaryV
└────┘  └───────┘  └──────┘   └────────┘
```

## Performance Optimization

### Frontend
- **Next.js Image**: Optimized image delivery
- **Dynamic Imports**: Code splitting
- **Server Components**: Reduce client bundle
- **Framer Motion**: Hardware-accelerated animations

### Backend
- **API Caching**: Cache portfolio data at CDN level
- **Database Indexes**: Faster queries
- **Connection Pooling**: Efficient DB connections
- **Compression**: Gzip response compression

### Database
- **Indexes**: On userId, username
- **Pagination**: Handle large datasets
- **Lazy Loading**: Load related data on demand

## Security Measures

1. **Authentication**: Clerk handles user sessions
2. **Authorization**: Middleware checks auth on protected routes
3. **Input Validation**: Zod validates all inputs
4. **SQL Injection Prevention**: Prisma parameterized queries
5. **HTTPS/TLS**: Enforced by Vercel
6. **Environment Variables**: Secrets not exposed in code
7. **CORS**: Limited to application domain
8. **Rate Limiting**: On AI endpoints (OpenAI limits)

## Error Handling

### API Errors
- Try-catch blocks on all routes
- Appropriate HTTP status codes
- User-friendly error messages
- Logging for debugging

### Client Errors
- Form validation with Zod
- User feedback with Sonner toasts
- Loading states during requests
- Error boundaries for React

## Future Enhancements

1. **Caching**: Implement Redis for session/data caching
2. **WebSockets**: Real-time notifications
3. **Analytics**: Track portfolio views
4. **Search**: Full-text search on portfolios
5. **AI Improvements**: Multiple AI providers
6. **Team Features**: Collaborative portfolios
7. **Custom Domains**: Domain mapping
8. **API Keys**: Third-party integrations
