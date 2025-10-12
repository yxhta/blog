import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { Header } from "@/components/layout/home";
import { blogSource } from "@/lib/blog-source";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions}
      tree={blogSource.pageTree}
      nav={{
        ...baseOptions.nav,
        component: <Header {...baseOptions} />,
      }}
      sidebar={{
        enabled: false,
      }}
      containerProps={
        {
          // className: "container max-w-6xl mx-auto py-12",
        }
      }
    >
      {children}
    </DocsLayout>
  );
}
