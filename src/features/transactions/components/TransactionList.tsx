import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/shadcn/table"
import { useMemo } from "react"

interface Expense {
  id: string
  name: string
  date: string
  categoryId: number
  amount: number
}

interface MonthData {
  expenses: Expense[]
}

interface MonthlyFinanceDataResponse {
  monthData: MonthData
}

interface Category {
  id: number
  name: string
}

type CategoryDataResponse = Category[]

interface CategoryMap {
  [key: number]: string
}

interface TransactionListProps {
  monthlyFinance: MonthlyFinanceDataResponse
  categories: CategoryDataResponse
}

export function TransactionList({
  monthlyFinance,
  categories,
}: TransactionListProps) {
  // カテゴリーマップをメモ化
  const categoryMap: CategoryMap = useMemo(() => {
    if (!categories) return {}
    return categories.reduce<CategoryMap>((acc, category) => {
      acc[category.id] = category.name
      return acc
    }, {})
  }, [categories])

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Date</TableHead>
            <TableHead className="w-1/4">Name</TableHead>
            <TableHead className="w-1/4">Category</TableHead>
            <TableHead className="w-1/4 text-right">Amount (JPY)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monthlyFinance?.monthData.expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>
                {new Date(expense.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="truncate">{expense.name}</TableCell>
              <TableCell className="capitalize">
                {categoryMap[expense.categoryId] || "Unknown"}
              </TableCell>
              <TableCell className="text-right font-mono">
                ¥{expense.amount.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
          {!monthlyFinance?.monthData.expenses.length && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                データがありません
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
