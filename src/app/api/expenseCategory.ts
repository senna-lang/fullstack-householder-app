import { eq } from "drizzle-orm"
import { Hono } from "hono"

import { db } from "@/db/drizzle"
import { expenseCategories } from "@/db/schema"

const app = new Hono()
	.get("/", async (c) => {
		try {
			const categories = await db.select().from(expenseCategories)
			if (!categories) {
				return c.json({ error: "カテゴリーが見つかりませんでした。" }, 404)
			}
			return c.json(categories)
		} catch (err) {
			console.error("カテゴリーの取得に失敗しました。:", err)
			if (err instanceof Error) {
				return c.json(
					{ error: `カテゴリーの取得に失敗しました。: ${err.message}` },
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
			const category = await db
				.select()
				.from(expenseCategories)
				.where(eq(expenseCategories.id, Number(id)))
			if (!category) {
				return c.json({ error: "カテゴリーが見つかりませんでした。" }, 404)
			}
			return c.json(category)
		} catch (err) {
			console.error("カテゴリーの取得に失敗しました。:", err)
			if (err instanceof Error) {
				return c.json(
					{ error: `カテゴリーの取得に失敗しました。: ${err.message}` },
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
	.post("/", async (c) => {
		const { name } = c.req.query()
		try {
			const category = await db
				.insert(expenseCategories)
				.values({ name })
				.returning()
			if (!category) {
				return c.json({ error: "カテゴリーの追加に失敗しました。" }, 404)
			}
			return c.json(category, 201)
		} catch (err) {
			console.error("カテゴリーの追加に失敗しました。:", err)
			if (err instanceof Error) {
				return c.json(
					{ error: `カテゴリーの追加に失敗しました。: ${err.message}` },
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
	.put("/:id", async (c) => {
		const id = c.req.param("id")
		const { name } = c.req.query()
		try {
			const category = await db
				.update(expenseCategories)
				.set({ name })
				.where(eq(expenseCategories.id, Number(id)))
				.returning()
			if (!category) {
				return c.json({ error: "カテゴリーの更新に失敗しました。" }, 404)
			}
			return c.json(category)
		} catch (err) {
			console.error("カテゴリーの更新に失敗しました。:", err)
			if (err instanceof Error) {
				return c.json(
					{ error: `カテゴリーの更新に失敗しました。: ${err.message}` },
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
	.delete("/:id", async (c) => {
		const id = c.req.param("id")
		try {
			const category = await db
				.delete(expenseCategories)
				.where(eq(expenseCategories.id, Number(id)))
				.returning()

			if (!category) {
				return c.json({ error: "カテゴリーの削除に失敗しました。" }, 404)
			}

			return c.json(category)
		} catch (err) {
			console.error("カテゴリーの削除に失敗しました。:", err)

			if (err instanceof Error) {
				return c.json(
					{ error: `カテゴリーの削除に失敗しました。: ${err.message}` },
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
