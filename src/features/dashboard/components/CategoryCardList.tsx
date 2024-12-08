import type { Category } from "../types"
import { getCategoryTotal } from "../utils"
import { CategoryCard } from "./CategoryCard"

interface CategoryCardListProps {
  financeData: FinanceDataResponse
  categoryData: CategoryDataResponse
}

const CategoryCardList = ({
  financeData,
  categoryData,
}: CategoryCardListProps) => {
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
          totalAmount={getCategoryTotal(category.id, financeData)}
        />
      ))}
    </div>
  )
}

export default CategoryCardList
