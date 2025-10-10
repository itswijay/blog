import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'

export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag')
    const limit = parseInt(searchParams.get('limit') || '0')

    // Get all posts
    let posts = getAllPosts()

    // Filter by tag if provided
    if (tag) {
      posts = posts.filter((post) => post.tags && post.tags.includes(tag))
    }

    // Limit results if specified
    if (limit > 0) {
      posts = posts.slice(0, limit)
    }

    // Return posts with relevant data for portfolio
    const formattedPosts = posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      author: post.author,
      tags: post.tags,
      views: post.views,
      featured: post.featured,
      readingTime: Math.ceil(post.excerpt?.split(/\s+/g).length / 200) || 1,
      url: `/blog/${post.slug}`,
    }))

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
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch posts',
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
