'use client'

import { useEffect } from 'react'

export default function BlogContent({ contentHtml }) {
  useEffect(() => {
    // Add copy buttons to all code blocks
    const codeBlocks = document.querySelectorAll('pre')

    codeBlocks.forEach((pre) => {
      // Skip if button already exists
      if (pre.querySelector('.copy-button')) return

      // Create wrapper
      const wrapper = document.createElement('div')
      wrapper.className = 'relative group'

      // Create copy button
      const button = document.createElement('button')
      button.className =
        'copy-button absolute top-3 right-3 p-2 rounded bg-gray-700/80 hover:bg-gray-600 text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-200'
      button.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      `
      button.setAttribute('aria-label', 'Copy code')

      // Copy functionality
      button.addEventListener('click', async () => {
        const code = pre.querySelector('code')
        const text = code?.textContent || ''

        try {
          await navigator.clipboard.writeText(text)

          // Show checkmark icon
          button.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          `
          button.className =
            'copy-button absolute top-3 right-3 p-2 rounded bg-green-600 hover:bg-green-500 text-white opacity-100 transition-all duration-200'

          setTimeout(() => {
            // Restore copy icon
            button.innerHTML = `
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            `
            button.className =
              'copy-button absolute top-3 right-3 p-2 rounded bg-gray-700/80 hover:bg-gray-600 text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-200'
          }, 2000)
        } catch (err) {
          console.error('Failed to copy:', err)
        }
      })

      // Wrap the pre element
      pre.parentNode.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)
      wrapper.appendChild(button)
    })
  }, [contentHtml])

  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-8 prose-h1:text-gray-900 dark:prose-h1:text-white
        prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-8 prose-h2:text-gray-900 dark:prose-h2:text-white prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h2:pb-2
        prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-gray-900 dark:prose-h3:text-white
        prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-4 prose-h4:text-gray-900 dark:prose-h4:text-white
        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
        prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:border prose-pre:border-gray-700
        prose-blockquote:border-l-4 prose-blockquote:border-l-blue-600 dark:prose-blockquote:border-l-blue-400 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
        prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ul:list-disc prose-ul:ml-6
        prose-ol:text-gray-700 dark:prose-ol:text-gray-300 prose-ol:list-decimal prose-ol:ml-6
        prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-2
        prose-img:rounded-lg prose-img:shadow-lg"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  )
}
