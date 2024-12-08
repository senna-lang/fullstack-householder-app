import type { CategoryTotal } from "../types"

// カテゴリーごとの合計を取得するヘルパー関数
export const getCategoryTotal = (
  categoryId: number,
  financeData: FinanceDataResponse,
): number => {
  const categoryTotal = financeData.currentMonthData.categoryTotals.find(
    (ct: CategoryTotal) => ct.categoryId === categoryId,
  )
  return categoryTotal ? Number(categoryTotal.total) : 0
}
