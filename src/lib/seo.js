export function generateBlogPostJsonLd(post, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image || 'https://blog.itswijay.vercel.app/default-og-image.jpg',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Blog by Wijay',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blog.itswijay.vercel.app/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags?.join(', '),
    articleSection: post.tags?.[0] || 'Technology',
    wordCount: post.readingTime ? post.readingTime * 200 : 0,
  }
}

export function generateBlogJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog by Wijay',
    description:
      'Thoughts, tutorials, and insights about web development and technology.',
    url: 'https://blog.itswijay.vercel.app/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Pubudu Wijesundara',
    },
  }
}

export function generateBreadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
