import { db } from "@/db/drizzle"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

// ユーザー存在確認の共通関数
export const validateUser = async (userId: string) => {
	const userExists = await db
		.select()
		.from(users)
		.where(eq(users.userID, userId))
		.limit(1)

	if (!userExists.length) {
		throw new Error("指定されたユーザーは存在しません。")
	}
}

// 日付フォーマットの共通関数
export const formatDate = (dateString: string): string => {
	const date = new Date(dateString)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const day = String(date.getDate()).padStart(2, "0")
	return `${year}/${month}/${day}`
}
