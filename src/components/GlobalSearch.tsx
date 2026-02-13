"use client";

import { useState } from "react";

interface SearchResult {
  type: "memory" | "document" | "task";
  title: string;
  snippet: string;
  path: string;
}

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const search = async () => {
    if (!query.trim()) return;
    setSearching(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };

  const getTypeIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "memory":
        return "🧠";
      case "document":
        return "📄";
      case "task":
        return "⏰";
    }
  };

  const getTypeColor = (type: SearchResult["type"]) => {
    switch (type) {
      case "memory":
        return "text-purple-400";
      case "document":
        return "text-blue-400";
      case "task":
        return "text-green-400";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="Search memories, documents, tasks..."
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={search}
          disabled={searching}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 rounded-lg font-medium transition-colors"
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm text-gray-500">{results.length} results</div>
          {results.map((result, index) => (
            <div
              key={index}
              className="p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{getTypeIcon(result.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${getTypeColor(result.type)}`}>
                      {result.title}
                    </span>
                    <span className="text-xs text-gray-600 capitalize">
                      {result.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 truncate">
                    {result.snippet}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 truncate">
                    {result.path}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {query && results.length === 0 && !searching && (
        <div className="text-center py-12 text-gray-500">No results found</div>
      )}

      {!query && (
        <div className="text-center py-12 text-gray-500">
          Enter a search term to find memories, documents, and tasks
        </div>
      )}
    </div>
  );
}
