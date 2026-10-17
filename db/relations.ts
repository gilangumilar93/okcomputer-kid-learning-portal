import { relations } from "drizzle-orm";
import { kids, lessons, progress, users } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  kids: many(kids),
}));

export const kidsRelations = relations(kids, ({ one, many }) => ({
  parent: one(users, { fields: [kids.parentId], references: [users.id] }),
  progress: many(progress),
}));

export const lessonsRelations = relations(lessons, ({ many }) => ({
  progress: many(progress),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  kid: one(kids, { fields: [progress.kidId], references: [kids.id] }),
  lesson: one(lessons, { fields: [progress.lessonId], references: [lessons.id] }),
}));
