'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, CheckCircle, Plus, ArrowRight } from 'lucide-react';

interface ProjectDraft {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl?: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [step, setStep] = useState(1);
  const [uploadedResume, setUploadedResume] = useState(false);
  const [projects, setProjects] = useState<ProjectDraft[]>([
    { title: '', description: '', githubUrl: '', liveUrl: '' },
  ]);
  const [theme, setTheme] = useState<'minimal' | 'dark'>('minimal');
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState('');

  useEffect(() => {
    if (!isLoaded || !user) return;
    const username = user.username || user.id;
    if (typeof window !== 'undefined' && username) {
      setPortfolioUrl(`${window.location.origin}/${username}`);
    }
  }, [isLoaded, user]);

  const handleResumeUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/uploads/resume', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
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

  const updateProject = (index: number, field: keyof ProjectDraft, value: string) => {
    setProjects(current =>
      current.map((project, idx) =>
        idx === index ? { ...project, [field]: value } : project
      )
    );
  };

  const handleProjectImageChange = (index: number, file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setProjects(current =>
        current.map((p, idx) => (idx === index ? { ...p, imageUrl: result } : p))
      );
    };
    reader.readAsDataURL(file);
  };

  const addProject = () => {
    setProjects(current => [...current, { title: '', description: '', githubUrl: '', liveUrl: '' }]);
  };

  const canContinueToProjects = uploadedResume;
  const hasProject = projects.some(project => project.title.trim().length > 0);
  const canComplete = uploadedResume && hasProject;

  const finishOnboarding = () => {
    if (!user) return;
    const username = user.username || user.id;

    const portfolioData = {
      name: user.fullName || user.firstName || 'Your Name',
      headline: 'Professional Portfolio',
      bio: 'A polished portfolio showcasing my resume, skills, and projects.',
      profileImage: (user as any).imageUrl || undefined,
      skills: [],
      projects: projects
        .filter(project => project.title.trim())
        .map((project, index) => ({
          id: `project-${index + 1}`,
          ...project,
        })),
      experience: [],
      education: [],
      theme,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('folioaiPortfolioReady', 'true');
      localStorage.setItem(`folioai-portfolio-${username}`, JSON.stringify(portfolioData));
      setCompleted(true);
    }
  };

  const copyLink = async () => {
    if (!portfolioUrl) return;
    await navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Make your portfolio</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Upload your resume, add projects, and get a portfolio link that matches your brand.
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {[
          { label: 'Upload resume', active: step === 1 },
          { label: 'Add projects', active: step === 2 },
          { label: 'Finalize', active: step === 3 },
        ].map((item, index) => (
          <div
            key={item.label}
            className={`min-w-[160px] rounded-2xl p-4 border ${
              item.active ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/30' : 'border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-900'
            }`}
          >
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Step {index + 1}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Resume</CardTitle>
            <CardDescription>
              Share your resume as PDF or DOCX so FolioAI can prepare your portfolio content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg p-12 text-center">
              <FileUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Drag and drop your resume here, or click to select a file.
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
              <div className="rounded-2xl border border-green-200 bg-green-50 p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-semibold text-green-900">Resume uploaded</p>
                  <p className="text-sm text-green-700">We can now use this information to generate your portfolio.</p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                className="flex-1"
                disabled={!canContinueToProjects}
                onClick={() => setStep(2)}
              >
                Continue to projects
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Add Your Projects</CardTitle>
            <CardDescription>
              Add the work you want to feature on your portfolio page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="rounded-3xl border border-gray-200 dark:border-dark-700 p-5 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">Project {index + 1}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Describe your best work.</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setProjects(current => current.filter((_, idx) => idx !== index))
                    }
                    disabled={projects.length === 1}
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid gap-4">
                  <input
                    type="text"
                    value={project.title}
                    onChange={e => updateProject(index, 'title', e.target.value)}
                    placeholder="Project title"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                  />
                  <div className="grid grid-cols-2 items-center gap-3">
                    <label className="text-sm text-gray-600">Project photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleProjectImageChange(index, e.target.files?.[0])}
                      className="text-sm text-gray-500"
                    />
                  </div>
                  <textarea
                    value={project.description}
                    onChange={e => updateProject(index, 'description', e.target.value)}
                    placeholder="Project description"
                    className="w-full min-h-[120px] rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                  />
                  <input
                    type="text"
                    value={project.githubUrl}
                    onChange={e => updateProject(index, 'githubUrl', e.target.value)}
                    placeholder="GitHub URL"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                  />
                  <input
                    type="text"
                    value={project.liveUrl}
                    onChange={e => updateProject(index, 'liveUrl', e.target.value)}
                    placeholder="Live site URL"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                  />
                </div>
              </div>
            ))}

            <Button variant="outline" onClick={addProject} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add another project
            </Button>

            <div className="flex flex-wrap gap-4">
              <Button
                className="flex-1"
                disabled={!hasProject}
                onClick={() => setStep(3)}
              >
                Continue to theme
              </Button>
              <Button variant="outline" onClick={() => setStep(1)}>
                Back to resume
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Final step</CardTitle>
            <CardDescription>
              Choose a portfolio style and finish your setup.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  id: 'minimal',
                  label: 'Minimal',
                  description: 'Clean, bold layout with modern spacing.',
                },
                {
                  id: 'dark',
                  label: 'Modern Dark',
                  description: 'A sleek dark presentation with contrast accents.',
                },
              ].map(option => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setTheme(option.id as 'minimal' | 'dark')}
                  className={`rounded-3xl border p-5 text-left transition ${
                    theme === option.id
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/20'
                      : 'border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-900'
                  }`}
                >
                  <p className="font-semibold">{option.label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 dark:border-dark-700 dark:bg-dark-900">
              <p className="font-semibold mb-2">Portfolio preview</p>
              <div className="rounded-3xl bg-white dark:bg-dark-950 border border-gray-200 dark:border-dark-800 p-5">
                <p className="text-sm text-gray-500 dark:text-gray-400">Resume</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{uploadedResume ? 'Uploaded successfully' : 'No resume uploaded yet'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Projects</p>
                <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                  {projects.filter(project => project.title.trim()).map((project, idx) => (
                    <li key={idx}>{project.title}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button onClick={finishOnboarding} disabled={!canComplete} className="flex-1">
                Create portfolio link
              </Button>
              <Button variant="outline" onClick={() => setStep(2)}>
                Back to projects
              </Button>
            </div>

            {completed && (
              <div className="rounded-3xl border border-primary-200 bg-primary-50 p-5">
                <p className="font-semibold text-primary-700">Your portfolio is ready.</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  Share this link with employers and friends.
                </p>
                <div className="mt-4 rounded-2xl bg-white border border-gray-200 p-4 dark:bg-dark-950 dark:border-dark-700">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-primary-700 break-all">{portfolioUrl}</p>
                    <Button variant="outline" size="sm" onClick={copyLink}>
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <Button onClick={() => router.push('/dashboard')}>Back to dashboard</Button>
                  <Button variant="outline" onClick={() => window.open(portfolioUrl, '_blank')}>
                    View Portfolio
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
