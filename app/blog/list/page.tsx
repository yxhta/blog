import { blogSource } from "@/lib/blog-source"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"

export const metadata = {
	title: "Blog - Software Engineering Insights",
	description: "Technical articles, tutorials, and insights on software engineering",
}

export default async function BlogPage() {
	const posts = await blogSource.getPages()

	// Sort posts by date (newest first)
	const sortedPosts = posts.sort((a, b) => {
		const dateA = new Date(a.data.date)
		const dateB = new Date(b.data.date)
		return dateB.getTime() - dateA.getTime()
	})

	return (
		<div className="container max-w-6xl mx-auto py-12 px-4">
			<div className="mb-12">
				<h1 className="text-4xl font-bold mb-4">Blog</h1>
				<p className="text-muted-foreground text-lg">
					Technical articles, tutorials, and insights on software engineering
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{sortedPosts.map((post) => {
					const readingTime = Math.ceil(post.data.content.split(/\s+/).length / 200)

					return (
						<article key={post.url} className="group">
							<Link href={post.url}>
								<div className="h-full transition-all hover:shadow-lg hover:border-primary/50 border border-border rounded-lg bg-card">
									<div className="p-6 flex flex-col h-full">
										<div className="flex-1">
											<h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
												{post.data.title}
											</h2>
											<p className="text-muted-foreground mb-4 line-clamp-2">
												{post.data.description || post.data.excerpt}
											</p>
										</div>

										<div className="space-y-2 text-sm text-muted-foreground">
											<div className="flex items-center gap-2">
												<User className="h-3.5 w-3.5" />
												<span>{post.data.author}</span>
											</div>
											<div className="flex items-center gap-2">
												<Calendar className="h-3.5 w-3.5" />
												<time dateTime={new Date(post.data.date).toISOString()}>
													{new Intl.DateTimeFormat("en-US", {
														year: "numeric",
														month: "short",
														day: "numeric",
													}).format(new Date(post.data.date))}
												</time>
											</div>
											<div className="flex items-center gap-2">
												<Clock className="h-3.5 w-3.5" />
												<span>{readingTime} min read</span>
											</div>
										</div>

										{post.data.tags && post.data.tags.length > 0 && (
											<div className="mt-4 flex flex-wrap gap-1">
												{post.data.tags.slice(0, 3).map((tag: string) => (
													<span key={tag} className="px-2 py-0.5 bg-secondary text-xs rounded-md">
														{tag}
													</span>
												))}
											</div>
										)}

										<div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
											Read more <ArrowRight className="h-3.5 w-3.5 ml-1" />
										</div>
									</div>
								</div>
							</Link>
						</article>
					)
				})}
			</div>

			{sortedPosts.length === 0 && (
				<div className="text-center py-12">
					<p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
				</div>
			)}
		</div>
	)
}
