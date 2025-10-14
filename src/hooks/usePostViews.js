'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to track and display post views
 * @param {string} slug - The post slug
 * @returns {number} Current view count
 */
export function usePostViews(slug) {
  const [views, setViews] = useState(0)

  useEffect(() => {
    if (!slug) return

    // Increment view count
    const incrementViews = async () => {
      try {
        const response = await fetch('/api/views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug }),
        })

        if (response.ok) {
          const data = await response.json()
          setViews(data.views)
        }
      } catch (error) {
        console.error('Error tracking view:', error)
      }
    }

    // Fetch current views
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/views?slug=${slug}`)
        if (response.ok) {
          const data = await response.json()
          setViews(data.views)
        }
      } catch (error) {
        console.error('Error fetching views:', error)
      }
    }

    // Increment view after a short delay (avoid bots/quick bounces)
    const timer = setTimeout(incrementViews, 3000)

    // Fetch current count immediately
    fetchViews()

    return () => clearTimeout(timer)
  }, [slug])

  return views
}
