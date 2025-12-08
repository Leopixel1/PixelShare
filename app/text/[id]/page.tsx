"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function TextViewPage() {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [text, setText] = useState<{
    content: string;
    title?: string;
    language: string;
    createdAt: string;
  } | null>(null);

  useEffect(() => {
    fetchText();
  }, []);

  const fetchText = async (pwd?: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/texts/${params.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd || undefined }),
      });

      const data = await response.json();

      if (data.success) {
        setText(data.text);
        setLoading(false);
      } else if (data.requiresPassword) {
        setRequiresPassword(true);
        setLoading(false);
      } else {
        setError(data.error || "Failed to access text");
        setLoading(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchText(password);
  };

  const copyToClipboard = () => {
    if (text) {
      navigator.clipboard.writeText(text.content);
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {loading && !requiresPassword && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading...</p>
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
                    Enter password to access this snippet
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

          {text && (
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  {text.title && (
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {text.title}
                    </h2>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Language: {text.language} • Created: {new Date(text.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Copy
                </button>
              </div>
              <div className="rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  language={text.language}
                  style={vscDarkPlus}
                  customStyle={{ margin: 0, borderRadius: "0.5rem" }}
                  showLineNumbers
                >
                  {text.content}
                </SyntaxHighlighter>
              </div>
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
