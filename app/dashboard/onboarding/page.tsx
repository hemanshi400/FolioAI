'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, CheckCircle } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [uploadedResume, setUploadedResume] = useState(false);

  const handleResumeUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/uploads/resume', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Auto-fill profile with parsed data
        setUploadedResume(true);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleResumeUpload(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome to FolioAI!</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Let's set up your portfolio. We'll guide you through three simple steps.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex gap-4">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex-1">
            <div
              className={`h-2 rounded-full transition-colors ${
                s <= step ? 'bg-primary-600' : 'bg-gray-200 dark:bg-dark-700'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Step 1: Upload Resume */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Upload Your Resume</CardTitle>
            <CardDescription>
              Upload your resume in PDF or DOCX format. We'll automatically extract your
              information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg p-12 text-center">
              <FileUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Drag and drop your resume here, or click to select
              </p>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload">
                <Button as="span" variant="outline">
                  Select Resume
                </Button>
              </label>
            </div>

            {uploadedResume && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-300">
                    Resume uploaded successfully!
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    We've extracted your information. Review and continue.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                onClick={() => setStep(2)}
                disabled={!uploadedResume}
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Add Projects */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Add Your Projects</CardTitle>
            <CardDescription>
              Showcase your best projects. You can add more later.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-blue-900 dark:text-blue-300">
                You can skip this for now and add projects from your dashboard.
              </p>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setStep(3)} className="flex-1">
                Continue
              </Button>
              <Button variant="outline" onClick={() => setStep(3)}>
                Skip for Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Choose Theme */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Choose a Theme</CardTitle>
            <CardDescription>
              Select how your portfolio should look. You can change it anytime.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  id: 'minimal',
                  name: 'Minimal',
                  description: 'Clean and simple design',
                },
                {
                  id: 'dark',
                  name: 'Modern Dark',
                  description: 'Dark theme with modern aesthetics',
                },
              ].map(theme => (
                <div
                  key={theme.id}
                  className="border-2 border-gray-200 dark:border-dark-700 rounded-lg p-4 cursor-pointer hover:border-primary-600 transition"
                >
                  <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-600 rounded mb-3" />
                  <p className="font-semibold">{theme.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {theme.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => router.push('/dashboard')}
                className="flex-1"
              >
                Get Started
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
