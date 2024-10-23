import { db } from "@/db/drizzle"
import { userFinances } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import type { Context } from "hono"
import type { BlankEnv, BlankInput } from "hono/types"

export const userFinanceData = async (
	user_id: string,
	c: Context<BlankEnv, "/:id", BlankInput>,
) => {
	const currentMonth = new Date().getMonth() + 1 // SQLの月は1-basedなので+1する
	const currentMonthKey = `${currentMonth}月`

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

	const data = {
		monthlyTotals: monthlyObject,
		currentMonthData: {
			total: monthlyObject[currentMonthKey],
			categoryTotals: currentMonthCategoryTotals,
			expenses: currentMonthExpenses,
		},
	}

	return data
}
