import { blogSource } from "@/lib/blog-source"

export async function GET() {
  const posts = await blogSource.getPages()

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>blog.yxhta.com</title>
    <description></description>
    <link>${baseUrl}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <description><![CDATA[${post.data.description || ""}]]></description>
      <link>${baseUrl}${post.url}</link>
      <guid>${baseUrl}${post.url}</guid>
      <pubDate>${new Date(post.data.date).toUTCString()}</pubDate>
      ${post.data.category ? `<category>${post.data.category}</category>` : ""}
    </item>`
      )
      .join("")}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
