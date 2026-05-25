'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, Github, Globe } from 'lucide-react';

interface PortfolioData {
  name: string;
  headline: string;
  bio: string;
  profileImage?: string;
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

  useEffect(() => {
    if (!username) return;

    const fetchPortfolio = async () => {
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

    fetchPortfolio();
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
            The portfolio you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 bg-gradient-to-br from-white via-primary-50 to-white dark:from-dark-950 dark:via-dark-900 dark:to-dark-950 border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-4xl mx-auto text-center">
          {portfolio.profileImage && (
            <div className="mb-6 flex justify-center">
              <Image
                src={portfolio.profileImage}
                alt={portfolio.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-primary-600"
              />
            </div>
          )}
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{portfolio.name}</h1>
          <p className="text-2xl text-primary-600 dark:text-primary-400 mb-6 font-semibold">
            {portfolio.headline}
          </p>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            {portfolio.bio}
          </p>
        </div>
      </section>

      {/* Skills Section */}
      {portfolio.skills.length > 0 && (
        <section className="px-4 py-16 border-b border-gray-200 dark:border-dark-700">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {portfolio.projects.length > 0 && (
        <section className="px-4 py-16 border-b border-gray-200 dark:border-dark-700">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Projects</h2>
            <div className="space-y-8">
              {portfolio.projects.map(project => (
                <div key={project.id} className="card p-8">
                  {project.imageUrl && (
                    <div className="mb-6 rounded-lg overflow-hidden h-64 relative">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        <Github className="w-5 h-5" />
                        View Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        <Globe className="w-5 h-5" />
                        Visit Site
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {portfolio.experience.length > 0 && (
        <section className="px-4 py-16 border-b border-gray-200 dark:border-dark-700">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Experience</h2>
            <div className="space-y-8">
              {portfolio.experience.map((exp, idx) => (
                <div key={idx} className="card p-8">
                  <h3 className="text-2xl font-bold">{exp.position}</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {new Date(exp.startDate).toLocaleDateString()} -{' '}
                    {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {portfolio.education.length > 0 && (
        <section className="px-4 py-16 border-b border-gray-200 dark:border-dark-700">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Education</h2>
            <div className="space-y-8">
              {portfolio.education.map((edu, idx) => (
                <div key={idx} className="card p-8">
                  <h3 className="text-2xl font-bold">{edu.degree}</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                    {edu.school}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {edu.field}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-gray-200 dark:border-dark-700">
        <div className="max-w-4xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>Built with FolioAI</p>
        </div>
      </footer>
    </div>
  );
}
