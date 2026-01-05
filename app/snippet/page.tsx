"use client";

import { useState } from "react";
import Link from "next/link";

const LANGUAGES = [
  "plaintext",
  "javascript",
  "typescript",
  "python",
  "java",
  "c",
  "cpp",
  "csharp",
  "go",
  "rust",
  "php",
  "ruby",
  "swift",
  "kotlin",
  "html",
  "css",
  "sql",
  "json",
  "yaml",
  "markdown",
];

export default function SnippetPage() {
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [customSlug, setCustomSlug] = useState("");
  const [password, setPassword] = useState("");
  const [expiresIn, setExpiresIn] = useState<"never" | "custom">("never");
  const [expirationDays, setExpirationDays] = useState(30);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [result, setResult] = useState<{ shortUrl: string; shortCode: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Calculate expiration date if custom
      let expiresAt: string | undefined;
      if (expiresIn === "custom") {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expirationDays);
        expiresAt = expirationDate.toISOString();
      }

      const response = await fetch("/api/texts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          language,
          customSlug: customSlug || undefined,
          password: password || undefined,
          expiresAt: expiresAt,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({ shortUrl: data.shortUrl, shortCode: data.shortCode });
      } else {
        setError(data.error || "Failed to create snippet");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              PixelShare
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Willkommen bei PixelShare
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Share your files, code, and URLs securely and easily
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
            className="px-6 py-3 rounded-lg font-semibold transition-colors bg-indigo-600 text-white"
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

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Code teilen
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Erstellen und teilen Sie Ihre Code-Snippets
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={10}
                placeholder="function helloWorld() {&#10;    console.log(&quot;Hello, world!&quot;);&#10;}"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
              />
              <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="mr-4">1</span>
                <span className="mr-4">2</span>
                <span>3</span>
              </div>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sprache
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Ablauf
              </label>
              
              <div className="space-y-3">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="radio"
                    value="never"
                    checked={expiresIn === "never"}
                    onChange={(e) => setExpiresIn(e.target.value as "never")}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Nie</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Dieser Paste bleibt unbegrenzt verfügbar
                    </div>
                  </div>
                </label>

                <label className="flex items-start cursor-pointer">
                  <input
                    type="radio"
                    value="custom"
                    checked={expiresIn === "custom"}
                    onChange={(e) => setExpiresIn(e.target.value as "custom")}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <input
                        type="number"
                        min="1"
                        max="365"
                        value={expirationDays}
                        onChange={(e) => setExpirationDays(parseInt(e.target.value))}
                        disabled={expiresIn !== "custom"}
                        className="w-20 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:opacity-50"
                      />
                      <span className="font-medium text-gray-900 dark:text-white">Tage</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Dieser Link wird in {expirationDays === 1 ? "1 Tag" : `${expirationDays} ${expirationDays === 30 ? "Monat" : "Tagen"}`} ablaufen
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Advanced Settings */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium mb-3"
              >
                {showAdvanced ? "▼" : "▶"} Erweiterte Einstellungen (optional)
              </button>

              {showAdvanced && (
                <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div>
                    <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Benutzerdefinierter Link
                    </label>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                        {typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/p/
                      </span>
                      <input
                        type="text"
                        id="customSlug"
                        value={customSlug}
                        onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                        placeholder="mon-paste-code"
                        pattern="[a-zA-Z0-9-_]+"
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Nur Buchstaben, Zahlen, Bindestriche und Unterstriche
                    </p>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Passwort (optional)
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Optional - leer lassen für freien Zugang"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Wird erstellt..." : "Paste erstellen"}
            </button>
          </form>

          {result && (
            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Erfolg! Ihr Paste-URL:
              </h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={result.shortUrl}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={() => {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                      navigator.clipboard.writeText(result.shortUrl);
                    }
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Kopieren
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Made with ❤️ by Leopixel
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
            © 2025 PixelShare. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}
