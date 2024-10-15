export function calculateCategoryTotals(
	financeData: {
		date: string
		id: number
		userId: string
		categoryId: number
		amount: string
	}[],
) {
	return financeData.reduce(
		(acc, item) => {
			const amount = Number.parseFloat(item.amount)
			acc[item.categoryId] = (acc[item.categoryId] || 0) + amount
			return acc
		},
		{} as { [key: number]: number },
	)
}
