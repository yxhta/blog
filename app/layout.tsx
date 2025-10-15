import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { getBaseUrl } from "@/shared/lib/base-url";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | blog.yxhta.com",
    default: "blog.yxhta.com",
  },
  description:
    "A technical blog focused on software engineering, programming tutorials, and best practices.",
  keywords: ["software engineering", "programming", "web development", "tutorials", "tech blog"],
  authors: [{ name: "yxhta" }],
  creator: "yxhta",
  publisher: "yxhta",
  metadataBase: new URL(getBaseUrl()),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "blog.yxhta.com",
    description: "",
    siteName: "blog.yxhta.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "blog.yxhta.com",
    description: "",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
          title="blog.yxhta.com RSS Feed"
          href="/rss.xml"
        />
      </head>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
