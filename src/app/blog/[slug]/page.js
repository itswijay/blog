import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/posts'
import BlogContent from '@/components/BlogContent'
import RelatedPosts from '@/components/RelatedPosts'
import ViewCounter from '@/components/ViewCounter'
import { generateBlogPostJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo'

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()

  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata for each post
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Your Blog`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  // If post doesn't exist, show 404
  if (!post) {
    notFound()
  }

  // Get all posts for related posts
  const allPosts = getAllPosts()

  // Generate JSON-LD for SEO
  const baseUrl = 'https://blog.itswijay.vercel.app'
  const postUrl = `${baseUrl}/blog/${post.slug}`
  const jsonLd = generateBlogPostJsonLd(post, postUrl)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: baseUrl },
    { name: 'Blog', url: `${baseUrl}/blog` },
    { name: post.title, url: postUrl },
  ])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          {/* Featured Badge */}
          {post.featured && (
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold px-3 py-1 rounded mb-4">
              Featured
            </span>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>{post.author}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{post.readingTime} min read</span>
            </div>

            <ViewCounter slug={post.slug} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Divider */}
        <hr className="border-gray-300 dark:border-gray-700 mb-8" />

        {/* Content */}
        <BlogContent contentHtml={post.contentHtml} />

        {/* Related Posts */}
        <RelatedPosts
          currentSlug={post.slug}
          currentTags={post.tags}
          allPosts={allPosts}
        />

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>
        </footer>
      </article>
    </div>
  )
}
