import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import 'highlight.js/styles/github-dark.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: {
    default: 'Blog by Wijay - Web Development Insights',
    template: '%s | Blog by Wijay',
  },
  description:
    'Thoughts, tutorials, and insights about web development and technology.',
  keywords: [
    'devops',
    'cybersecurity',
    'web development',
    'javascript',
    'react',
    'django',
    'nextjs',
    'programming',
    'tutorial',
  ],
  authors: [{ name: 'Pubudu Wijesundara' }],
  creator: 'ItsWijay',
  metadataBase: new URL('https://blog.itswijay.vercel.app'),
  alternates: {
    types: {
      'application/rss+xml': 'https://blog.itswijay.vercel.app/rss.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blog.itswijay.vercel.app',
    title: 'Blog by Wijay',
    description:
      'Thoughts, tutorials, and insights about DevOps, Cyber Security, web development and technology.',
    siteName: 'Blog by Wijay',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog by Wijay',
    description:
      'Thoughts, tutorials, and insights about web development and technology.',
    creator: '@itswijay',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href="/rss.xml"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
