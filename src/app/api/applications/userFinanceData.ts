import { db } from "@/db/drizzle"
import { expenseCategories, userFinances } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { formatDate, validateUser } from "../utils"

// スキーマから型を生成
type InsertUserFinance = typeof userFinances.$inferInsert

interface CreateFinanceData {
  userId: string
  name: string
  date: string
  categoryId: number
  amount: number
}

export const userFinanceData = async (user_id: string) => {
  // ユーザー存在確認を追加
  await validateUser(user_id)

  const currentMonth = new Date().getMonth() + 1 // SQLの月は1-basedなので+1する
  const currentMonthKey = `${currentMonth}月`

  try {
    // 月ごとの合計金額を取得
    const monthlyTotals = await db
      .select({
        month: sql<number>`EXTRACT(MONTH FROM ${userFinances.date})`,
        total: sql<number>`SUM(${userFinances.amount})`,
      })
      .from(userFinances)
      .where(eq(userFinances.userId, user_id))
      .groupBy(sql`EXTRACT(MONTH FROM ${userFinances.date})`)
      .orderBy(sql`EXTRACT(MONTH FROM ${userFinances.date})`)

    // 月名の配列（1月、2月、...、12月）
    const monthNames = [...Array(12)].map((_, i) => `${i + 1}月`)

    // 初期値として全ての月を0で初期化
    const monthlyObject = Object.fromEntries(
      monthNames.map((month) => [month, 0]),
    )

    // データベースの結果で上書き
    for (const row of monthlyTotals) {
      monthlyObject[`${row.month}月`] = Number(row.total)
    }

    // 今月のカテゴリーごとの合計を取得
    const currentMonthCategoryTotals = await db
      .select({
        categoryId: userFinances.categoryId,
        total: sql<number>`SUM(${userFinances.amount})`,
      })
      .from(userFinances)
      .where(
        sql`${userFinances.userId} = ${user_id} AND 
            EXTRACT(MONTH FROM ${userFinances.date}) = ${currentMonth}`,
      )
      .groupBy(userFinances.categoryId)

    // 今月の支出詳細を取得
    const currentMonthExpenses = await db
      .select({
        id: userFinances.id,
        name: userFinances.name,
        categoryId: userFinances.categoryId,
        amount: userFinances.amount,
        date: userFinances.date,
      })
      .from(userFinances)
      .where(
        sql`${userFinances.userId} = ${user_id} AND 
            EXTRACT(MONTH FROM ${userFinances.date}) = ${currentMonth}`,
      )
      .orderBy(userFinances.date)

    return {
      monthlyTotals: monthlyObject,
      currentMonthData: {
        total: monthlyObject[currentMonthKey],
        categoryTotals: currentMonthCategoryTotals,
        expenses: currentMonthExpenses,
      },
    }
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export const userFinanceDataByMonth = async (
  user_id: string,
  year: string,
  month: string,
) => {
  // ユーザー存在確認を追加
  await validateUser(user_id)

  const targetMonth = Number(month)
  const targetYear = Number(year)
  const currentMonthKey = `${targetMonth}月`

  try {
    // 指定月の月初めと月末を計算
    const startDate = new Date(targetYear, targetMonth - 1, 1)

    // 月ごとの合計金額を取得
    const monthlyTotals = await db
      .select({
        month: sql<number>`EXTRACT(MONTH FROM ${userFinances.date})`,
        total: sql<number>`SUM(${userFinances.amount})`,
      })
      .from(userFinances)
      .where(
        sql`${userFinances.userId} = ${user_id} AND 
            EXTRACT(YEAR FROM ${userFinances.date}) = ${targetYear}`,
      )
      .groupBy(sql`EXTRACT(MONTH FROM ${userFinances.date})`)
      .orderBy(sql`EXTRACT(MONTH FROM ${userFinances.date})`)

    // 月名の配列（1月、2月、...、12月）
    const monthNames = [...Array(12)].map((_, i) => `${i + 1}月`)

    // 初期値として全ての月を0で初期化
    const monthlyObject = Object.fromEntries(
      monthNames.map((month) => [month, 0]),
    )

    // データベースの結果で上書き
    for (const row of monthlyTotals) {
      monthlyObject[`${row.month}月`] = Number(row.total)
    }

    // 指定月のカテゴリーごとの合計を取得
    const monthCategoryTotals = await db
      .select({
        categoryId: userFinances.categoryId,
        total: sql<number>`SUM(${userFinances.amount})`,
      })
      .from(userFinances)
      .where(
        sql`${userFinances.userId} = ${user_id} AND 
            ${userFinances.date} >= ${startDate} AND 
            ${userFinances.date} < ${new Date(targetYear, targetMonth, 1)}`,
      )
      .groupBy(userFinances.categoryId)

    // 指定月の支出詳細を取得
    const monthExpenses = await db
      .select({
        id: userFinances.id,
        name: userFinances.name,
        categoryId: userFinances.categoryId,
        amount: userFinances.amount,
        date: userFinances.date,
      })
      .from(userFinances)
      .where(
        sql`${userFinances.userId} = ${user_id} AND 
            ${userFinances.date} >= ${startDate} AND 
            ${userFinances.date} < ${new Date(targetYear, targetMonth, 1)}`,
      )
      .orderBy(userFinances.date)

    return {
      monthlyTotals: monthlyObject,
      monthData: {
        total: monthlyObject[currentMonthKey],
        categoryTotals: monthCategoryTotals,
        expenses: monthExpenses,
      },
    }
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export const createUserFinanceData = async (data: CreateFinanceData) => {
  const { userId, name, date, categoryId, amount } = data

  // ユーザー存在確認
  await validateUser(userId)

  // カテゴリーの存在確認
  const categoryExists = await db
    .select()
    .from(expenseCategories)
    .where(eq(expenseCategories.id, categoryId))
    .limit(1)

  if (!categoryExists.length) {
    throw new Error("指定されたカテゴリーは存在しません。")
  }

  try {
    const insertData: InsertUserFinance = {
      userId,
      name,
      date: formatDate(date),
      categoryId,
      amount: amount.toString(),
    }

    const newFinance = await db
      .insert(userFinances)
      .values(insertData)
      .returning()

    return newFinance[0]
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}
