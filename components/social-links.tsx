import { Github } from "lucide-react";
import Link from "next/link";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/yxhta",
    icon: <Github className="size-5" />,
  },
];

export function SocialLinks() {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap gap-3 pt-2">
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-3 transition-colors hover:bg-accent hover:text-accent-foreground group"
            aria-label={`Visit ${link.name}`}
          >
            <span className="transition-transform group-hover:scale-110">{link.icon}</span>
            <div className="flex flex-col">
              <span className="font-medium">{link.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
