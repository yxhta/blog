import { Calendar } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";

interface BlogPostCardProps {
  post: {
    url: string;
    data: {
      title: string;
      description?: string | null;
      date: string | Date;
    };
  };
  className?: string;
  description?: string;
}

export function BlogPostCard({ post, className, description }: BlogPostCardProps) {
  const postDate = post.data.date instanceof Date ? post.data.date : new Date(post.data.date);
  const displayDescription = description ?? post.data.description;

  return (
    <article className={cn(className)}>
      <Link href={post.url}>
        <div className="p-6 h-full hover:shadow-lg transition-shadow border border-border rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
            {post.data.title}
          </h3>
          {displayDescription && (
            <p className="text-muted-foreground mb-4 line-clamp-2">{displayDescription}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={postDate.toISOString()}>
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                }).format(postDate)}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
