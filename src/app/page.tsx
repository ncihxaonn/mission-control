"use client";

import { useState } from "react";
import { ActivityFeed } from "@/components/ActivityFeed";
import { CalendarView } from "@/components/CalendarView";
import { GlobalSearch } from "@/components/GlobalSearch";
import { GoogleSearchConsole } from "@/components/GoogleSearchConsole";

type Tab = "activity" | "calendar" | "search" | "gsc";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("activity");

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Mission Control
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1 -mb-px">
            {[
              { id: "activity" as const, label: "Activity Feed", icon: "📋" },
              { id: "calendar" as const, label: "Calendar", icon: "📅" },
              { id: "search" as const, label: "Search", icon: "🔍" },
              { id: "gsc" as const, label: "Search Console", icon: "📊" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "activity" && <ActivityFeed />}
        {activeTab === "calendar" && <CalendarView />}
        {activeTab === "search" && <GlobalSearch />}
        {activeTab === "gsc" && <GoogleSearchConsole />}
      </main>
    </div>
  );
}
