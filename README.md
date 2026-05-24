# FolioAI

A modern SaaS application that automatically generates professional personal portfolio websites using AI. Users can upload their resume, add project details, and get a beautiful portfolio website instantly.

## Features

- **Authentication**: Secure login with Google and email via Clerk
- **Resume Upload & Parsing**: Extract skills, education, and experience from resumes
- **Project Management**: Add and showcase your best projects
- **AI Optimization**: Use OpenAI to improve bios, rewrite descriptions, generate headlines
- **Portfolio Generation**: Automatic beautiful public portfolio pages
- **Theme Switching**: Choose between multiple professional themes
- **Responsive Design**: Mobile-friendly with smooth animations
- **SEO Optimized**: Built for search engine visibility

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **AI**: OpenAI API
- **File Uploads**: Cloudinary
- **UI Animations**: Framer Motion
- **Form Validation**: React Hook Form + Zod
- **UI Components**: shadcn/ui, Lucide Icons

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Clerk account for authentication
- OpenAI API key
- Cloudinary account for image uploads

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd folioai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your credentials:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: From Clerk dashboard
   - `CLERK_SECRET_KEY`: From Clerk dashboard
   - `OPENAI_API_KEY`: From OpenAI platform
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: From Cloudinary
   - `CLOUDINARY_API_KEY`: From Cloudinary
   - `CLOUDINARY_API_SECRET`: From Cloudinary

4. **Set up the database**
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
folioai/
├── app/
│   ├── api/                    # API routes
│   │   ├── ai/                # AI optimization endpoints
│   │   ├── projects/          # Project management
│   │   ├── uploads/           # File uploads
│   │   └── portfolio/         # Portfolio data endpoints
│   ├── dashboard/             # User dashboard
│   ├── [username]/            # Public portfolio pages
│   ├── sign-in/              # Authentication pages
│   ├── sign-up/
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles
├── components/               # Reusable React components
│   ├── ui/                   # UI components
│   └── navbar.tsx            # Navigation component
├── lib/                      # Utility functions
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
└── package.json
```

## Key Components

### Dashboard
- User profile management
- Resume upload interface
- Project management (CRUD)
- Theme selection
- Portfolio preview

### Portfolio Pages
- Dynamic routes for each user (`/username`)
- Responsive design
- Multiple theme options
- SEO optimized meta tags

### API Routes
- `/api/projects` - Project CRUD operations
- `/api/ai/optimize` - AI optimization features
- `/api/uploads/resume` - Resume upload and parsing
- `/api/portfolio/[username]` - Portfolio data retrieval

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/folioai

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

# OpenAI
OPENAI_API_KEY=your_openai_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Database Schema

The Prisma schema includes:
- **User**: Stores user profile information
- **Project**: User projects with metadata
- **Skill**: Skills associated with users
- **Education**: Educational background
- **Experience**: Work experience

## Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
# Or deploy via CLI
vercel
```

### Set up Database

Update `DATABASE_URL` to your production PostgreSQL database:
```bash
vercel env add DATABASE_URL
```

## Development Guidelines

- Use TypeScript for type safety
- Follow ESLint rules
- Keep components small and reusable
- Use Tailwind CSS for styling
- Implement proper error handling
- Add loading states
- Test responsive design

## Future Enhancements

- [ ] Analytics dashboard
- [ ] Multiple portfolio templates
- [ ] Social media integration
- [ ] Domain customization
- [ ] Portfolio analytics
- [ ] Team features for agencies
- [ ] Export as PDF

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
