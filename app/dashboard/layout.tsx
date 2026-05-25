'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isSignedIn, signOut } = useAuth();
  const router = useRouter();

  if (!isSignedIn) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-950">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-dark-900 border-r border-gray-200 dark:border-dark-700 p-6 hidden lg:block">
        <Link href="/dashboard" className="text-2xl font-bold gradient-text mb-8 block">
          FolioAI
        </Link>

        <nav className="space-y-2">
          <SidebarLink href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarLink
            href="/dashboard/projects"
            icon={FileText}
            label="Projects"
          />
          <SidebarLink
            href="/dashboard/settings"
            icon={Settings}
            label="Settings"
          />
        </nav>

        <button
          onClick={handleSignOut}
          className="w-full mt-auto flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden border-b border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-900 p-4">
        <Link href="/dashboard" className="text-2xl font-bold gradient-text">
          FolioAI
        </Link>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800 transition"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
}
