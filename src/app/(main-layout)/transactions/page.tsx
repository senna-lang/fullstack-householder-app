import { TransactionForm } from "@/features/transactions/components/TransactionForm"
import { TransactionList } from "@/features/transactions/components/TransactionList"
import { auth } from "@clerk/nextjs/server"

const TransactionsPage = async () => {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  // 現在の年月を取得
  const today = new Date()
  const currentYear = today.getFullYear().toString()
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, "0")

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Transactions
        </h2>
        <TransactionForm
          userId={userId}
          year={currentYear}
          month={currentMonth}
        />
        <TransactionList
          userId={userId}
          year={currentYear}
          month={currentMonth}
        />
      </div>
    </main>
  )
}

export default TransactionsPage
