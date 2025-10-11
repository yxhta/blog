import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { Calendar, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SocialShare } from "@/components/social-share";
import { blogSource } from "@/lib/blog-source";

interface BlogPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function BlogPostPage(props: BlogPageProps) {
  const params = await props.params;

  // If no slug provided, redirect to blog list
  if (!params.slug || params.slug.length === 0) {
    redirect("/blog/list");
  }

  const page = blogSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const readingTime = Math.ceil(page.data.content.split(/\s+/).length / 200);

  return (
    <DocsPage lastUpdate={page.data.lastModified}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>
        <>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={page.data.date.toISOString()}>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(page.data.date))}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {page.data.tags && page.data.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                {page.data.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/blog/tags/${encodeURIComponent(tag)}`}
                    className="px-2 py-1 bg-secondary text-xs rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      </DocsDescription>
      <DocsBody>
        {/*<article className="prose prose-neutral dark:prose-invert max-w-none">*/}
        {/*<h1 className="text-4xl font-bold mb-4">{page.data.title}</h1>*/}

        {/*
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={page.data.date.toISOString()}>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(page.data.date))}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {page.data.tags && page.data.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-8">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-2">
              {page.data.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${encodeURIComponent(tag)}`}
                  className="px-2 py-1 bg-secondary text-xs rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
        */}

        <MDX />

        <div className="mt-12 pt-8 border-t border-border">
          <SocialShare
            url={page.url}
            title={page.data.title}
            description={page.data.description}
          />
        </div>
        {/*</article>*/}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  const posts = blogSource.getPages();
  return posts.map((post) => ({
    slug: post.url.split("/").filter(Boolean).slice(1), // Remove 'blog' from path
  }));
}

export async function generateMetadata(
  props: BlogPageProps,
): Promise<Metadata> {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    return {
      title: "blog.yxhta.com",
      description: "",
    };
  }

  const page = blogSource.getPage(params.slug);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: "article",
      publishedTime: page.data.date.toISOString(),
      tags: page.data.tags,
    },
  };
}
