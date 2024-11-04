"use client"
import { useNotifications } from "@/components/common/notifications"
import { client } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export interface CreateFinanceData {
  name: string
  date: string
  categoryId: number
  amount: number
}

export interface CreateFinanceParams {
  userId: string
  data: CreateFinanceData
}

export interface CreateFinanceResponse {
  id: number
  name: string
  userId: string
  date: string
  categoryId: number
  amount: string
}

const createFinanceData = async ({
  userId,
  data,
}: CreateFinanceParams): Promise<CreateFinanceResponse> => {
  const response = await client.api["user-finance-data"][":id"].$post({
    param: { id: userId },
    json: data,
  })

  if (!response.ok) {
    const errorData = await response.json()
    useNotifications.getState().addNotification({
      type: "error",
      title: "Error",
      message: errorData.error || response.statusText,
    })
    throw new Error(errorData.error || response.statusText)
  }

  return response.json()
}

export const useCreateFinance = (
  userId: string,
  year: string,
  month: string,
) => {
  const queryClient = useQueryClient()
  const notifications = useNotifications()

  const mutation = useMutation<
    CreateFinanceResponse, // 成功時のレスポンスの型
    Error, // エラーの型
    CreateFinanceData, // mutate関数の引数の型
    unknown // コンテキストの型
  >({
    mutationFn: (data: CreateFinanceData) =>
      createFinanceData({ userId, data }),

    onSuccess: () => {
      notifications.addNotification({
        type: "success",
        title: "Success",
        message: "取引を追加しました。",
      })

      queryClient.invalidateQueries({
        queryKey: ["monthlyFinanceData", userId, year, month],
      })

      queryClient.invalidateQueries({
        queryKey: ["financeData", userId],
      })
    },

    onError: (error: Error) => {
      console.error("Failed to create finance:", error)
    },
  })

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending, // v5ではisPendingを使用
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  }
}
