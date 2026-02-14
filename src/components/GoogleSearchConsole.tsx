"use client";

import { useState, useEffect } from "react";

interface GSCData {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  topQueries: Array<{ query: string; clicks: number; position: number }>;
}

export function GoogleSearchConsole() {
  const [data, setData] = useState<GSCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For demo, show mock data. Replace with GSC API call when connected.
    const mockData: GSCData = {
      clicks: 1247,
      impressions: 8934,
      ctr: 14.0,
      position: 8.5,
      topQueries: [
        { query: "real estate melbourne", clicks: 234, position: 7.2 },
        { query: "property for sale", clicks: 189, position: 9.1 },
        { query: "houses for sale melbourne", clicks: 156, position: 6.8 },
        { query: "melbourne real estate agents", clicks: 123, position: 11.3 },
        { query: "forge real estate", clicks: 98, position: 4.2 },
      ],
    };
    setData(mockData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/50 border border-red-800 rounded-lg">
        <p className="text-red-400">{error}</p>
        <p className="text-sm text-gray-400 mt-2">
          Configure GSC credentials to connect.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
        <p className="text-gray-400">No GSC data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-200">
          Google Search Console
        </h2>
        <span className="text-sm text-gray-500">Last 28 days</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
          <div className="text-2xl font-bold text-blue-400">
            {data.clicks.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Clicks</div>
        </div>
        <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
          <div className="text-2xl font-bold text-green-400">
            {data.impressions.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Impressions</div>
        </div>
        <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
          <div className="text-2xl font-bold text-purple-400">{data.ctr}%</div>
          <div className="text-sm text-gray-400">CTR</div>
        </div>
        <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
          <div className="text-2xl font-bold text-yellow-400">
            #{data.position.toFixed(1)}
          </div>
          <div className="text-sm text-gray-400">Avg Position</div>
        </div>
      </div>

      {/* Top Queries */}
      <div className="bg-gray-900 rounded-lg border border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <h3 className="font-medium text-gray-200">Top Queries</h3>
        </div>
        <div className="divide-y divide-gray-800">
          {data.topQueries.map((item, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-200 truncate">
                  {item.query}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Position: #{item.position.toFixed(1)}
                </div>
              </div>
              <div className="text-sm font-medium text-blue-400">
                {item.clicks} clicks
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
