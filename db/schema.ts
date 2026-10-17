import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
  int,
  json,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("union_id", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 100 }),
  avatar: varchar("avatar", { length: 255 }),
  role: mysqlEnum("role", ["parent", "admin"]).default("parent").notNull(),
  lastSignInAt: timestamp("last_sign_in_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;

export const kids = mysqlTable("kids", {
  id: serial("id").primaryKey(),
  parentId: int("parent_id").notNull(),
  name: varchar("name", { length: 20 }).notNull(),
  avatar: varchar("avatar", { length: 8 }).notNull(),
  color: varchar("color", { length: 64 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Kid = typeof kids.$inferSelect;

export const lessons = mysqlTable("lessons", {
  id: serial("id").primaryKey(),
  subject: mysqlEnum("subject", ["math", "english", "science"]).notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  subtitle: varchar("subtitle", { length: 200 }),
  emoji: varchar("emoji", { length: 8 }),
  sortOrder: int("sort_order").default(0),
  questions: json("questions").$type<LessonQuestion[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Lesson = typeof lessons.$inferSelect;

export type LessonQuestion = {
  prompt: string;
  visual?: string;
  options: string[];
  answer: number;
};

export const progress = mysqlTable("progress", {
  id: serial("id").primaryKey(),
  kidId: int("kid_id").notNull(),
  lessonId: int("lesson_id").notNull(),
  correct: int("correct").default(0),
  total: int("total").default(0),
  durationSec: int("duration_sec").default(0),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export type Progress = typeof progress.$inferSelect;
