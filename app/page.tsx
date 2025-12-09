"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-page">
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-logo rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">P</span>
              </div>
              <h1 className="text-2xl font-bold text-gradient">
                PixelShare
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              {session ? (
                <>
                  {(session.user as any)?.isAdmin && (
                    <Link
                      href="/admin"
                      className="px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-600"
                      style={{ color: 'var(--primary)' }}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {session.user?.email}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 rounded-lg font-medium text-white bg-gradient-primary shadow-lg hover:shadow-xl transition-all duration-200 hover:brightness-90"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    style={{ color: 'var(--primary)' }}
                  >
                    Register
                  </Link>
                  <Link
                    href="/auth/signin"
                    className="px-4 py-2 rounded-lg font-medium text-white bg-gradient-primary shadow-lg hover:shadow-xl transition-all duration-200 hover:brightness-90"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
            Welcome to <span className="text-gradient">PixelShare</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Share your files, code, and URLs securely and easily
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10 space-x-3">
          <Link 
            href="/shorten"
            className="px-8 py-3 rounded-xl font-semibold transition-all duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg border border-gray-200 dark:border-gray-700"
            style={{ 
              '--tw-shadow-color': 'var(--primary)' 
            } as React.CSSProperties}
          >
            🔗 LinkShare
          </Link>
          <Link 
            href="/snippet"
            className="px-8 py-3 rounded-xl font-semibold transition-all duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg border border-gray-200 dark:border-gray-700"
          >
            📝 PasteShare
          </Link>
          <Link 
            href="/upload"
            className="px-8 py-3 rounded-xl font-semibold transition-all duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg border border-gray-200 dark:border-gray-700"
          >
            📁 FileShare
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Choose an Option
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg">
              Click on one of the buttons above to get started
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover-border-primary transition-all duration-200 hover:shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <div className="text-5xl mb-4">🔗</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">LinkShare</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Create shareable links for any URL with custom expiration and password protection
                </p>
              </div>
              
              <div className="p-8 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover-border-secondary transition-all duration-200 hover:shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <div className="text-5xl mb-4">📝</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">PasteShare</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Create and share your code snippets with syntax highlighting
                </p>
              </div>
              
              <div className="p-8 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover-border-primary transition-all duration-200 hover:shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <div className="text-5xl mb-4">📁</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">FileShare</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Upload your files and share them easily with download tracking
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Made with ❤️ by <span className="font-semibold text-gradient">Leopixel</span>
          </p>
          <div className="flex justify-center space-x-4 mb-2">
            <a href="https://github.com/Leopixel1/PixelShare" className="transition-colors hover:opacity-80" style={{ color: 'var(--primary)' }}>
              GitHub
            </a>
            <a href="/license" className="transition-colors hover:opacity-80" style={{ color: 'var(--primary)' }}>
              License
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 PixelShare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
