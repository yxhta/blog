import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";
import * as z from "zod";

const blogFrontmatterSchema = frontmatterSchema.extend({
  date: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  image: z.string().optional(),
  excerpt: z.string().optional(),
});

export const blog = defineDocs({
  dir: "content/blog",
  docs: {
    schema: blogFrontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    providerImportSource: "@/mdx-components",
    // rehypeCodeOptions: {
    //   themes: {
    //     light: "github-light",
    //     dark: "github-dark",
    //   },
    //   langs: [
    //     "javascript",
    //     "typescript",
    //     "tsx",
    //     "jsx",
    //     "python",
    //     "rust",
    //     "go",
    //     "bash",
    //     "shell",
    //     "sql",
    //     "json",
    //     "yaml",
    //     "markdown",
    //     "html",
    //     "css",
    //     "scss",
    //     "java",
    //     "c",
    //     "cpp",
    //     "php",
    //     "ruby",
    //     "kotlin",
    //     "swift",
    //     "dart",
    //     "xml",
    //     "dockerfile",
    //   ],
    //   transformers: [
    //     {
    //       name: "line-highlight",
    //       code(node) {
    //         this.addClassToHast(node, "has-line-highlight")
    //         return node
    //       },
    //     },
    //   ],
    //   meta: {
    //     __default: {
    //       "data-rehype-pretty-code-figure": "",
    //     },
    //   },
    // },
  },
});
