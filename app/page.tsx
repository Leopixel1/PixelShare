import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                PixelShare
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Share Files, Text & Links
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Modern, secure platform for sharing with URL shortening, expiration, passwords, and QR codes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Link href="/shorten" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                URL Shortener
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Shorten URLs with custom expiration, passwords, and QR codes
              </p>
            </div>
          </Link>

          <Link href="/snippet" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Text Snippets
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share code snippets with syntax highlighting in multiple languages
              </p>
            </div>
          </Link>

          <Link href="/upload" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                File Upload
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Upload files securely with download tracking and protection
              </p>
            </div>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="text-2xl mr-4">🔒</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Password Protection</h4>
                <p className="text-gray-600 dark:text-gray-300">Secure your shares with optional passwords</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-2xl mr-4">⏰</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Expiration Dates</h4>
                <p className="text-gray-600 dark:text-gray-300">Set custom expiration times for all shares</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-2xl mr-4">📊</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Analytics</h4>
                <p className="text-gray-600 dark:text-gray-300">Track clicks, views, and downloads</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-2xl mr-4">📱</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">QR Codes</h4>
                <p className="text-gray-600 dark:text-gray-300">Generate QR codes for easy sharing</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 PixelShare. Modern, secure file sharing platform.</p>
        </div>
      </footer>
    </div>
  );
}
