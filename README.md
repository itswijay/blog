# Blog by Wijay

A modern, performant personal blog built with Next.js 15, featuring server-side rendering, markdown-based content management, view tracking with Supabase, and a responsive dark-themed design.

**Live Site:** [blog.itswijay.me](https://blog.itswijay.me)

---

## Table of Contents

- [Blog by Wijay](#blog-by-wijay)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
      - [Supabase Setup](#supabase-setup)
    - [Development](#development)
    - [Production Build](#production-build)
  - [Content Management](#content-management)
    - [Creating Blog Posts](#creating-blog-posts)
    - [Frontmatter Schema](#frontmatter-schema)
  - [API Reference](#api-reference)
    - [Endpoints Overview](#endpoints-overview)
    - [Example Usage](#example-usage)
  - [SEO and Performance](#seo-and-performance)
    - [SEO Features](#seo-features)
    - [Performance Optimizations](#performance-optimizations)
  - [Deployment](#deployment)
    - [Vercel (Recommended)](#vercel-recommended)
    - [Other Platforms](#other-platforms)
  - [Contributing](#contributing)
  - [License](#license)
  - [Author](#author)

---

## Features

- **Server-Side Rendering (SSR)** - Optimized page loading with Next.js App Router
- **Markdown Blog Posts** - Write content in Markdown with frontmatter metadata
- **Syntax Highlighting** - Code blocks with Atom One Dark theme via highlight.js
- **View Tracking** - Real-time post view counts stored in Supabase
- **Popular Posts** - Dynamic ranking based on view counts
- **Related Posts** - Tag-based article recommendations
- **Multi-language Support** - English and Sinhala content filtering
- **Tag-based Navigation** - Browse posts by topics and technologies
- **RSS Feed** - Auto-generated RSS feed at `/rss.xml`
- **SEO Optimized** - JSON-LD structured data, Open Graph, Twitter Cards
- **Sitemap Generation** - Dynamic sitemap for search engine indexing
- **Dark Mode** - Native dark theme with Tailwind CSS
- **Responsive Design** - Mobile-first layout with optimized typography
- **Copy Code Button** - One-click code copying in blog posts
- **Vercel Analytics** - Built-in performance and usage analytics

---

## Tech Stack

| Category            | Technology                                                                |
| ------------------- | ------------------------------------------------------------------------- |
| Framework           | [Next.js 15](https://nextjs.org/) (App Router)                            |
| Language            | JavaScript (React 19)                                                     |
| Styling             | [Tailwind CSS 4](https://tailwindcss.com/)                                |
| Typography          | [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) |
| Database            | [Supabase](https://supabase.com/) (PostgreSQL)                            |
| Markdown            | gray-matter, remark, rehype                                               |
| Syntax Highlighting | rehype-highlight, highlight.js                                            |
| Analytics           | [@vercel/analytics](https://vercel.com/analytics)                         |
| Fonts               | Geist Sans, Geist Mono, Noto Sans Sinhala                                 |
| Deployment          | [Vercel](https://vercel.com/)                                             |

---

## Project Structure

```
blog/
├── public/
│   └── images/
│       ├── blog/          # Blog post images
│       ├── covers/        # Hero and cover images
│       └── logo/          # Site logo assets
├── src/
│   ├── app/
│   │   ├── layout.js      # Root layout with metadata
│   │   ├── page.js        # Homepage (hero, popular, latest posts)
│   │   ├── not-found.js   # Custom 404 page
│   │   ├── robots.js      # Dynamic robots.txt generation
│   │   ├── sitemap.js     # Dynamic sitemap generation
│   │   ├── globals.css    # Global styles and Tailwind imports
│   │   ├── api/
│   │   │   ├── posts/     # Blog posts API endpoints
│   │   │   │   ├── route.js       # GET /api/posts
│   │   │   │   ├── latest/route.js   # GET /api/posts/latest
│   │   │   │   └── popular/route.js  # GET /api/posts/popular
│   │   │   └── views/
│   │   │       └── route.js       # GET/POST /api/views
│   │   ├── blog/
│   │   │   ├── page.js            # Blog listing page
│   │   │   ├── [slug]/page.js     # Individual post page
│   │   │   └── tags/
│   │   │       ├── page.js        # Tags overview
│   │   │       └── [tag]/page.js  # Posts by tag
│   │   ├── privacy/page.js        # Privacy policy
│   │   └── rss.xml/route.js       # RSS feed generation
│   ├── components/
│   │   ├── BlogContent.js    # Markdown renderer with copy button
│   │   ├── Footer.js         # Site footer
│   │   ├── LanguageBadge.js  # Language indicator badge
│   │   ├── LanguageFilter.js # Language filter buttons
│   │   ├── Navbar.js         # Navigation bar
│   │   ├── RelatedPosts.js   # Related articles section
│   │   ├── ViewCount.js      # Static view display
│   │   └── ViewCounter.js    # Interactive view counter
│   ├── content/
│   │   └── blog/             # Markdown blog posts
│   ├── hooks/
│   │   └── usePostViews.js   # View tracking hook
│   └── lib/
│       ├── posts.js          # Post utilities and data fetching
│       ├── seo.js            # JSON-LD schema generators
│       └── supabase.js       # Supabase client configuration
├── API_DOCUMENTATION.md      # API endpoint documentation
├── eslint.config.mjs         # ESLint configuration
├── jsconfig.json             # JavaScript path aliases
├── next.config.mjs           # Next.js configuration
├── package.json              # Dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
└── README.md                 # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun
- Supabase account (for view tracking)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/itswijay/blog.git
cd blog
```

2. Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Supabase Setup

1. Create a new Supabase project
2. Create a `post_views` table with the following schema:

```sql
CREATE TABLE post_views (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Create an RPC function for atomic view increments:

```sql
CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS INTEGER AS $$
DECLARE
  new_views INTEGER;
BEGIN
  INSERT INTO post_views (slug, views)
  VALUES (post_slug, 1)
  ON CONFLICT (slug)
  DO UPDATE SET views = post_views.views + 1, updated_at = NOW()
  RETURNING views INTO new_views;

  RETURN new_views;
END;
$$ LANGUAGE plpgsql;
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## Content Management

### Creating Blog Posts

Blog posts are stored as Markdown files in `src/content/blog/`. Each file requires frontmatter metadata at the top.

1. Create a new `.md` file in `src/content/blog/`:

```bash
touch src/content/blog/my-new-post.md
```

2. Add frontmatter and content:

```markdown
---
title: 'Your Post Title'
date: '2025-11-28'
excerpt: 'A brief description of your post for previews and SEO.'
author: 'Your Name'
tags: ['javascript', 'tutorial', 'web-development']
image: '/images/blog/your-image.jpg'
language: 'en'
featured: false
---

# Your Post Title

Your markdown content goes here...
```

### Frontmatter Schema

| Field      | Type    | Required | Description                                        |
| ---------- | ------- | -------- | -------------------------------------------------- |
| `title`    | string  | Yes      | Post title displayed in headings and metadata      |
| `date`     | string  | Yes      | Publication date in YYYY-MM-DD format              |
| `excerpt`  | string  | Yes      | Short description for previews and SEO             |
| `author`   | string  | Yes      | Author name                                        |
| `tags`     | array   | Yes      | Array of topic tags for categorization             |
| `image`    | string  | No       | Path to featured image                             |
| `language` | string  | No       | Content language: `en` (English) or `si` (Sinhala) |
| `featured` | boolean | No       | Display featured badge on post cards               |

---

## API Reference

The blog exposes a REST API for fetching post data. Full documentation is available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

### Endpoints Overview

| Endpoint             | Method | Description                           |
| -------------------- | ------ | ------------------------------------- |
| `/api/posts`         | GET    | Get all posts with optional filtering |
| `/api/posts/latest`  | GET    | Get most recent posts                 |
| `/api/posts/popular` | GET    | Get posts sorted by view count        |
| `/api/views`         | GET    | Get view count for a specific post    |
| `/api/views`         | POST   | Increment view count for a post       |

### Example Usage

```javascript
// Fetch latest 3 posts
const response = await fetch(
  'https://blog.itswijay.me/api/posts/latest?limit=3'
)
const data = await response.json()
console.log(data.posts)
```

All endpoints support CORS for cross-origin requests from portfolio websites.

---

## SEO and Performance

### SEO Features

- **JSON-LD Structured Data** - BlogPosting and BreadcrumbList schemas
- **Open Graph Tags** - Optimized social media sharing
- **Twitter Cards** - Rich media previews on Twitter
- **Dynamic Sitemap** - Auto-generated at `/sitemap.xml`
- **Robots.txt** - Search engine crawling directives at `/robots.txt`
- **RSS Feed** - Subscribe-ready feed at `/rss.xml`
- **Canonical URLs** - Proper URL canonicalization

### Performance Optimizations

- Server-side rendering with static generation where possible
- Image optimization with Next.js Image component
- Font optimization with `next/font`
- Response caching with stale-while-revalidate
- Code splitting and lazy loading

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel project settings
4. Deploy

### Other Platforms

The project can be deployed to any platform supporting Node.js:

- Build: `npm run build`
- Start: `npm start`

Ensure environment variables are configured in your deployment platform.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

**Pubudu Wijesundara**

- Website: [itswijay.me](https://itswijay.me)
- GitHub: [@itswijay](https://github.com/itswijay)
- LinkedIn: [pubudu-wijesundara](https://linkedin.com/in/pubudu-wijesundara)
