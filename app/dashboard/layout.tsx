'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isSignedIn, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <SidebarLink
            href="/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            isActive={pathname === '/dashboard'}
          />
          <SidebarLink
            href="/dashboard/projects"
            icon={FileText}
            label="Projects"
            isActive={pathname.startsWith('/dashboard/projects')}
          />
          <SidebarLink
            href="/dashboard/settings"
            icon={Settings}
            label="Settings"
            isActive={pathname.startsWith('/dashboard/settings')}
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
      <div className="lg:hidden border-b border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-900 p-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold gradient-text">
          FolioAI
        </Link>
        <button
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-dark-900 dark:hover:text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-900 p-4 space-y-4">
          <nav className="space-y-1">
            <SidebarLink
              href="/dashboard"
              icon={LayoutDashboard}
              label="Dashboard"
              isActive={pathname === '/dashboard'}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <SidebarLink
              href="/dashboard/projects"
              icon={FileText}
              label="Projects"
              isActive={pathname.startsWith('/dashboard/projects')}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <SidebarLink
              href="/dashboard/settings"
              icon={Settings}
              label="Settings"
              isActive={pathname.startsWith('/dashboard/settings')}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </nav>

          <div className="border-t border-gray-200 dark:border-dark-700 pt-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSignOut();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition font-medium text-left"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

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
  isActive,
  onClick,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
        isActive
          ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600 dark:text-primary-400' : ''}`} />
      <span>{label}</span>
    </Link>
  );
}
