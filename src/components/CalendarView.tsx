"use client";

import { useState } from "react";

interface ScheduledTask {
  _id: string;
  title: string;
  description?: string;
  scheduledAt: number;
  status?: string;
  recurring?: boolean;
}

export function CalendarView() {
  const [tasks] = useState<ScheduledTask[]>([
    {
      _id: "1",
      title: "Daily Memory Distillation",
      description: "Review and summarize conversations",
      scheduledAt: new Date().setHours(1, 0, 0, 0),
      status: "scheduled",
      recurring: true,
    },
    {
      _id: "2",
      title: "Weekly Memory Archive",
      description: "Archive old memory files",
      scheduledAt: new Date(Date.now() + 86400000 * 2).setHours(2, 0, 0, 0),
      status: "scheduled",
      recurring: true,
    },
    {
      _id: "3",
      title: "Property Market Scan",
      description: "Scan for new listings and leads",
      scheduledAt: new Date().setHours(4, 0, 0, 0),
      status: "scheduled",
      recurring: true,
    },
  ]);

  const getWeekDays = () => {
    const days = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();

  const getTasksForDay = (day: Date) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.scheduledAt);
      return (
        taskDate.getDate() === day.getDate() &&
        taskDate.getMonth() === day.getMonth() &&
        taskDate.getFullYear() === day.getFullYear()
      );
    });
  };

  const formatDayName = (day: Date) => {
    return day.toLocaleDateString("en-US", { weekday: "short" });
  };

  const formatDayNumber = (day: Date) => {
    return day.getDate();
  };

  const isToday = (day: Date) => {
    const today = new Date();
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-200">Weekly Schedule</h2>
        <span className="text-sm text-gray-500">
          {weekDays[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
          {weekDays[6].toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`min-h-[200px] bg-gray-900 rounded-lg border p-3 ${
              isToday(day) ? "border-blue-500/50" : "border-gray-800"
            }`}
          >
            <div className="text-center mb-3">
              <div className="text-xs text-gray-500 uppercase">
                {formatDayName(day)}
              </div>
              <div
                className={`text-lg font-semibold ${
                  isToday(day) ? "text-blue-400" : "text-gray-200"
                }`}
              >
                {formatDayNumber(day)}
              </div>
            </div>

            <div className="space-y-2">
              {getTasksForDay(day).map((task) => (
                <div
                  key={task._id}
                  className="p-2 bg-gray-800 rounded text-xs border border-gray-700"
                >
                  <div className="font-medium text-gray-200 truncate">
                    {task.title}
                  </div>
                  <div className="text-gray-500 mt-1">
                    {formatTime(task.scheduledAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No scheduled tasks
        </div>
      )}
    </div>
  );
}
