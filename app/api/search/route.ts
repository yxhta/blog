import { createFromSource } from "fumadocs-core/search/server";
import { blogSource } from "@/entities/post";

export const { GET } = createFromSource(blogSource);
