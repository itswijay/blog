import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Blog by Wijay',
  description: 'Privacy policy for Blog by Wijay',
}

export default function PrivacyPage() {
  const lastUpdated = 'October 19, 2025'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 space-y-6">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Welcome to Blog by Wijay. This Privacy Policy explains how we
                collect, use, and protect your information when you visit our
                blog. We are committed to ensuring your privacy and being
                transparent about our data practices.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    1. Automatically Collected Information
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Page views and reading statistics</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>IP address (anonymized)</li>
                    <li>Time and date of visits</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    2. Information You Provide
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Comments: Name, email address (not publicly displayed),
                      and comment content
                    </li>
                    <li>
                      Newsletter: Email address (if you subscribe to updates)
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 dark:text-gray-300">
                <li>To display and manage blog comments</li>
                <li>To improve website performance and user experience</li>
                <li>To analyze traffic and usage patterns</li>
                <li>To send newsletters (only if you explicitly subscribe)</li>
                <li>To prevent spam and abuse</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Third-Party Services
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>We use the following third-party services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Vercel:</strong> Website hosting and deployment
                  </li>
                  <li>
                    <strong>Supabase:</strong> Database for view counts and
                    comments (when implemented)
                  </li>
                  <li>
                    <strong>Google Fonts:</strong> Web fonts for better
                    typography
                  </li>
                </ul>
                <p className="mt-4">
                  These services may collect their own data according to their
                  respective privacy policies.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We use essential cookies to ensure the website functions
                properly. These cookies do not collect personal information and
                are necessary for basic functionality like remembering your
                theme preference (dark/light mode).
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Data Security
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We implement appropriate security measures to protect your
                information from unauthorized access, alteration, or
                destruction. All data is stored securely using industry-standard
                encryption and security practices.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your Rights
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 dark:text-gray-300">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Unsubscribe from newsletters at any time</li>
                <li>Delete your comments</li>
              </ul>
            </section>

            {/* Children Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Children&apos;s Privacy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This website is not intended for children under 13 years of age.
                We do not knowingly collect personal information from children.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this privacy policy from time to time. Any changes
                will be posted on this page with an updated revision date.
              </p>
            </section>

            {/* Contact */}
            <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy or want to
                exercise your rights, please contact us:
              </p>
              <div className="mt-4 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:pubudu@itswijay.me"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    pubudu@itswijay.me
                  </a>
                </p>
                <p>
                  <strong>Website:</strong>{' '}
                  <Link
                    href="/"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    https://blog.itswijay.vercel.app
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
