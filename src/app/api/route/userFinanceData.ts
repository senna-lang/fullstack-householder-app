import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import {
  userFinanceData,
  userFinanceDataByMonth,
  createUserFinanceData,
} from "../applications/userFinanceData"
import { createFinanceSchema } from "../schema"

const app = new Hono()
  .get("/:id", async (c) => {
    const id = c.req.param("id")
    const response = await userFinanceData(id)

    if (!response) {
      return c.json({ error: "データが見つかりませんでした。" }, 404)
    }

    return c.json(response)
  })
  .get("/:id/:year/:month", async (c) => {
    const id = c.req.param("id")
    const year = c.req.param("year")
    const month = c.req.param("month")

    const response = await userFinanceDataByMonth(id, year, month)

    if (!response) {
      return c.json({ error: "データが見つかりませんでした。" }, 404)
    }

    return c.json(response)
  })
  .post("/:id", zValidator("json", createFinanceSchema), async (c) => {
    const userId = c.req.param("id")
    const data = await c.req.json()

    const response = await createUserFinanceData({
      userId,
      ...data,
    })

    if (!response) {
      return c.json({ error: "データの登録に失敗しました。" }, 500)
    }

    return c.json(response, 201)
  })

export default app
