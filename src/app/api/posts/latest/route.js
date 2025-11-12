import { NextResponse } from 'next/server'
import { getLatestPosts } from '@/lib/posts'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET(request) {
  try {
    // Get limit from query params, default to 5
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '5')

    // Get latest posts
    const posts = getLatestPosts(limit)

    // Calculate accurate reading time for each post
    const postsDirectory = path.join(process.cwd(), 'src/content/blog')

    // Return posts with relevant data for portfolio
    const formattedPosts = posts.map((post) => {
      // Read the full markdown file to calculate accurate reading time
      const fullPath = path.join(postsDirectory, `${post.slug}.md`)
      let readingTime = 1

      if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        const words = matterResult.content.split(/\s+/g).length
        readingTime = Math.ceil(words / 200)
      }

      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        author: post.author,
        tags: post.tags,
        views: post.views,
        featured: post.featured,
        readingTime: readingTime,
        url: `/blog/${post.slug}`,
      }
    })

    // Return with CORS headers for cross-origin access
    return NextResponse.json(
      {
        success: true,
        count: formattedPosts.length,
        posts: formattedPosts,
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cache-Control':
            'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching latest posts:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch latest posts',
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
