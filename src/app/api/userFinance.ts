import { zValidator } from "@hono/zod-validator"
import { eq, sql } from "drizzle-orm"
import { Hono } from "hono"
import { z } from "zod"

import { db } from "@/db/drizzle"
import { userFinances } from "@/db/schema"

const inputSchema = z.object({
	userId: z.number(),
	categoryId: z.number(),
	amount: z.string(),
	date: z.string(),
})

const app = new Hono()
	.get("/", async (c) => {
		try {
			const userFinance = await db.select().from(userFinances)
			if (!userFinance) {
				return c.json({ error: "データが見つかりませんでした。" }, 404)
			}
			return c.json(userFinance)
		} catch (err) {
			console.error("Error fetching all user finance:", err)
			if (err instanceof Error) {
				return c.json(
					{ error: `データの取得に失敗しました。: ${err.message}` },
					500,
				)
			}
			return c.json(
				{
					error:
						"予期せぬエラーが発生しました。しばらくしてからもう一度お試しください。",
				},
				500,
			)
		}
	})
	.get("/:id", async (c) => {
		const id = c.req.param("id")
		try {
			const userFinance = await db
				.select()
				.from(userFinances)
				.where(eq(userFinances.id, Number(id)))
			// if (!userFinance) {
			//   return c.json({ error: "データが見つかりませんでした。" }, 404);
			// }
			return c.json(userFinance)
		} catch (err) {
			console.error("Error fetching user finance:", err)
			if (err instanceof Error) {
				return c.json(
					{ error: `データの取得に失敗しました。: ${err.message}` },
					500,
				)
			}
			return c.json(
				{
					error:
						"予期せぬエラーが発生しました。しばらくしてからもう一度お試しください。",
				},
				500,
			)
		}
	})
	.post(
		"/",
		zValidator("json", inputSchema, (result, c) => {
			if (!result.success) {
				return c.json({ message: "無効な入力があります。" }, 400)
			}
		}),
		async (c) => {
			const { userId, categoryId, amount, date } = c.req.valid("json")
			try {
				const result = await db
					.insert(userFinances)
					.values({
						userId,
						categoryId,
						amount: sql`CAST(${amount} AS DECIMAL(10, 2))`,
						date: sql`CAST(${date} AS DATE)`,
					})
					.returning({ insertedId: userFinances.id })

				return c.json({ success: true, id: result[0].insertedId })
			} catch (err) {
				console.error("Error creating user finance:", err)
				if (err instanceof Error) {
					return c.json(
						{ error: `データの作成に失敗しました。: ${err.message}` },
						500,
					)
				}
				return c.json(
					{
						error:
							"予期せぬエラーが発生しました。しばらくしてからもう一度お試しください。",
					},
					500,
				)
			}
		},
	)
	.put(
		"/:id",
		zValidator("json", inputSchema, (result, c) => {
			if (!result.success) {
				return c.json({ message: "無効な入力があります。" }, 400)
			}
		}),
		async (c) => {
			const id = c.req.param("id")
			const { userId, categoryId, amount, date } = c.req.valid("json")
			try {
				const result = await db
					.update(userFinances)
					.set({
						userId,
						categoryId,
						amount: sql`CAST(${amount} AS DECIMAL(10, 2))`,
						date: sql`CAST(${date} AS DATE)`,
					})
					.where(eq(userFinances.id, Number(id)))
					.returning()

				if (result.length === 0) {
					return c.json({ error: "データが見つかりませんでした。" }, 404)
				}

				return c.json({ success: true })
			} catch (err) {
				console.error("Error updating user finance:", err)
				if (err instanceof Error) {
					return c.json(
						{ error: `データの更新に失敗しました。: ${err.message}` },
						500,
					)
				}
				return c.json(
					{
						error:
							"予期せぬエラーが発生しました。しばらくしてからもう一度お試しください。",
					},
					500,
				)
			}
		},
	)
	.delete("/:id", async (c) => {
		const id = c.req.param("id")
		try {
			const result = await db
				.delete(userFinances)
				.where(eq(userFinances.id, Number(id)))
				.returning()

			if (result.length === 0) {
				return c.json({ error: "データが見つかりませんでした。" }, 404)
			}

			return c.json({ success: true })
		} catch (err) {
			console.error("Error deleting user finance:", err)
			if (err instanceof Error) {
				return c.json(
					{ error: `データの削除に失敗しました。: ${err.message}` },
					500,
				)
			}
			return c.json(
				{
					error:
						"予期せぬエラーが発生しました。しばらくしてからもう一度お試しください。",
				},
				500,
			)
		}
	})
export default app
