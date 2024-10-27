import { useNotifications } from "@/components/common/notifications"
import { client } from "@/lib/hono"
import { auth } from "@clerk/nextjs/server"
import Presentational from "./Presentational"

export const DashBoardContainer = async () => {
  const { userId } = auth()

  const financeDataResponse = await client.api["user-finance-data"][":id"].$get(
    {
      param: { id: userId ?? "" },
    },
  )
  const categoryDataResponse = await client.api["expense-category"].$get()

  if (!financeDataResponse.ok) {
    useNotifications.getState().addNotification({
      type: "error",
      title: "Error",
      message: financeDataResponse.statusText,
    })
    throw new Error(financeDataResponse.statusText)
  }

  if (!categoryDataResponse.ok) {
    useNotifications.getState().addNotification({
      type: "error",
      title: "Error",
      message: categoryDataResponse.statusText,
    })
    throw new Error(categoryDataResponse.statusText)
  }

  const financeData = await financeDataResponse.json()
  const categoryData = await categoryDataResponse.json()

  return (
    <Presentational financeData={financeData} categoryData={categoryData} />
  )
}
