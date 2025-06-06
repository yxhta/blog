import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

const blogFrontmatterSchema = frontmatterSchema.extend({
  author: z.string(),
  date: z.string().or(z.date()).transform((val) => new Date(val)),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  image: z.string().optional(),
  excerpt: z.string().optional(),
});

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: blogFrontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      langs: [
        'javascript',
        'typescript',
        'tsx',
        'jsx',
        'python',
        'rust',
        'go',
        'bash',
        'sql',
        'json',
        'yaml',
        'markdown',
        'html',
        'css',
      ],
    },
  },
});
