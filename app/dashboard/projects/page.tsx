'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform built with Next.js',
      imageUrl: null,
      githubUrl: 'https://github.com/example',
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Collaborative task management application',
      imageUrl: null,
      githubUrl: 'https://github.com/example',
    },
  ]);

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Showcase your best work to potential clients and employers.
          </p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button className="gap-2">
            <Plus className="w-5 h-5" />
            Add Project
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You haven't added any projects yet.
              </p>
              <Link href="/dashboard/projects/new">
                <Button>Create Your First Project</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          projects.map(project => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/projects/${project.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
