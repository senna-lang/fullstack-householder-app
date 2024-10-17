export function calculateCategoryTotals(
	financeData: {
		date: string
		id: number
		userId: string
		categoryId: number
		amount: string
	}[],
) {
	const result = financeData.reduce(
		(acc, item) => {
			const amount = Number.parseFloat(item.amount)
			const date = new Date(item.date)
			const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`

			// カテゴリー別の合計
			acc.categoryTotals[item.categoryId] =
				(acc.categoryTotals[item.categoryId] || 0) + amount

			// 月別の合計
			acc.monthlyTotals[yearMonth] =
				(acc.monthlyTotals[yearMonth] || 0) + amount

			// 総合計
			acc.grandTotal += amount

			return acc
		},
		{
			categoryTotals: {} as { [key: number]: number },
			monthlyTotals: {} as { [key: string]: number },
			grandTotal: 0,
		},
	)

	return result
}
