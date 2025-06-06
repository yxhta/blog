import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Tech Blog',
    default: 'Software Engineering Blog - Technical Insights & Tutorials',
  },
  description: 'A technical blog focused on software engineering, programming tutorials, and best practices.',
  keywords: ['software engineering', 'programming', 'web development', 'tutorials', 'tech blog'],
  authors: [{ name: 'Tech Blog Team' }],
  creator: 'Tech Blog',
  publisher: 'Tech Blog',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Software Engineering Blog',
    description: 'Technical insights, tutorials, and best practices for software engineers',
    siteName: 'Tech Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Engineering Blog',
    description: 'Technical insights, tutorials, and best practices for software engineers',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Tech Blog RSS Feed"
          href="/rss.xml"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
