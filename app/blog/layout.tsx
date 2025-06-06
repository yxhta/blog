import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/app/layout.config';
import { blogSource } from '@/lib/blog-source';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions}
      tree={blogSource.pageTree}
      nav={{
        ...baseOptions.nav,
        title: 'Blog',
      }}
    >
      {children}
    </DocsLayout>
  );
}