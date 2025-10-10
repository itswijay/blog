import Link from 'next/link'
import { getAllTags, getAllPosts } from '@/lib/posts'

export const metadata = {
  title: 'Tags | Blog by Wijay',
  description: 'Browse articles by tags and topics.',
}

export default function TagsPage() {
  const tags = getAllTags()
  const allPosts = getAllPosts()

  // Count posts per tag
  const tagCounts = {}
  allPosts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse by Tags
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore articles organized by topics and technologies.
          </p>
        </div>

        {/* Tags Cloud */}
        <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
          {tags.map((tag) => {
            const count = tagCounts[tag] || 0
            // Size based on count
            const sizeClass =
              count > 2 ? 'text-xl' : count > 1 ? 'text-lg' : 'text-base'

            return (
              <Link
                key={tag}
                href={`/blog/tags/${tag}`}
                className={`${sizeClass} bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700`}
              >
                <span className="font-medium">#{tag}</span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  ({count})
                </span>
              </Link>
            )
          })}
        </div>

        {/* Back to Blog */}
        <div className="mt-12 text-center">
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
            Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}
