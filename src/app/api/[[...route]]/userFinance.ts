import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { userFinances } from "@/db/schema";
import { Hono } from "hono";
import { use } from "react";

const app = new Hono()
  .get("/userFinances", async c => {
    try {
      const userFinance = await db.select().from(userFinances);
      if (!userFinance) {
        return c.json({ error: "データが見つかりませんでした。" }, 404);
      }
      return c.json(userFinance);
    } catch (err) {
      console.error("Error fetching all user finance:", err);
      if (err instanceof Error) {
        return c.json(
          { error: `データの取得に失敗しました。: ${err.message}` },
          500
        );
      }
      return c.json(
        {
          error:
            "予期せぬエラーが発生しました。しばらくしてからもう一度お試しください。",
        },
        500
      );
    }
  })
  .get("/userFinances/:id", async c => {
    const id = c.req.param("id");
    try {
      const userFinance = await db
        .select()
        .from(userFinances)
        .where(eq(userFinances.id, Number(id)));
      if (!userFinance) {
        return c.json({ error: "データが見つかりませんでした。" }, 404);
      }
      return c.json(userFinance);
    } catch (err) {
      console.error("Error fetching user finance:", err);
      if (err instanceof Error) {
        return c.json(
          { error: `データの取得に失敗しました。: ${err.message}` },
          500
        );
      }
      return c.json(
        {
          error:
            "予期せぬエラーが発生しました。しばらくしてからもう一度お試しください。",
        },
        500
      );
    }
  });
export default app;
