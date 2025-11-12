---
title: "Client Side Rendering (CSR) vs Server Side Rendering (SSR)"
date: 2025-11-12
excerpt: What is the difference between client side rendering and server side rendering
author: "Pubudu Wijesundara"
tags: ['dev', 'CSR', 'SSR', 'CSRvsSSR', 'SEO', 'Web-development', 'Programming']
image: '/images/blog/csr-vs-ssr.png'
language: 'en'
featured: true
---

![CSR-vs-SSR Banner](/images/blog/csr-vs-ssr.png)
## **Client Side Rendering**

In this method the browser (client) downloads a minimal html file and then runs on the user's device to build and render the page.

**Flow**
*Browser loads an empty/basic HTML shell => JavaScript (React, Vue, Angular, ...) downloads => Page is rendered dynamically in the browser*

So basically,
*Server sends the code → Browser runs the code → You see the page*

Let's talk about the pros and cons,
#### Pros
- Rich interactivity (single-page apps).
- Faster page updates after the first load.
- Great for dynamic user experiences (e.g: dashboards)

#### Cons
- Slower first load
- SEO can be worse (search engine may strugle to index dynamic content)
- Hevier on the user's device

#### Example Scenario
Let’s say you open a movie website built with React (CSR):
1. The first time you open it blank screen → JS loads → data fetched → page appears (slower).
2. When you click on another movie — page doesn’t reload → data updates instantly (faster).

</br>

## **Sever Side Rendering**

In this method the server generates the HTML for the page before sending it to the browser. The client receives a fully formed page, which can be hydrated with JavaScript later for interactivity.

**Flow**
*Browser request a page → Server runs logic (React/Next.js, Django, etc.) and sends complete HTML → User immediately sees content (good for SEO)*

#### **Pros**
- Faster first paint (better performance for first time user)
- SEO friendly (search engines get full HTML)
- Works better on slow devices

#### **Cons**
- Heavier load on the server (each request regenerates HTML)
- Slover Navigation compared to CSR (unless optimized)
- More complex setup

#### **Example Scenario**
Let’s say you open the same movie website but with SSR (e.g., built using Next.js):
1. You open the site, the server fetches movie data and sends a full HTML page, appears **immediately**.
2. You click on another movie, the server builds that page and sends it, a **short reload** happens, but content is ready.

#### **CSR vs SSR (Clear Comparison)**


| Feature                    | **Client-Side Rendering (CSR)** | **Server-Side Rendering (SSR)** |
| -------------------------- | ------------------------------- | ------------------------------- |
| **Where page is rendered** | In browser (client)             | On server                       |
| **Initial load**           | Slower (wait for JS)            | Faster (HTML ready)             |
| **SEO**                    | Weak (without special setup)    | Excellent                       |
| **Server load**            | Light                           | Heavier                         |
| **Navigation**             | Instant (no reload)             | Slight reload between pages     |
| **Framework examples**     | React, Vue                      | Next.js, Nuxt.js, Remix         |
| **Data fetching**          | After page loads (in browser)   | Before page is sent (on server) |
| **Best for**               | Web apps, dashboards            | Blogs, e-commerce, news sites   |