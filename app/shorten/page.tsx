"use client";

import { useState } from "react";
import Link from "next/link";

export default function ShortenPage() {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [password, setPassword] = useState("");
  const [expiresIn, setExpiresIn] = useState<"never" | "custom">("never");
  const [expirationDays, setExpirationDays] = useState(30);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [result, setResult] = useState<{ shortUrl: string; shortCode: string } | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setQrCode(null);

    try {
      // Calculate expiration date if custom
      let expiresAt: string | undefined;
      if (expiresIn === "custom") {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expirationDays);
        expiresAt = expirationDate.toISOString();
      }

      const response = await fetch("/api/urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalUrl: url,
          customSlug: customSlug || undefined,
          password: password || undefined,
          expiresAt: expiresAt,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({ shortUrl: data.shortUrl, shortCode: data.shortCode });

        // Generate QR code
        const qrResponse = await fetch("/api/qr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: data.shortUrl }),
        });

        const qrData = await qrResponse.json();
        if (qrData.success) {
          setQrCode(qrData.qrCode);
        }
      } else {
        setError(data.error || "Failed to shorten URL");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">P</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                PixelShare
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            Share a Link
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create a shareable link for any URL
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 space-x-3">
          <Link 
            href="/shorten"
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
          >
            🔗 LinkShare
          </Link>
          <Link 
            href="/snippet"
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-700 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700"
          >
            📝 PasteShare
          </Link>
          <Link 
            href="/upload"
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-700 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700"
          >
            📁 FileShare
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Share a Link
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Create a shareable link for any URL
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                URL to Share *
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                placeholder="https://example.com/my-page"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Expiration
              </label>
              
              <div className="space-y-3">
                <label className="flex items-start cursor-pointer p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
                  <input
                    type="radio"
                    value="never"
                    checked={expiresIn === "never"}
                    onChange={(e) => setExpiresIn(e.target.value as "never")}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">No Expiration</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      This link will remain active indefinitely
                    </div>
                  </div>
                </label>

                <label className="flex items-start cursor-pointer p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
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
                        className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:opacity-50"
                      />
                      <span className="font-semibold text-gray-900 dark:text-white">Days</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      This link will expire in {expirationDays === 1 ? "1 day" : `${expirationDays} days`}
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
                className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-400 font-semibold transition-colors"
              >
                <span>{showAdvanced ? "▼" : "▶"}</span>
                <span>Advanced Settings (optional)</span>
              </button>

              {showAdvanced && (
                <div className="space-y-4 mt-4 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-xl border border-indigo-100 dark:border-gray-600">
                  <div>
                    <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Custom Link
                    </label>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400 mr-2 font-mono">
                        {typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/l/
                      </span>
                      <input
                        type="text"
                        id="customSlug"
                        value={customSlug}
                        onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                        placeholder="my-custom-link"
                        pattern="[a-zA-Z0-9-_]+"
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Only letters, numbers, hyphens, and underscores
                    </p>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password Protection
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Optional - leave empty for open access"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? "Creating..." : "Create Shared Link"}
            </button>
          </form>

          {result && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Success! Your short link:
              </h3>
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  value={result.shortUrl}
                  readOnly
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white font-mono text-sm"
                />
                <button
                  onClick={() => {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                      navigator.clipboard.writeText(result.shortUrl);
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Copy
                </button>
              </div>
              {qrCode && (
                <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    QR Code:
                  </h4>
                  <img src={qrCode} alt="QR Code" className="mx-auto rounded-lg shadow-lg" />
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Made with ❤️ by <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Leopixel</span>
          </p>
          <div className="flex justify-center space-x-4 mb-2">
            <a href="https://github.com/Leopixel1/PixelShare" className="text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              GitHub
            </a>
            <a href="/license" className="text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
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
