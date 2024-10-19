import { notFound } from "next/navigation"

import { cacheableClient, client } from "@/lib/hono"

export async function fetchFinanceData(userId: string) {
	const financeResponse = await client.api["user-finance"][":id"].$get({
		param: { id: userId },
	})
	const expenseCategoryResponse =
		await cacheableClient.api["expense-category"].$get()

	if (!financeResponse.ok || !expenseCategoryResponse.ok) {
		return notFound()
	}

	const financeData = await financeResponse.json()
	const expenseCategoryData = await expenseCategoryResponse.json()

	return { financeData, expenseCategoryData }
}
