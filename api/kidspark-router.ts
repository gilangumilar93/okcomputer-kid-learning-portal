import { z } from "zod";
import { createRouter, authedQuery } from "./middleware";
import {
  createKid,
  deleteKid,
  getKidProgress,
  getParentStats,
  listKids,
  listLessons,
  recordProgress,
} from "./queries/kidspark";

export const kidsparkRouter = createRouter({
  // 孩子档案
  kids: authedQuery.query(({ ctx }) => listKids(ctx.user.id)),
  createKid: authedQuery
    .input(
      z.object({
        name: z.string().min(1).max(20),
        avatar: z.string().min(1).max(8),
        color: z.string().min(1).max(64),
      }),
    )
    .mutation(({ ctx, input }) =>
      createKid({ parentId: ctx.user.id, ...input }),
    ),
  deleteKid: authedQuery
    .input(z.object({ kidId: z.number().int().positive() }))
    .mutation(({ ctx, input }) => deleteKid(ctx.user.id, input.kidId)),

  // 课程
  lessons: authedQuery.query(() => listLessons()),
  kidProgress: authedQuery
    .input(z.object({ kidId: z.number().int().positive() }))
    .query(({ ctx, input }) => getKidProgress(ctx.user.id, input.kidId)),

  // 完成课程
  recordProgress: authedQuery
    .input(
      z.object({
        kidId: z.number().int().positive(),
        lessonId: z.number().int().positive(),
        correct: z.number().int().min(0),
        total: z.number().int().positive(),
        durationSec: z.number().int().min(0),
      }),
    )
    .mutation(({ ctx, input }) =>
      recordProgress({ parentId: ctx.user.id, ...input }),
    ),

  // 家长仪表盘
  parentStats: authedQuery.query(({ ctx }) => getParentStats(ctx.user.id)),
});
