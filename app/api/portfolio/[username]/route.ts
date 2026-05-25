import { NextRequest, NextResponse } from 'next/server';

// Mock portfolio data - replace with actual database queries
const mockPortfolios: Record<string, any> = {
  rahul: {
    name: 'Rahul Sharma',
    headline: 'Full Stack Developer',
    bio: 'Passionate about building scalable web applications with modern technologies.',
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
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Product Strategy'],
    projects: [],
    experience: [],
    education: [],
    theme: 'dark',
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username.toLowerCase();
    const portfolio = mockPortfolios[username];

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
