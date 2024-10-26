import { Hono } from "hono"

import { getCategories } from "../applications/expenseCategory"

const app = new Hono().get("/", async (c) => {
	try {
		const categories = await getCategories()
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

export default app
