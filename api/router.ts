import { authRouter } from "./auth-router";
import { kidsparkRouter } from "./kidspark-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  kidspark: kidsparkRouter,
});

export type AppRouter = typeof appRouter;
