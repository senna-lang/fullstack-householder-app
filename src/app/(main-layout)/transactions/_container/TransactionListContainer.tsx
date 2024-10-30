import { client } from "@/lib/hono"
import { auth } from "@clerk/nextjs/server"
import TransactionListPresentation from "./TransactionListPresentation"
import TransactionFormContainer from "./TransactionFormContainer"

export const TransactionContainer = async () => {
  const { userId } = auth()

  // 現在の年月を取得
  const today = new Date()
  const currentYear = today.getFullYear().toString()
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, "0")

  const monthlyFinanceResponse = await client.api["user-finance-data"][":id"][
    ":year"
  ][":month"].$get({
    param: {
      id: userId ?? "",
      year: currentYear,
      month: currentMonth,
    },
  })

  const categoryResponse = await client.api["expense-category"].$get()

  if (!monthlyFinanceResponse.ok) {
    throw new Error(monthlyFinanceResponse.statusText)
  }

  if (!categoryResponse.ok) {
    throw new Error(categoryResponse.statusText)
  }

  const monthlyFinanceData = await monthlyFinanceResponse.json()
  const categoryData = await categoryResponse.json()

  return (
    <TransactionListPresentation
      monthlyFinanceData={monthlyFinanceData}
      categoryData={categoryData}
    >
      <TransactionFormContainer />
    </TransactionListPresentation>
  )
}
