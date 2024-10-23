"use client"

import { useCategory } from "../hooks/useCategory"
import { CategoryCard } from "./CategoryCard"

interface CategoryCardListProps {
	total: number
	categoryTotals: {
		categoryId: number
		total: number
	}[]
}

const CategoryCardList = ({ total, categoryTotals }: CategoryCardListProps) => {
	const { data: categoryData, status } = useCategory()

	// カテゴリーごとの合計を取得するヘルパー関数
	const getCategoryTotal = (categoryId: number): number => {
		const categoryTotal = categoryTotals.find(
			(ct) => ct.categoryId === categoryId,
		)
		return categoryTotal ? Number(categoryTotal.total) : 0
	}

	if (status === "pending") {
		return <div>Loading categories...</div>
	}

	if (status === "error" || !categoryData) {
		return <div>Failed to load categories</div>
	}

	return (
		<div className="flex gap-2 w-full">
			<CategoryCard category="total" totalAmount={total} />
			{categoryData.map((category) => (
				<CategoryCard
					key={category.id}
					category={category.name}
					totalAmount={getCategoryTotal(category.id)}
				/>
			))}
		</div>
	)
}

export default CategoryCardList
