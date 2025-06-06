import { blogSource } from '@/lib/blog-source';
import { Tag } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'All Tags - Software Engineering Blog',
  description: 'Browse all tags used in the blog posts',
};

export default async function TagsPage() {
  const posts = await blogSource.getPages();
  
  // Count posts per tag
  const tagCounts = new Map<string, number>();
  posts.forEach(post => {
    post.data.tags?.forEach((tag: string) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  // Sort tags by count (most used first)
  const sortedTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">All Tags</h1>
        <p className="text-muted-foreground text-lg">
          Browse posts by topic
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedTags.map(([tag, count]) => (
          <Link key={tag} href={`/blog/tags/${encodeURIComponent(tag)}`}>
            <div className="p-4 hover:shadow-lg transition-shadow group border border-border rounded-lg bg-card">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                <span className="font-medium group-hover:text-primary transition-colors">
                  {tag}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {count} {count === 1 ? 'post' : 'posts'}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {sortedTags.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tags found.</p>
        </div>
      )}
    </div>
  );
}