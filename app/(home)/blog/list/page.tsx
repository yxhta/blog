import type { Metadata } from "next";
import { BlogPostCard } from "@/components/blog-post-card";
import { blogSource } from "@/lib/blog-source";

export const metadata: Metadata = {
  title: "Blog - Software Engineering Insights",
  description: "Technical articles, tutorials, and insights on software engineering",
};

export default async function BlogPage() {
  const posts = blogSource.getPages();

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.data.date);
    const dateB = new Date(b.data.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="container max-w-6xl mx-auto py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground text-lg">
          Technical articles, tutorials, and insights on software engineering
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => (
          <BlogPostCard
            key={post.url}
            post={post}
            description={post.data.description || post.data.excerpt}
          />
        ))}
      </div>

      {sortedPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
