# Blog API Documentation

This document describes the API endpoints available for fetching blog posts.

## Base URL

When running locally: `http://localhost:3000/api/posts`
When deployed: `https://yourdomain.com/api/posts`

## Endpoints

### 1. Get Latest Posts

**Endpoint:** `GET /api/posts/latest`

Returns the most recent blog posts sorted by date.

**Query Parameters:**

- `limit` (optional, default: 5) - Number of posts to return

**Example Request:**

```bash
curl http://localhost:3000/api/posts/latest?limit=3
```

**Example Response:**

```json
{
  "success": true,
  "count": 3,
  "posts": [
    {
      "slug": "javascript-es2024-features",
      "title": "JavaScript ES2024: New Features You Should Know",
      "excerpt": "Explore the latest JavaScript features from ES2024...",
      "date": "2025-10-08",
      "author": "Your Name",
      "tags": ["javascript", "es2024", "web-development"],
      "views": 650,
      "featured": false,
      "readingTime": 1,
      "url": "/blog/javascript-es2024-features"
    }
  ]
}
```

### 2. Get Popular Posts

**Endpoint:** `GET /api/posts/popular`

Returns the most popular blog posts sorted by view count.

**Query Parameters:**

- `limit` (optional, default: 5) - Number of posts to return

**Example Request:**

```bash
curl http://localhost:3000/api/posts/popular?limit=3
```

**Example Response:**

```json
{
  "success": true,
  "count": 3,
  "posts": [
    {
      "slug": "react-hooks-explained",
      "title": "React Hooks Explained: useState, useEffect, and More",
      "excerpt": "A comprehensive guide to understanding and using React Hooks...",
      "date": "2025-09-28",
      "author": "Your Name",
      "tags": ["react", "javascript", "hooks"],
      "views": 2100,
      "featured": true,
      "readingTime": 1,
      "url": "/blog/react-hooks-explained"
    }
  ]
}
```

### 3. Get All Posts

**Endpoint:** `GET /api/posts`

Returns all blog posts with optional filtering.

**Query Parameters:**

- `limit` (optional) - Number of posts to return
- `tag` (optional) - Filter posts by tag

**Example Requests:**

```bash
# Get all posts
curl http://localhost:3000/api/posts

# Get posts with specific tag
curl http://localhost:3000/api/posts?tag=react

# Get 10 posts with specific tag
curl http://localhost:3000/api/posts?tag=javascript&limit=10
```

**Example Response:**

```json
{
  "success": true,
  "count": 5,
  "posts": [...]
}
```

## CORS Support

All endpoints support CORS with the following headers:

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type`

This allows you to call these APIs from your portfolio website hosted on a different domain.

## Caching

Responses include cache headers for optimal performance:

- Latest/Popular posts: Cached for 1 hour, stale-while-revalidate for 24 hours
- All posts: Cached for 30 minutes, stale-while-revalidate for 1 hour

## Using in Your Portfolio

### JavaScript/React Example:

```javascript
// Fetch latest posts
async function getLatestPosts() {
  const response = await fetch('http://localhost:3000/api/posts/latest?limit=3')
  const data = await response.json()

  if (data.success) {
    return data.posts
  }
  throw new Error(data.error)
}

// Fetch popular posts
async function getPopularPosts() {
  const response = await fetch(
    'http://localhost:3000/api/posts/popular?limit=3'
  )
  const data = await response.json()

  if (data.success) {
    return data.posts
  }
  throw new Error(data.error)
}

// Usage in React
function ArticlesSection() {
  const [posts, setPosts] = React.useState([])

  React.useEffect(() => {
    getLatestPosts().then(setPosts)
  }, [])

  return (
    <div>
      {posts.map((post) => (
        <article key={post.slug}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <a href={`https://yourblog.com${post.url}`}>Read more</a>
        </article>
      ))}
    </div>
  )
}
```

### Next.js Example:

```javascript
// In your portfolio Next.js page
export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/posts/latest?limit=3')
  const data = await res.json()

  return {
    props: {
      posts: data.posts,
    },
    revalidate: 3600, // Revalidate every hour
  }
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

HTTP status codes:

- `200` - Success
- `500` - Server error
