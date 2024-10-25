import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

const fetchFinanceData = async (userId: string) => {
  const response = await client.api["user-finance-data"][":id"].$get({
    param: { id: userId },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch finance data: ${response.status}`);
  }

  return response.json();
};

export const useFinanceData = (userId: string) => {
  return useQuery({
    queryKey: ["financeData", userId],
    queryFn: () => fetchFinanceData(userId),
    enabled: Boolean(userId), // userIdが存在する場合のみクエリを実行
    staleTime: 5 * 60 * 1000, // 5分間はデータをstaleとみなさない
    retry: 3, // エラー時に3回まで再試行
    refetchOnWindowFocus: false,
  });
};
