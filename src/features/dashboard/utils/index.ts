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
			acc.categoryTotals[item.categoryId] =
				(acc.categoryTotals[item.categoryId] || 0) + amount
			acc.grandTotal += amount
			return acc
		},
		{ categoryTotals: {} as { [key: number]: number }, grandTotal: 0 },
	)

	return result
}
