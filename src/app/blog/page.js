import Link from 'next/link'
import { getAllPosts, getAllTags } from '@/lib/posts'
import ViewCount from '@/components/ViewCount'
import LanguageFilter from '@/components/LanguageFilter'
import LanguageBadge from '@/components/LanguageBadge'

export const metadata = {
  title: 'Blog | Pubudu Wijesundara',
  description:
    'Read articles about DevOps, Cyber Security, web development, JavaScript, React, Next.js, and more.',
}

export default async function BlogPage({ searchParams }) {
  const allPosts = getAllPosts()
  const tags = getAllTags()

  // Await searchParams in Next.js 15
  const params = await searchParams

  // Filter posts by language
  const langFilter = params?.lang
  const posts =
    langFilter && langFilter !== 'all'
      ? allPosts.filter((post) => post.language === langFilter)
      : allPosts

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about technology.
          </p>
        </div>

        {/* Language Filter */}
        <LanguageFilter />

        {/* Tags Filter */}
        <div className="mb-8 text-center">
          <Link
            href="/blog/tags"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-3"
          >
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
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            Browse by Tags
          </Link>
          <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
            {tags.slice(0, 10).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tags/${tag}`}
                className="text-sm bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="p-6">
                  {/* Badges */}
                  <div className="flex gap-2 mb-3">
                    {post.featured && (
                      <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                    <LanguageBadge language={post.language} />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <ViewCount slug={post.slug} />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No blog posts found. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
