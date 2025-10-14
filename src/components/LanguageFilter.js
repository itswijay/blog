'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const languages = [
  { code: 'all', label: 'All Posts', icon: '' },
  { code: 'en', label: 'English', icon: '' },
  { code: 'si', label: 'සිංහල', icon: '🇱🇰' },
]

export default function LanguageFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'all'

  const handleLanguageChange = (langCode) => {
    if (langCode === 'all') {
      router.push('/blog')
    } else {
      router.push(`/blog?lang=${langCode}`)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentLang === lang.code
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <span className="mr-1.5">{lang.icon}</span>
          {lang.label}
        </button>
      ))}
    </div>
  )
}
