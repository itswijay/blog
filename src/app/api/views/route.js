import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

/**
 * GET /api/views?slug=post-slug
 * Get view count for a specific post
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      )
    }

    // Get view count from Supabase
    const { data, error } = await supabase
      .from('post_views')
      .select('views')
      .eq('slug', slug)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found
      throw error
    }

    const views = data?.views || 0

    return NextResponse.json({ slug, views }, { status: 200 })
  } catch (error) {
    console.error('Error fetching views:', error)
    return NextResponse.json(
      { error: 'Failed to fetch views' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/views
 * Increment view count for a post
 */
export async function POST(request) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    // Use Supabase RPC function to increment views atomically
    const { data, error } = await supabase.rpc('increment_post_views', {
      post_slug: slug,
    })

    if (error) throw error

    return NextResponse.json({ slug, views: data || 1 }, { status: 200 })
  } catch (error) {
    console.error('Error incrementing views:', error)
    return NextResponse.json(
      { error: 'Failed to increment views' },
      { status: 500 }
    )
  }
}
