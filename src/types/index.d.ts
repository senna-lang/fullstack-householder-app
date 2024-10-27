type Client = typeof import("@/lib/hono").client

// APIレスポンスの型を抽出
type FinanceDataResponse = InferResponseType<
  Client["api"]["user-finance-data"][":id"]["$get"]
>

type CategoryDataResponse = InferResponseType<
  Client["api"]["expense-category"]["$get"]
>
