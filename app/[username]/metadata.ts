import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePortfolioMetadata } from '@/lib/metadata';

interface PortfolioParams {
  params: Promise<{ username: string }>;
}

export async function generateMetadata(
  { params }: PortfolioParams
): Promise<Metadata> {
  const { username } = await params;

  // TODO: Fetch actual user data from database
  // For now return default metadata
  return {
    title: `${username}'s Portfolio | FolioAI`,
    description: `${username}'s professional portfolio created with FolioAI`,
  };
}

export async function generateStaticParams() {
  // TODO: Fetch all usernames from database and generate static pages
  // For now return empty array - pages will be generated on demand
  return [];
}
