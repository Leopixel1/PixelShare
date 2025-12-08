"use client";

import { useState } from "react";
import Link from "next/link";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [result, setResult] = useState<{ shortUrl: string; shortCode: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (password) formData.append("password", password);
      if (expiresAt) formData.append("expiresAt", expiresAt);

      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult({ shortUrl: data.shortUrl, shortCode: data.shortCode });
      } else {
        setError(data.error || "Failed to upload file");
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            File Upload
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Upload files securely with optional password protection
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                File *
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              />
              {file && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password (optional)
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expires at (optional)
              </label>
              <input
                type="datetime-local"
                id="expiresAt"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              />
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
              {loading ? "Uploading..." : "Upload File"}
            </button>
          </form>

          {result && (
            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Success! Your file URL:
              </h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={result.shortUrl}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(result.shortUrl)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
