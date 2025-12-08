"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function UrlViewPage() {
  const params = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    checkUrl();
  }, []);

  const checkUrl = async (pwd?: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/urls/${params.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd || undefined }),
      });

      const data = await response.json();

      if (data.success) {
        setRedirecting(true);
        setTimeout(() => {
          window.location.href = data.url.originalUrl;
        }, 2000);
      } else if (data.requiresPassword) {
        setRequiresPassword(true);
        setLoading(false);
      } else {
        setError(data.error || "Failed to access URL");
        setLoading(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkUrl(password);
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

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {loading && !requiresPassword && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading...</p>
            </div>
          )}

          {redirecting && (
            <div className="text-center">
              <div className="text-4xl mb-4">🔗</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Redirecting...
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                You will be redirected to the original URL shortly.
              </p>
            </div>
          )}

          {requiresPassword && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Password Required
              </h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter password to access this URL
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          {error && !requiresPassword && (
            <div className="text-center">
              <div className="text-4xl mb-4">❌</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Error
              </h2>
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
