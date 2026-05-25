import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // TODO: Upload to Cloudinary and parse resume
    // For now, return mock parsed data
    const parsedData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
      experience: [
        {
          company: 'Tech Company',
          position: 'Senior Developer',
          startDate: '2021-01-01',
          description: 'Developed web applications',
        },
      ],
      education: [
        {
          school: 'University',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2017-09-01',
          endDate: '2021-05-31',
        },
      ],
    };

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload resume' },
      { status: 500 }
    );
  }
}
