"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/shadcn/table"

interface Expense {
  id: number
  date: string
  name: string
  amount: string
  categoryId: number
}

interface CurrentMonthData {
  expenses: Expense[]
}

interface Category {
  id: number
  name: string
}

interface DataTableProps {
  financeData: {
    currentMonthData: CurrentMonthData
  }
  categoryData: Category[]
}

type CategoryMap = {
  [key: number]: string
}

export function DataTable({ financeData, categoryData }: DataTableProps) {
  const [mounted, setMounted] = useState(false)
  console.log(financeData.currentMonthData.expenses)

  useEffect(() => {
    setMounted(true)
  }, [])

  const categoryMap = useMemo(() => {
    return (
      categoryData?.reduce<CategoryMap>(
        (acc: CategoryMap, category: Category) => {
          acc[category.id] = category.name
          return acc
        },
        {},
      ) || {}
    )
  }, [categoryData])

  const getStatusColor = (amount: number) => {
    if (amount > 100000) return "text-red-600"
    if (amount > 50000) return "text-yellow-600"
    return "text-green-600"
  }

  if (!mounted) {
    return null
  }

  const totalAmount = financeData.currentMonthData.expenses.reduce(
    (sum: number, expense: Expense) => sum + Number.parseFloat(expense.amount),
    0,
  )

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto border rounded-md border-gray-200 h-full">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-blue-500">
            <TableRow>
              <TableHead className="text-white">日付</TableHead>
              <TableHead className="text-white">名前</TableHead>
              <TableHead className="text-white">カテゴリー</TableHead>
              <TableHead className="text-white">金額</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {financeData.currentMonthData.expenses.length > 0 ? (
              financeData.currentMonthData.expenses.map((expense: Expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium text-blue-600">
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">{expense.name}</TableCell>
                  <TableCell>
                    {categoryMap[expense.categoryId] || "Unknown"}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end w-full">
                      <span
                        className={`text-right font-mono ${getStatusColor(
                          Number.parseFloat(expense.amount),
                        )}`}
                      >
                        ¥{Number.parseFloat(expense.amount).toLocaleString()}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center p-4">
                  データがありません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex-none mt-2">
        <Table>
          <TableFooter>
            <TableRow className="bg-blue-500">
              <TableCell colSpan={4} className="p-0">
                <div className="flex items-center space-x-4">
                  <span className="text-white font-semibold ml-3">合計</span>
                  <span className="text-white font-semibold font-mono">
                    ¥{totalAmount.toLocaleString()}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}
