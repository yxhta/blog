import { baseOptions } from "@/app/layout.config"
import { blogSource } from "@/lib/blog-source"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import type { ReactNode } from "react"

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions}
      tree={blogSource.pageTree}
      nav={{
        ...baseOptions.nav,
        title: "Blog",
      }}
      sidebar={{
        defaultOpenLevel: 1,
        collapsible: false,
      }}
    >
      {children}
    </DocsLayout>
  )
}
