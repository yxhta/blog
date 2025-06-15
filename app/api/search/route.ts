import { blogSource } from "@/lib/blog-source"
import { createFromSource } from "fumadocs-core/search/server"

export const { GET } = createFromSource(blogSource)
