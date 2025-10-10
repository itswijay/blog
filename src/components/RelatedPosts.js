import Link from 'next/link'

export default function RelatedPosts({ currentSlug, currentTags, allPosts }) {
  // Find related posts based on shared tags
  const relatedPosts = allPosts
    .filter((post) => {
      // Exclude current post
      if (post.slug === currentSlug) return false

      // Check if post has any shared tags
      if (!post.tags || !currentTags) return false

      return post.tags.some((tag) => currentTags.includes(tag))
    })
    .map((post) => {
      // Calculate relevance score (number of shared tags)
      const sharedTags = post.tags.filter((tag) => currentTags.includes(tag))
      return {
        ...post,
        relevanceScore: sharedTags.length,
      }
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3) // Get top 3 related posts

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Date */}
                <time
                  className="text-xs text-gray-500 dark:text-gray-400"
                  dateTime={post.date}
                >
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
