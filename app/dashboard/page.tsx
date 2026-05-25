'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [stats, setStats] = useState({ projects: 0, skills: 0, views: 0 });

  useEffect(() => {
    // Fetch user stats
    const fetchStats = async () => {
      // TODO: Implement actual stats fetching from API
      setStats({ projects: 3, skills: 8, views: 156 });
    };
    fetchStats();
  }, []);

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
                  You've already done this
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
    </div>
  );
}
