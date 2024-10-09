import { eq } from "drizzle-orm"
import { Hono } from "hono"

import { db } from "@/db/drizzle"
import { users } from "@/db/schema"

const app = new Hono()
	.get("/:id", async (c) => {
		const id = c.req.param("id")
		try {
			const user = await db
				.select()
				.from(users)
				.where(eq(users.id, Number(id)))
			if (!user) {
				return c.json({ error: "User not found" }, 404)
			}
			return c.json(user)
		} catch (err) {
			console.error("Error fetching all posts:", err)
			if (err instanceof Error) {
				return c.json({ error: `Failed to fetch user: ${err.message}` }, 500)
			}
			return c.json(
				{ error: "An unexpected error occurred while fetching posts" },
				500,
			)
		}
	})
	.post("/", async (c) => {
		const { username, email, password } = await c.req.json()
		console.log(username, email, password)
		try {
			const user = await db
				.insert(users)
				.values({
					username: username,
					email: email,
					passwordHash: password,
					createdAt: new Date(),
				})
				.returning()
			if (!user) {
				return c.json(
					{ error: "ユーザー登録に失敗しました。もう一度お試しください。" },
					400,
				)
			}
			return c.json(user[0].username, 201)
		} catch (err) {
			console.error("Error fetching all posts:", err)
			if (err instanceof Error) {
				return c.json(
					{
						error: `サーバーエラーが発生しました。しばらくしてからもう一度お試しください。: ${err.message}`,
					},
					500,
				)
			}
			return c.json(
				{ error: "An unexpected error occurred while fetching posts" },
				500,
			)
		}
	})
	.put("/:id", async (c) => {
		const id = c.req.param("id")
		const { name, email, password } = c.req.query()
		try {
			const user = await db
				.update(users)
				.set({
					username: name,
					email: email,
					passwordHash: password,
				})
				.where(eq(users.id, Number(id)))
				.returning()
			if (!user) {
				return c.json(
					{ error: "更新に失敗しました。もう一度お試しください。" },
					400,
				)
			}
			return c.json(user[0].username, 201)
		} catch (err) {
			console.error("Error fetching all posts:", err)
			if (err instanceof Error) {
				return c.json(
					{
						error: `サーバーエラーが発生しました。しばらくしてからもう一度お試しください。: ${err.message}`,
					},
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
			const user = await db
				.delete(users)
				.where(eq(users.id, Number(id)))
				.returning()
			if (!user) {
				return c.json(
					{ error: "削除に失敗しました。もう一度お試しください。" },
					400,
				)
			}
			return c.json(user[0].username, 201)
		} catch (err) {
			console.error("Error fetching all posts:", err)
			if (err instanceof Error) {
				return c.json(
					{
						error: `サーバーエラーが発生しました。しばらくしてからもう一度お試しください。: ${err.message}`,
					},
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
