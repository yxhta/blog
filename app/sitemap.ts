import { blogSource } from "@/lib/blog-source"
import { source } from "@/lib/source"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

	const blogPosts = await blogSource.getPages()
	const docPages = await source.getPages()

	const routes = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/docs`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.7,
		},
	]

	// Add blog posts
	const blogSitemapEntries = blogPosts.map((post) => ({
		url: `${baseUrl}${post.url}`,
		lastModified: new Date(post.data.date),
		changeFrequency: "monthly" as const,
		priority: 0.6,
	}))

	// Add doc pages
	const docSitemapEntries = docPages.map((page) => ({
		url: `${baseUrl}${page.url}`,
		lastModified: page.data.lastModified || new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.5,
	}))

	return [...routes, ...blogSitemapEntries, ...docSitemapEntries]
}
