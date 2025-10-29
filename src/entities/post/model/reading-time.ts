import { cacheLife } from "next/cache";
import { blogSource } from "./blog-source";

export async function getPostReadingTime(slug: string[]): Promise<number | null> {
  "use cache";
  cacheLife("days");

  const page = blogSource.getPage(slug);
  if (!page) {
    return null;
  }

  const rawContent = await page.data.getText("raw");
  const wordCount = rawContent.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}
