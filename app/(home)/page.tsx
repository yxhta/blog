import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogPostCard } from "@/components/blog-post-card";
import { blogSource } from "@/lib/blog-source";

export default async function HomePage() {
  const recentPosts = blogSource
    .getPages()
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-1 flex-col">
      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Recent Posts</h2>
              <Link
                href="/blog/list"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                View all posts <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <BlogPostCard key={post.url} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
