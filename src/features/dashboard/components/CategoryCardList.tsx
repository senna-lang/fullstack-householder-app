"use client";

import { useCategory } from "../hooks/useCategory";
import { useFinanceData } from "../hooks/useFinanceData";
import { CategoryCard } from "./CategoryCard";

interface CategoryCardListProps {
  userId: string;
}

const CategoryCardList = ({ userId }: CategoryCardListProps) => {
  const {
    data: financeData,
    isLoading: isFinanceLoading,
    error: financeError,
  } = useFinanceData(userId);

  const { data: categoryData } = useCategory();

  // 両方のデータの読み込み中状態を処理
  if (isFinanceLoading) {
    return <div className="w-full flex justify-center p-4">Loading...</div>;
  }

  // エラー状態の処理
  if (financeError || !financeData || !categoryData) {
    return (
      <div className="w-full flex justify-center p-4 text-red-500">
        Failed to load data
      </div>
    );
  }

  // カテゴリーごとの合計を取得するヘルパー関数
  const getCategoryTotal = (categoryId: number): number => {
    const categoryTotal = financeData.currentMonthData.categoryTotals.find(
      ct => ct.categoryId === categoryId
    );
    return categoryTotal ? Number(categoryTotal.total) : 0;
  };

  return (
    <div className="flex gap-2 w-full">
      <CategoryCard
        category="total"
        totalAmount={financeData.currentMonthData.total}
      />
      {categoryData.map(category => (
        <CategoryCard
          key={category.id}
          category={category.name}
          totalAmount={getCategoryTotal(category.id)}
        />
      ))}
    </div>
  );
};

export default CategoryCardList;
