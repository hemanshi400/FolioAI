#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create sample users
  const rahul = await prisma.user.create({
    data: {
      clerkId: 'user_test_rahul',
      email: 'rahul@example.com',
      name: 'Rahul Sharma',
      username: 'rahul',
      headline: 'Full Stack Developer',
      bio: 'Passionate about building scalable web applications with modern technologies. 5+ years of experience in web development.',
      theme: 'minimal',
      skills: {
        create: [
          { name: 'React' },
          { name: 'Next.js' },
          { name: 'TypeScript' },
          { name: 'Node.js' },
          { name: 'PostgreSQL' },
          { name: 'Tailwind CSS' },
        ],
      },
      projects: {
        create: [
          {
            title: 'E-commerce Platform',
            description:
              'A full-stack e-commerce platform with real-time inventory management, payment integration, and admin dashboard.',
            githubUrl: 'https://github.com/rahul/ecommerce',
          },
          {
            title: 'Task Management App',
            description:
              'Collaborative task management application with real-time updates and team collaboration features.',
            githubUrl: 'https://github.com/rahul/taskapp',
          },
        ],
      },
      experience: {
        create: [
          {
            company: 'Tech Startup Inc',
            position: 'Senior Developer',
            description: 'Led development of core platform features and mentored junior developers.',
            startDate: new Date('2023-01-01'),
          },
          {
            company: 'Web Solutions Ltd',
            position: 'Full Stack Developer',
            description: 'Developed and maintained multiple client projects using React and Node.js.',
            startDate: new Date('2020-06-01'),
            endDate: new Date('2022-12-31'),
          },
        ],
      },
      education: {
        create: [
          {
            school: 'University of Technology',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            startDate: new Date('2018-09-01'),
            endDate: new Date('2022-05-31'),
          },
        ],
      },
    },
  });

  const john = await prisma.user.create({
    data: {
      clerkId: 'user_test_john',
      email: 'john@example.com',
      name: 'John Designer',
      username: 'john',
      headline: 'UI/UX Designer & Product Manager',
      bio: 'Creating beautiful and functional digital experiences. Passionate about user-centered design.',
      theme: 'dark',
      skills: {
        create: [
          { name: 'Figma' },
          { name: 'UI Design' },
          { name: 'UX Research' },
          { name: 'Prototyping' },
          { name: 'Product Strategy' },
        ],
      },
      experience: {
        create: [
          {
            company: 'Design Studio',
            position: 'Lead Designer',
            description: 'Led design team and established design system for multiple products.',
            startDate: new Date('2022-01-01'),
          },
        ],
      },
      education: {
        create: [
          {
            school: 'Design Institute',
            degree: 'Diploma',
            field: 'Graphic Design',
            startDate: new Date('2017-09-01'),
            endDate: new Date('2019-05-31'),
          },
        ],
      },
    },
  });

  console.log('Seeding completed!');
  console.log({ rahul, john });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
