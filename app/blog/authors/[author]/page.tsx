import { getAuthor } from "@/lib/authors"
import { blogSource } from "@/lib/blog-source"
import {
	ArrowRight,
	Calendar,
	Clock,
	ExternalLink,
	Github,
	Linkedin,
	Twitter,
	User,
} from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface AuthorPageProps {
	params: Promise<{ author: string }>
}

export default async function AuthorPage(props: AuthorPageProps) {
	const params = await props.params
	const { author: authorParam } = params
	const decodedAuthor = decodeURIComponent(authorParam)

	const allPosts = await blogSource.getPages()
	const authorInfo = getAuthor(decodedAuthor)

	// Find posts by this author (match by name or author info)
	const authorPosts = allPosts.filter((post) => {
		const postAuthor = post.data.author
		return postAuthor === decodedAuthor || (authorInfo && postAuthor === authorInfo.name)
	})

	if (authorPosts.length === 0 && !authorInfo) {
		notFound()
	}

	const sortedPosts = authorPosts.sort(
		(a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
	)

	const displayName = authorInfo?.name || decodedAuthor

	return (
		<div className="container max-w-6xl mx-auto py-12 px-4">
			<div className="mb-12">
				<div className="flex items-start gap-6 mb-6">
					{authorInfo?.avatar && (
						<div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted">
							<Image src={authorInfo.avatar} alt={displayName} fill className="object-cover" />
						</div>
					)}
					<div className="flex-1">
						<h1 className="text-4xl font-bold mb-2">{displayName}</h1>
						{authorInfo?.bio && (
							<p className="text-muted-foreground text-lg mb-4">{authorInfo.bio}</p>
						)}

						{authorInfo && (
							<div className="flex gap-4">
								{authorInfo.website && (
									<Link
										href={authorInfo.website}
										className="flex items-center gap-1 text-sm text-primary hover:underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										<ExternalLink className="h-4 w-4" />
										Website
									</Link>
								)}
								{authorInfo.github && (
									<Link
										href={`https://github.com/${authorInfo.github}`}
										className="flex items-center gap-1 text-sm text-primary hover:underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Github className="h-4 w-4" />
										GitHub
									</Link>
								)}
								{authorInfo.twitter && (
									<Link
										href={`https://twitter.com/${authorInfo.twitter}`}
										className="flex items-center gap-1 text-sm text-primary hover:underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Twitter className="h-4 w-4" />
										Twitter
									</Link>
								)}
								{authorInfo.linkedin && (
									<Link
										href={`https://linkedin.com/in/${authorInfo.linkedin}`}
										className="flex items-center gap-1 text-sm text-primary hover:underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Linkedin className="h-4 w-4" />
										LinkedIn
									</Link>
								)}
							</div>
						)}
					</div>
				</div>

				<p className="text-muted-foreground">
					{authorPosts.length} {authorPosts.length === 1 ? "post" : "posts"} by {displayName}
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

			{authorPosts.length === 0 && (
				<div className="text-center py-12">
					<p className="text-muted-foreground">No posts found for this author.</p>
				</div>
			)}
		</div>
	)
}

export async function generateStaticParams() {
	const posts = await blogSource.getPages()
	const allAuthors = new Set<string>()

	posts.forEach((post) => {
		allAuthors.add(post.data.author)
	})

	return Array.from(allAuthors).map((author) => ({
		author: encodeURIComponent(author.toLowerCase().replace(/\s+/g, "-")),
	}))
}

export async function generateMetadata(props: AuthorPageProps): Promise<Metadata> {
	const params = await props.params
	const { author: authorParam } = params
	const decodedAuthor = decodeURIComponent(authorParam)
	const authorInfo = getAuthor(decodedAuthor)
	const displayName = authorInfo?.name || decodedAuthor

	return {
		title: `Posts by ${displayName}`,
		description: `All blog posts written by ${displayName}`,
	}
}
