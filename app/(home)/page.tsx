import { blogSource } from "@/lib/blog-source"
import { ArrowRight, BookOpen, Calendar, Code, Coffee, User } from "lucide-react"
import Link from "next/link"

export default async function HomePage() {
	const recentPosts = (await blogSource.getPages())
		.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
		.slice(0, 3)

	return (
		<main className="flex flex-1 flex-col">
			{/* Hero Section */}
			<section className="py-24 text-center bg-gradient-to-b from-background to-muted/30">
				<div className="container max-w-4xl mx-auto px-4">
					<h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
						Software Engineering Blog
					</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Insights, tutorials, and best practices from the world of software development. Join me
						on my journey to build better software.
					</p>
					<div className="flex gap-4 justify-center">
						<Link
							href="/blog/list"
							className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
						>
							<BookOpen className="h-4 w-4" />
							Read Blog
						</Link>
						<Link
							href="/docs"
							className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
						>
							<Code className="h-4 w-4" />
							Documentation
						</Link>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16">
				<div className="container max-w-6xl mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">What You'll Find Here</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="p-6 text-center border border-border rounded-lg bg-card">
							<Code className="h-12 w-12 mx-auto mb-4 text-primary" />
							<h3 className="text-xl font-semibold mb-2">Technical Tutorials</h3>
							<p className="text-muted-foreground">
								In-depth guides on programming languages, frameworks, and development tools.
							</p>
						</div>
						<div className="p-6 text-center border border-border rounded-lg bg-card">
							<Coffee className="h-12 w-12 mx-auto mb-4 text-primary" />
							<h3 className="text-xl font-semibold mb-2">Best Practices</h3>
							<p className="text-muted-foreground">
								Software architecture, code quality, and development methodologies.
							</p>
						</div>
						<div className="p-6 text-center border border-border rounded-lg bg-card">
							<BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
							<h3 className="text-xl font-semibold mb-2">Career Insights</h3>
							<p className="text-muted-foreground">
								Tips and advice for growing as a software engineer.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Recent Posts Section */}
			{recentPosts.length > 0 && (
				<section className="py-16 bg-muted/30">
					<div className="container max-w-6xl mx-auto px-4">
						<div className="flex items-center justify-between mb-12">
							<h2 className="text-3xl font-bold">Recent Posts</h2>
							<Link
								href="/blog/list"
								className="inline-flex items-center gap-2 text-primary hover:underline"
							>
								View all posts <ArrowRight className="h-4 w-4" />
							</Link>
						</div>
						<div className="grid md:grid-cols-3 gap-6">
							{recentPosts.map((post) => (
								<article key={post.url}>
									<Link href={post.url}>
										<div className="p-6 h-full hover:shadow-lg transition-shadow border border-border rounded-lg bg-card">
											<h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
												{post.data.title}
											</h3>
											<p className="text-muted-foreground mb-4 line-clamp-2">
												{post.data.description}
											</p>
											<div className="flex items-center gap-4 text-sm text-muted-foreground">
												<div className="flex items-center gap-1">
													<User className="h-3.5 w-3.5" />
													<span>{post.data.author}</span>
												</div>
												<div className="flex items-center gap-1">
													<Calendar className="h-3.5 w-3.5" />
													<time dateTime={new Date(post.data.date).toISOString()}>
														{new Intl.DateTimeFormat("en-US", {
															month: "short",
															day: "numeric",
														}).format(new Date(post.data.date))}
													</time>
												</div>
											</div>
										</div>
									</Link>
								</article>
							))}
						</div>
					</div>
				</section>
			)}
		</main>
	)
}
