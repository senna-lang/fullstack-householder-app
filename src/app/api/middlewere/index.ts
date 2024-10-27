import type { Context, Next } from "hono"
import { z } from "zod"

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next()
  } catch (err) {
    console.error("Error in finance API:", err)

    if (err instanceof z.ZodError) {
      return c.json(
        {
          error: "入力データが不正です。",
          details: err.errors,
        },
        400,
      )
    }

    // ビジネスロジックのエラー
    if (err instanceof Error && err.message.includes("存在しません")) {
      return c.json({ error: err.message }, 400)
    }

    // 一般的なエラー
    if (err instanceof Error) {
      return c.json(
        { error: `データの処理に失敗しました。: ${err.message}` },
        500,
      )
    }

    // 予期せぬエラー
    return c.json(
      {
        error:
          "予期せぬエラーが発生しました。しばらくしてからもう一度お試しください。",
      },
      500,
    )
  }
}
