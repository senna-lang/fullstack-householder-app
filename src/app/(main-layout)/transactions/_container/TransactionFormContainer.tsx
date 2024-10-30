import { auth } from "@clerk/nextjs/server"
import TransactionFormPresentation from "./TransactionFormPresentation"

const TransactionFormContainer = () => {
  const { userId } = auth()

  // 現在の年月を取得
  const today = new Date()
  const currentYear = today.getFullYear().toString()
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, "0")

  return (
    <TransactionFormPresentation
      userId={userId ?? ""}
      month={currentMonth}
      year={currentYear}
    />
  )
}

export default TransactionFormContainer
