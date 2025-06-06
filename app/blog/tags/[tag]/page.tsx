import { notFound } from 'next/navigation';
import { blogSource } from '@/lib/blog-source';
import { Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagPage(props: TagPageProps) {
  const params = await props.params;
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  
  const allPosts = await blogSource.getPages();
  const postsWithTag = allPosts.filter(post => 
    post.data.tags?.includes(decodedTag)
  );

  if (postsWithTag.length === 0) {
    notFound();
  }

  const sortedPosts = postsWithTag.sort((a, b) => 
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-6 w-6 text-primary" />
          <h1 className="text-4xl font-bold">#{decodedTag}</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          {postsWithTag.length} {postsWithTag.length === 1 ? 'post' : 'posts'} tagged with "{decodedTag}"
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => {
          const readingTime = Math.ceil(post.data.content.split(/\s+/).length / 200);
          
          return (
            <article key={post.url} className="group">
              <Link href={post.url}>
                <div className="h-full transition-all hover:shadow-lg hover:border-primary/50 border border-border rounded-lg bg-card">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.data.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.data.description || post.data.excerpt}
                      </p>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5" />
                        <span>{post.data.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={new Date(post.data.date).toISOString()}>
                          {new Intl.DateTimeFormat('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          }).format(new Date(post.data.date))}
                        </time>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{readingTime} min read</span>
                      </div>
                    </div>

                    {post.data.tags && post.data.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1">
                        {post.data.tags.slice(0, 3).map((postTag: string) => (
                          <span 
                            key={postTag} 
                            className={`px-2 py-0.5 text-xs rounded-md ${
                              postTag === decodedTag 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-secondary'
                            }`}
                          >
                            {postTag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await blogSource.getPages();
  const allTags = new Set<string>();
  
  posts.forEach(post => {
    post.data.tags?.forEach((tag: string) => allTags.add(tag));
  });
  
  return Array.from(allTags).map(tag => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata(props: TagPageProps): Promise<Metadata> {
  const params = await props.params;
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  
  return {
    title: `Posts tagged with "${decodedTag}"`,
    description: `All blog posts tagged with ${decodedTag}`,
  };
}