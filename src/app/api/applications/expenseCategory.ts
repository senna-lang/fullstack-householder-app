import { db } from "@/db/drizzle"
import { expenseCategories } from "@/db/schema"

// カテゴリー取得関数
export const getCategories = async () => {
	try {
		// カテゴリーを取得
		const categories = await db.select().from(expenseCategories)

		// カテゴリーが存在しない場合はエラー
		if (!categories || categories.length === 0) {
			throw new Error("カテゴリーが見つかりませんでした。")
		}

		return categories
	} catch (error) {
		// エラーログを出力して再スロー
		console.error("カテゴリーの取得に失敗しました。:", error)
		throw error
	}
}
