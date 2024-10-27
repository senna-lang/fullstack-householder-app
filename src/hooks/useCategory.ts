import { client } from "@/lib/hono"
import { useQuery } from "@tanstack/react-query"

const fetcher = async () => {
  const response = await client.api["expense-category"].$get()
  if (!response.ok) {
    return
  }
  const data = await response.json()
  return data
}

export const useCategory = () => {
  const { data, status } = useQuery({
    queryKey: ["category"],
    queryFn: fetcher,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  })

  return {
    data,
    status,
  }
}
