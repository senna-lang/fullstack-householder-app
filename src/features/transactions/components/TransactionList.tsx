"use client"

import { Skeleton } from "@/components/common/shadcn/skeleton"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/common/shadcn/table"
import { useMonthlyFinanceData } from "@/features/transactions/hooks/useMonthlyFinanceData"
import { useCategory } from "@/hooks/useCategory"
import { useMemo } from "react"

interface TransactionListProps {
	userId: string
	year: string
	month: string
}

export function TransactionList({ userId, year, month }: TransactionListProps) {
	const { data: financeData, isLoading } = useMonthlyFinanceData(
		userId,
		year,
		month,
	)
	const { data: categories } = useCategory()

	// カテゴリーIDからnameへの変換マップを作成
	const categoryMap = useMemo(() => {
		if (!categories) return {}
		return categories.reduce(
			(acc, category) => {
				acc[category.id] = category.name
				return acc
			},
			{} as { [key: number]: string },
		)
	}, [categories])

	if (isLoading) {
		return (
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<Skeleton className="h-64 w-full" />
			</div>
		)
	}

	return (
		<div className="bg-white shadow overflow-hidden sm:rounded-lg">
			<Table className="w-full table-fixed">
				<TableHeader>
					<TableRow>
						<TableHead className="w-1/3">Date</TableHead>
						<TableHead className="w-1/3">Category</TableHead>
						<TableHead className="w-1/3 text-right">Amount (JPY)</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{financeData?.monthData.expenses.map((expense) => (
						<TableRow key={expense.id}>
							<TableCell>
								{new Date(expense.date).toLocaleDateString()}
							</TableCell>
							<TableCell className="capitalize">
								{categoryMap[expense.categoryId] || "Unknown"}
							</TableCell>
							<TableCell className="text-right font-mono">
								¥{expense.amount.toLocaleString()}
							</TableCell>
						</TableRow>
					))}
					{!financeData?.monthData.expenses.length && (
						<TableRow>
							<TableCell colSpan={3} className="text-center py-4">
								データがありません
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
