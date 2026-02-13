"use client";

import { useState, useEffect } from "react";

interface Activity {
  _id: string;
  action: string;
  description: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo, show mock data. Replace with Convex query when connected.
    const mockActivities: Activity[] = [
      {
        _id: "1",
        action: "memory_update",
        description: "Updated memory with daily highlights",
        timestamp: Date.now() - 1000 * 60 * 5,
      },
      {
        _id: "2",
        action: "email_sent",
        description: "Sent follow-up email to client",
        timestamp: Date.now() - 1000 * 60 * 30,
      },
      {
        _id: "3",
        action: "cron_task",
        description: "Ran nightly property scan",
        timestamp: Date.now() - 1000 * 60 * 60 * 2,
      },
      {
        _id: "4",
        action: "crm_update",
        description: "Updated lead status in Eagle CRM",
        timestamp: Date.now() - 1000 * 60 * 60 * 5,
      },
    ];
    setActivities(mockActivities);
    setLoading(false);
  }, []);

  const formatRelativeTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getActionIcon = (action: string) => {
    const icons: Record<string, string> = {
      memory_update: "🧠",
      email_sent: "📧",
      cron_task: "⏰",
      crm_update: "📊",
      browser_action: "🌐",
      file_created: "📄",
      webhook_received: "🔗",
    };
    return icons[action] || "⚡";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-200">Recent Activity</h2>
        <span className="text-sm text-gray-500">{activities.length} events</span>
      </div>

      <div className="bg-gray-900 rounded-lg border border-gray-800 divide-y divide-gray-800">
        {activities.map((activity) => (
          <div
            key={activity._id}
            className="p-4 flex items-start gap-4 hover:bg-gray-800/50 transition-colors"
          >
            <span className="text-2xl">{getActionIcon(activity.action)}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200 truncate">
                {activity.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {activity.action} • {formatRelativeTime(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No activity recorded yet
        </div>
      )}
    </div>
  );
}
