import { TransactionList } from "@/features/transactions/components/TransactionList"

interface PresentationProps {
  monthlyFinanceData: MonthlyFinanceDataResponse
  categoryData: CategoryDataResponse
  children: React.ReactNode
}

const TransactionListPresentation = ({
  monthlyFinanceData,
  categoryData,
  children,
}: PresentationProps) => {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Transactions
        </h2>
        {children}
        <TransactionList
          monthlyFinance={monthlyFinanceData}
          categories={categoryData}
        />
      </div>
    </main>
  )
}

export default TransactionListPresentation
