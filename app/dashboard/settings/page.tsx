'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  const { user } = useUser();
  const [theme, setTheme] = useState('minimal');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your portfolio and account preferences.
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={user?.emailAddresses[0]?.emailAddress || ''}
              readOnly
              className="input mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Display Name</label>
            <input
              type="text"
              defaultValue={user?.firstName}
              className="input mt-1"
            />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Theme Section */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Theme</CardTitle>
          <CardDescription>
            Choose how your portfolio looks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { id: 'minimal', name: 'Minimal', description: 'Clean and simple design' },
              { id: 'dark', name: 'Modern Dark', description: 'Modern dark theme' },
            ].map(themeOption => (
              <div
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  theme === themeOption.id
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-dark-700'
                }`}
              >
                <div className="font-semibold">{themeOption.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {themeOption.description}
                </div>
              </div>
            ))}
          </div>
          <Button>Save Theme</Button>
        </CardContent>
      </Card>

      {/* Resume Section */}
      <Card>
        <CardHeader>
          <CardTitle>Resume</CardTitle>
          <CardDescription>
            Upload your resume for AI optimization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Drag and drop your resume (PDF or DOCX) here, or click to select a file
            </p>
            <Button variant="outline">Select File</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
