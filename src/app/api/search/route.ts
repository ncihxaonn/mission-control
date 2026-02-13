import { NextResponse } from "next/server";
import { readdir, readFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  const { query } = await request.json();
  
  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const workspacePath = "/Users/nixon/.openclaw/workspace";
  const searchResults: Array<{
    type: "memory" | "document" | "task";
    title: string;
    snippet: string;
    path: string;
  }> = [];
  
  const searchLower = query.toLowerCase();

  // Search memory files
  const memoryDir = join(workspacePath, "memory");
  try {
    const memoryFiles = await readdir(memoryDir);
    for (const file of memoryFiles) {
      if (file.endsWith(".md")) {
        const content = await readFile(join(memoryDir, file), "utf-8");
        if (content.toLowerCase().includes(searchLower)) {
          const lines = content.split("\n");
          const matchingLine = lines.find((l) =>
            l.toLowerCase().includes(searchLower)
          );
          searchResults.push({
            type: "memory",
            title: file,
            snippet: matchingLine?.slice(0, 100) || content.slice(0, 100),
            path: join(memoryDir, file),
          });
        }
      }
    }
  } catch {
    // Memory dir might not exist
  }

  // Search root markdown files
  const rootFiles = await readdir(workspacePath);
  for (const file of rootFiles) {
    if (file.endsWith(".md") && file !== "MEMORY.md") {
      try {
        const content = await readFile(join(workspacePath, file), "utf-8");
        if (content.toLowerCase().includes(searchLower)) {
          const lines = content.split("\n");
          const matchingLine = lines.find((l) =>
            l.toLowerCase().includes(searchLower)
          );
          searchResults.push({
            type: "document",
            title: file,
            snippet: matchingLine?.slice(0, 100) || content.slice(0, 100),
            path: join(workspacePath, file),
          });
        }
      } catch {
        // Skip files that can't be read
      }
    }
  }

  // Add mock task results
  const mockTasks = [
    { title: "Daily Memory Distillation", snippet: "Run at 1 AM daily" },
    { title: "Weekly Memory Archive", snippet: "Run at 2 AM Sundays" },
    { title: "Property Lead Scan", snippet: "Scan for motivated sellers" },
  ];

  for (const task of mockTasks) {
    if (
      task.title.toLowerCase().includes(searchLower) ||
      task.snippet.toLowerCase().includes(searchLower)
    ) {
      searchResults.push({
        type: "task",
        title: task.title,
        snippet: task.snippet,
        path: "scheduled task",
      });
    }
  }

  return NextResponse.json({ results: searchResults });
}
