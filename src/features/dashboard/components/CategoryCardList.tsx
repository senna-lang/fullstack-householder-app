import { CategoryCard } from "./CategoryCard"

interface CategoryCardListProps {
  financeData: FinanceDataResponse
  categoryData: CategoryDataResponse
}
interface Category {
  id: number
  name: string
}

interface CategoryTotal {
  categoryId: number
  total: string
}

const CategoryCardList = ({
  financeData,
  categoryData,
}: CategoryCardListProps) => {
  // カテゴリーごとの合計を取得するヘルパー関数
  const getCategoryTotal = (categoryId: number): number => {
    const categoryTotal = financeData.currentMonthData.categoryTotals.find(
      (ct: CategoryTotal) => ct.categoryId === categoryId,
    )
    return categoryTotal ? Number(categoryTotal.total) : 0
  }

  return (
    <div className="flex gap-2 w-full">
      <CategoryCard
        category="total"
        totalAmount={financeData.currentMonthData.total}
      />
      {categoryData.map((category: Category) => (
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
