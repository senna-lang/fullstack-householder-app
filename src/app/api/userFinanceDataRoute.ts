import { Hono } from "hono"
import { userFinanceData } from "./applications/userFinanceData"

const app = new Hono().get("/:id", async (c) => {
	const id = c.req.param("id")
	try {
		const response = await userFinanceData(id, c)

		if (!response) {
			return c.json({ error: "データが見つかりませんでした。" }, 404)
		}

		return c.json(response)
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

export default app
