import { z } from "zod"

// /user-finance-data/post/:id
export const createFinanceSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "日付はYYYY-MM-DDの形式である必要があります"),
  categoryId: z
    .number()
    .int()
    .positive("カテゴリーIDは正の整数である必要があります"),
  amount: z.number().positive("金額は正の数である必要があります"),
})
