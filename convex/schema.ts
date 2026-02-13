import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  activities: defineTable({
    action: v.string(),
    description: v.string(),
    timestamp: v.number(),
    metadata: v.optional(v.any()),
  }),

  scheduledTasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    scheduledAt: v.number(),
    status: v.optional(v.string()),
    recurring: v.optional(v.boolean()),
    cronExpression: v.optional(v.string()),
  }),
});
