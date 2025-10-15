import type { MetadataRoute } from "next";
import { blogSource } from "@/entities/post";
import { getBaseUrl } from "@/shared/lib/base-url";

type StaticRoute = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const blogPosts = await blogSource.getPages();

  const staticRoutes: StaticRoute[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog/list", priority: 0.8, changeFrequency: "daily" },
    { path: "/blog/tags", priority: 0.7, changeFrequency: "weekly" },
  ];

  const routes = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const blogSitemapEntries = blogPosts.map((post) => ({
    url: `${baseUrl}${post.url}`,
    lastModified: new Date(post.data.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...blogSitemapEntries];
}
