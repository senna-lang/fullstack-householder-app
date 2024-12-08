import { useNotifications } from "@/components/common/notifications"
import { client } from "@/lib/hono"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import type { Category, CategoryMap, CurrentMonthData, Expense } from "../types"

const fetchFinanceData = async (userId: string) => {
  const response = await client.api["user-finance-data"][":id"].$get({
    param: { id: userId },
  })

  if (!response.ok) {
    useNotifications.getState().addNotification({
      type: "error",
      title: "Error",
      message: response.statusText,
    })
    throw new Error(response.statusText)
  }

  return response.json()
}

export const useFinanceData = (userId: string) => {
  return useQuery({
    queryKey: ["financeData", userId],
    queryFn: () => fetchFinanceData(userId),
    enabled: Boolean(userId), // userIdが存在する場合のみクエリを実行
    staleTime: 5 * 60 * 1000, // 5分間はデータをstaleとみなさない
    retry: 3, // エラー時に3回まで再試行
    refetchOnWindowFocus: false,
  })
}

export const useDataTable = (
  categoryData: Category[],
  financeData: {
    currentMonthData: CurrentMonthData
  },
) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const categoryMap = useMemo(() => {
    return (
      categoryData?.reduce<CategoryMap>(
        (acc: CategoryMap, category: Category) => {
          acc[category.id] = category.name
          return acc
        },
        {},
      ) || {}
    )
  }, [categoryData])

  const getStatusColor = (amount: number) => {
    if (amount > 100000) return "text-red-600"
    if (amount > 50000) return "text-yellow-600"
    return "text-green-600"
  }

  const totalAmount = financeData.currentMonthData.expenses.reduce(
    (sum: number, expense: Expense) => sum + Number.parseFloat(expense.amount),
    0,
  )

  // マウント前のデフォルト値を返す
  if (!mounted) {
    return {
      categoryMap: {},
      getStatusColor,
      totalAmount: 0,
    }
  }

  return {
    categoryMap,
    getStatusColor,
    totalAmount,
  }
}
