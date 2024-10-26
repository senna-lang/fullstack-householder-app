"use client"

import React, { useState, useEffect, useMemo } from "react"
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/common/shadcn/table"
import { useCategory } from "../hooks/useCategory"
import { useFinanceData } from "../hooks/useFinanceData"
import { SkeltonBox } from "../../../components/common/SkeltonBox"

interface DataTableProps {
	userId: string
}

export function DataTable({ userId }: DataTableProps) {
	const [mounted, setMounted] = useState(false)
	const { data: categories } = useCategory()
	const {
		data: financeData,
		isLoading: isFinanceLoading,
		error: financeError,
	} = useFinanceData(userId)

	useEffect(() => {
		setMounted(true)
	}, [])

	const categoryMap = useMemo(() => {
		return (
			categories?.reduce(
				(acc, category) => {
					acc[category.id] = category.name
					return acc
				},
				{} as { [key: number]: string },
			) || {}
		)
	}, [categories])

	const getStatusColor = (amount: number) => {
		if (amount > 100000) return "text-red-600"
		if (amount > 50000) return "text-yellow-600"
		return "text-green-600"
	}

	if (!mounted) {
		return null
	}

	if (isFinanceLoading) {
		return <SkeltonBox />
	}

	if (financeError || !financeData) {
		return (
			<div className="w-full flex justify-center p-4 text-red-500">
				Failed to load data
			</div>
		)
	}

	const totalAmount = financeData.currentMonthData.expenses.reduce(
		(sum, item) => sum + Number.parseFloat(item.amount),
		0,
	)

	return (
		<div className="flex flex-col h-full">
			<div className="flex-grow overflow-auto border rounded-md border-gray-200 h-full">
				<Table>
					<TableHeader className="sticky top-0 z-10 bg-blue-500">
						<TableRow>
							<TableHead className=" text-white">日付</TableHead>
							<TableHead className=" text-white">カテゴリー</TableHead>
							<TableHead className=" text-white">金額</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{financeData.currentMonthData.expenses.length > 0 ? (
							financeData.currentMonthData.expenses.map((expense) => (
								<TableRow key={expense.id}>
									<TableCell className=" font-medium text-blue-600">
										{new Date(expense.date).toLocaleDateString()}
									</TableCell>
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
								<TableCell colSpan={3} className="text-center p-4">
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
							<TableCell colSpan={3} className="p-0">
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
