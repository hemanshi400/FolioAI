'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Github, Globe, Mail, Smartphone } from 'lucide-react';

interface PortfolioData {
  name: string;
  headline: string;
  bio: string;
  profileImage?: string;
  email?: string;
  githubUrl?: string;
  phone?: string;
  skills: string[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  theme: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

interface Experience {
  company: string;
  position: string;
  description?: string;
  startDate: string;
  endDate?: string;
}

interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
}

export default function PortfolioPage() {
  const params = useParams();
  const username = params?.username as string | undefined;
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const storageKey = `folioai-portfolio-${username}`;

    const loadPortfolio = async () => {
      const localData = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null;

      if (localData) {
        setPortfolio(JSON.parse(localData));
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/portfolio/${username}`);
        if (res.ok) {
          const data = await res.json();
          setPortfolio(data);
        }
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      } finally {
        setLoading(false);
      }
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === storageKey) {
        if (event.newValue) {
          setPortfolio(JSON.parse(event.newValue));
        }
      }
    };

    // Pick a random background from public/backgrounds/bg1..bg9 (if present)
    const chooseRandomBackground = () => {
      if (typeof window === 'undefined') return;
      const possible = Array.from({ length: 9 }).map((_, i) => `/backgrounds/bg${i + 1}.jpg`);
      // pick a random one; the browser will 404 if not present and fallback to gradient
      const pick = possible[Math.floor(Math.random() * possible.length)];
      setBgImage(pick);
    };

    loadPortfolio();
    chooseRandomBackground();
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Portfolio not found</h1>
          <p className="text-gray-600 dark:text-gray-400">
            The portfolio you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-100">
      {/* Background image layer */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
      />
      {/* Light overlay to make background feel lighter and keep content readable */}
      <div className="absolute inset-0 bg-white/70 dark:bg-black/20" />
      <div className="relative bg-transparent min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_40%)] blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center gap-12">
          <div className="space-y-8 pt-10 lg:pt-0">
            <div>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                {portfolio.name}
              </h1>
              <p className="mt-4 text-2xl font-semibold text-primary-700 dark:text-primary-300">
                {portfolio.headline}
              </p>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {portfolio.bio}
            </p>
          </div>

          <div className="relative rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
            <div className="absolute inset-x-0 top-0 h-44 rounded-[1.75rem] bg-gradient-to-br from-primary-400 to-sky-500 opacity-20 blur-[2px]" />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              <div className="p-10 flex h-full min-h-[280px] items-center justify-center text-center">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Portfolio</p>
                  <h2 className="text-3xl font-semibold">{portfolio.name}</h2>
                  <p className="text-base text-slate-600 dark:text-slate-300">{portfolio.headline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {portfolio.skills.length > 0 && (
        <section className="px-4 py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
              <div>
                <h2 className="text-3xl font-semibold">Skills</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  The tools and technologies that power this portfolio.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 py-16 lg:py-20 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold">Contact</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  Reach out by email, GitHub, or mobile.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <a href={`mailto:${portfolio.email ?? 'hello@example.com'}`} className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-200">
                    <Mail className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">Email</p>
                  <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{portfolio.email ?? 'hello@example.com'}</p>
                </a>
                <a href={portfolio.githubUrl ?? 'https://github.com'} target="_blank" rel="noopener noreferrer" className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-slate-700">
                    <Github className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">GitHub</p>
                  <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{portfolio.githubUrl ? portfolio.githubUrl.replace(/^https?:\/\//, '') : 'github.com/username'}</p>
                </a>
                <a href={`tel:${portfolio.phone ?? '+1234567890'}`} className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">Mobile</p>
                  <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{portfolio.phone ?? '+1 234 567 890'}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project details modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedProject(null)} />
          <div className="relative z-10 max-w-3xl w-full mx-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-72 w-full bg-gray-100">
                {selectedProject.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selectedProject.imageUrl} alt={selectedProject.title} className="object-cover w-full h-full" />
                ) : (
                  <div className="h-full w-full bg-slate-200" />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{selectedProject.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedProject.description}</p>
                <div className="flex gap-3">
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                      <Globe className="w-4 h-4" />
                      Visit Site
                    </a>
                  )}
                  <button onClick={() => setSelectedProject(null)} className="ml-auto text-sm text-slate-500">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {portfolio.projects.length > 0 && (
        <section className="px-4 pb-16 lg:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
              <div>
                <h2 className="text-3xl font-semibold">Featured projects</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  A quick look at the work that defines this portfolio.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {portfolio.projects.map(project => (
                <div
                  key={project.id}
                  className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-0 shadow-lg cursor-pointer hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="h-64 w-full bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-[2rem]">
                    {project.imageUrl ? (
                      // use img for data URLs
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.imageUrl} alt={project.title} className="object-cover w-full h-full" />
                    ) : (
                      <div className="h-full w-full bg-slate-200" />
                    )}
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {portfolio.experience.length > 0 && (
        <section className="px-4 py-16 lg:py-20 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-semibold">Experience</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Professional roles and leadership highlights.
              </p>
            </div>
            <div className="space-y-6">
              {portfolio.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold">{exp.position}</h3>
                      <p className="text-primary-600 dark:text-primary-300 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(exp.startDate).toLocaleDateString()} -{' '}
                      {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {portfolio.education.length > 0 && (
        <section className="px-4 py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-semibold">Education</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Academic background and certifications.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {portfolio.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <h3 className="text-2xl font-semibold">{edu.degree}</h3>
                  <p className="text-primary-600 dark:text-primary-300 font-medium mt-2">
                    {edu.school}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    {edu.field}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="px-4 py-12 bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto text-center">
          <p>Built with FolioAI</p>
        </div>
      </footer>
    </div>
  );
}
