'use client'

const languageConfig = {
  en: {
    label: 'EN',
    name: 'English',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  },
  si: {
    label: 'සි',
    name: 'සිංහල',
    color:
      'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  },
}

export default function LanguageBadge({
  language = 'en',
  showFullName = false,
}) {
  const config = languageConfig[language] || languageConfig.en

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${config.color}`}
      title={config.name}
    >
      {showFullName ? config.name : config.label}
    </span>
  )
}
