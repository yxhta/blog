import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { blogSource } from "@/entities/post";
import { Header } from "@/widgets/home-layout";

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
