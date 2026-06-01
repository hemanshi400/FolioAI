'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [stats, setStats] = useState({ projects: 0, skills: 0, views: 0 });
  const [portfolioReady, setPortfolioReady] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      setStats({ projects: 3, skills: 8, views: 156 });
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (!isLoaded || !user) return;
    const username = user.username || user.id;
    const ready = typeof window !== 'undefined' && localStorage.getItem('folioaiPortfolioReady') === 'true';
    setPortfolioReady(!!username && ready);

    if (username && typeof window !== 'undefined') {
      setPortfolioUrl(`${window.location.origin}/${username}`);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!portfolioReady) {
      router.push('/dashboard/onboarding');
    }
  }, [isLoaded, user, portfolioReady, router]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.firstName}!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your portfolio and watch your career grow.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.projects}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add more to showcase your best work
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.skills}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Highlight your expertise
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.views}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>
            Complete these steps to set up your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold">
                ✓
              </div>
              <div>
                <p className="font-medium">Create your account</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You&apos;ve already done this
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <p className="font-medium">Upload your resume</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Let AI extract your experience
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <p className="font-medium">Add your projects</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showcase your best work
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Make your portfolio</CardTitle>
          <CardDescription>
            Upload your resume, add projects, and get a shareable link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {portfolioReady ? (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Your portfolio is ready. Share the link with recruiters and clients.
              </p>
              <div className="rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 p-4">
                <p className="text-sm text-gray-500 mb-2">Portfolio URL</p>
                <p className="font-medium text-primary-700 dark:text-primary-300 break-all">
                  {portfolioUrl}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => window.open(portfolioUrl, '_blank')}>
                  View Portfolio
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(portfolioUrl)}
                >
                  Copy Link
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Start building your portfolio now. The next step is to upload your resume and add your projects.
              </p>
              <Link
                href="/dashboard/onboarding"
                className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-3 text-white hover:bg-primary-700 transition"
              >
                Start setup
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
