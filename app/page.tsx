"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"link" | "paste" | "file">("link");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                SnowShare
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Willkommen bei SnowShare
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Teilen Sie Ihre Dateien, Ihren Code und Ihre URLs sicher und einfach.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 space-x-2">
          <Link 
            href="/shorten"
            className="px-6 py-3 rounded-lg font-semibold transition-colors bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700"
          >
            LinkShare
          </Link>
          <Link 
            href="/snippet"
            className="px-6 py-3 rounded-lg font-semibold transition-colors bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700"
          >
            PasteShare
          </Link>
          <Link 
            href="/upload"
            className="px-6 py-3 rounded-lg font-semibold transition-colors bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700"
          >
            FileShare
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Wählen Sie eine Option
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Klicken Sie auf eine der Schaltflächen oben, um zu beginnen.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="text-4xl mb-4">🔗</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">LinkShare</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Erstellen Sie einen teilbaren Link für jede URL
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="text-4xl mb-4">📝</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">PasteShare</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Erstellen und teilen Sie Ihre Code-Snippets
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="text-4xl mb-4">📁</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">FileShare</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Laden Sie Ihre Dateien hoch und teilen Sie sie einfach
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Made with ❤️ by Romain
          </p>
          <div className="flex justify-center space-x-4 mb-2">
            <a href="https://github.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              GitHub
            </a>
            <a href="/license" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              License
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 SnowShare. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}
