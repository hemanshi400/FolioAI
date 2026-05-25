import type { Metadata } from 'next';

export function generateMetadata({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
}): Metadata {
  return {
    title: `${title} | FolioAI`,
    description,
    openGraph: {
      title: `${title} | FolioAI`,
      description,
      url: url || process.env.NEXT_PUBLIC_APP_URL,
      siteName: 'FolioAI',
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | FolioAI`,
      description,
      images: image ? [image] : [],
    },
  };
}

export function generatePortfolioMetadata(user: {
  name: string;
  headline?: string;
  bio?: string;
  profileImage?: string;
}) {
  const title = user.name;
  const description = user.headline || user.bio || 'Professional portfolio';
  const image = user.profileImage;

  return generateMetadata({
    title,
    description,
    image,
  });
}
