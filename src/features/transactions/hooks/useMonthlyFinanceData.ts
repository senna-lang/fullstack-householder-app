import { useNotifications } from "@/components/common/notifications"
import { client } from "@/lib/hono"
import { useQuery } from "@tanstack/react-query"

interface FetchFinanceDataParams {
  userId: string
  year: string
  month: string
}

const fetchFinanceData = async ({
  userId,
  year,
  month,
}: FetchFinanceDataParams) => {
  const response = await client.api["user-finance-data"][":id"][":year"][
    ":month"
  ].$get({
    param: {
      id: userId,
      year,
      month,
    },
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

export const useMonthlyFinanceData = (
  userId: string,
  year: string,
  month: string,
) => {
  return useQuery({
    queryKey: ["monthlyFinanceData", userId, year, month],
    queryFn: () => fetchFinanceData({ userId, year, month }),
    enabled: Boolean(userId && year && month), // 全てのパラメータが存在する場合のみクエリを実行
    staleTime: 5 * 60 * 1000, // 5分間はデータをstaleとみなさない
    retry: 3, // エラー時に3回まで再試行
    refetchOnWindowFocus: false,
  })
}
