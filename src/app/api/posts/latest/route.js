import { NextResponse } from 'next/server'
import { getLatestPosts } from '@/lib/posts'

export async function GET(request) {
  try {
    // Get limit from query params, default to 5
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '5')

    // Get latest posts
    const posts = getLatestPosts(limit)

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
