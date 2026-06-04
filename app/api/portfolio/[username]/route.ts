import { NextResponse } from 'next/server';

// Mock portfolio data - replace with actual database queries
const mockPortfolios: Record<string, any> = {
  rahul: {
    name: 'Rahul Sharma',
    headline: 'Full Stack Developer',
    bio: 'Passionate about building scalable web applications with modern technologies.',
    email: 'rahul.sharma@example.com',
    githubUrl: 'https://github.com/rahul',
    phone: '+91 98765 43210',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    projects: [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce platform with real-time inventory management.',
        githubUrl: 'https://github.com/rahul/ecommerce',
        liveUrl: 'https://ecommerce-demo.com',
      },
    ],
    experience: [
      {
        company: 'Tech Startup Inc',
        position: 'Senior Developer',
        description: 'Led development of core platform features',
        startDate: '2023-01-01',
      },
    ],
    education: [
      {
        school: 'University of Tech',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2018-09-01',
        endDate: '2022-05-31',
      },
    ],
    theme: 'minimal',
  },
  john: {
    name: 'John Designer',
    headline: 'UI/UX Designer & Product Manager',
    bio: 'Creating beautiful and functional digital experiences.',
    email: 'john.designer@example.com',
    githubUrl: 'https://github.com/johndesigner',
    phone: '+1 555 123 4567',
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Product Strategy'],
    projects: [],
    experience: [],
    education: [],
    theme: 'dark',
  },
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const normalizedUsername = username.toLowerCase();
    const portfolio = mockPortfolios[normalizedUsername];

    if (portfolio) {
      return NextResponse.json(portfolio);
    }

    const fallbackName = normalizedUsername
      .split(/[-_.]/g)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    const fallbackPortfolio = {
      name: fallbackName || 'Portfolio Creator',
      headline: 'Modern professional portfolio',
      bio: 'A polished portfolio showcasing skills, work, and experience.',
      email: 'hello@example.com',
      githubUrl: 'https://github.com',
      phone: '+1 234 567 890',
      skills: ['Web Development', 'Design Systems', 'UI/UX', 'Product Strategy'],
      projects: [
        {
          id: '1',
          title: 'SaaS Landing Page',
          description: 'An elegant landing page design built for conversion and clarity.',
          githubUrl: 'https://github.com',
          liveUrl: 'https://example.com',
        },
      ],
      experience: [],
      education: [],
      theme: 'minimal',
    };

    return NextResponse.json(fallbackPortfolio);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
