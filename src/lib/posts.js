import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import remarkRehype from 'remark-rehype'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

/**
 * Get all blog posts with metadata
 * @returns {Array} Array of post objects with metadata
 */
export function getAllPosts() {
  // Get all markdown files from the posts directory
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // Combine the data with the slug
      return {
        slug,
        ...matterResult.data,
      }
    })

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * Get a single post by slug
 * @param {string} slug - The post slug
 * @returns {Object} Post object with content and metadata
 */
export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string with syntax highlighting
  const processedContent = await remark()
    .use(remarkGfm) // Enable GitHub Flavored Markdown (tables, strikethrough, etc.)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Calculate reading time (average 200 words per minute)
  const words = matterResult.content.split(/\s+/g).length
  const readingTime = Math.ceil(words / 200)

  // Combine the data with the slug and content
  return {
    slug,
    contentHtml,
    readingTime,
    ...matterResult.data,
  }
}

/**
 * Get latest posts
 * @param {number} limit - Number of posts to return
 * @returns {Array} Array of latest post objects
 */
export function getLatestPosts(limit = 5) {
  const allPosts = getAllPosts()

  // Already sorted by date, just slice
  return allPosts.slice(0, limit)
}

/**
 * Get popular posts based on views
 * @param {number} limit - Number of posts to return
 * @returns {Array} Array of popular post objects
 */
export function getPopularPosts(limit = 5) {
  const allPosts = getAllPosts()

  // Sort by views (highest first)
  const popularPosts = allPosts.sort((a, b) => {
    const viewsA = a.views || 0
    const viewsB = b.views || 0
    return viewsB - viewsA
  })

  return popularPosts.slice(0, limit)
}

/**
 * Get featured posts
 * @returns {Array} Array of featured post objects
 */
export function getFeaturedPosts() {
  const allPosts = getAllPosts()

  return allPosts.filter((post) => post.featured === true)
}

/**
 * Get posts by tag
 * @param {string} tag - The tag to filter by
 * @returns {Array} Array of post objects with the specified tag
 */
export function getPostsByTag(tag) {
  const allPosts = getAllPosts()

  return allPosts.filter((post) => post.tags && post.tags.includes(tag))
}

/**
 * Get all unique tags from all posts
 * @returns {Array} Array of unique tags
 */
export function getAllTags() {
  const allPosts = getAllPosts()
  const tags = new Set()

  allPosts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tags.add(tag))
    }
  })

  return Array.from(tags).sort()
}

/**
 * Get all post slugs for static generation
 * @returns {Array} Array of slug strings
 */
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}
