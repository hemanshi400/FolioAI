import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'FolioAI - AI-Powered Portfolio Builder',
  description:
    'Create a professional portfolio in minutes with AI-powered optimization. Upload your resume, add projects, and let FolioAI generate your perfect portfolio.',
  keywords: [
    'portfolio',
    'AI',
    'resume',
    'web builder',
    'personal website',
    'career',
  ],
  openGraph: {
    title: 'FolioAI - AI-Powered Portfolio Builder',
    description: 'Create a professional portfolio in minutes with AI.',
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
};

const clerkConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
  process.env.CLERK_SECRET_KEY
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layoutContent = (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-dark-900 text-dark-900 dark:text-white transition-colors">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );

  return clerkConfigured ? (
    <ClerkProvider>
      {layoutContent}
    </ClerkProvider>
  ) : (
    layoutContent
  );
}

