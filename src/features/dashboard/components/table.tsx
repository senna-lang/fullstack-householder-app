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
} from "@/components/common/ui/table"
import { useCategory } from "../hooks/useCategory"

type Expense = {
	id: number
	date: string
	categoryId: number
	amount: string
}

type DataTableProps = {
	data: Expense[]
}

export function DataTable({ data }: DataTableProps) {
	const [mounted, setMounted] = useState(false)
	const { data: categories } = useCategory()

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

	const totalAmount = data.reduce(
		(sum, item) => sum + Number.parseFloat(item.amount),
		0,
	)

	if (!mounted) {
		return null
	}

	return (
		<div className="flex flex-col h-full">
			<div className="flex-grow overflow-hidden border border-[#93c5fd]">
				<div className="overflow-y-auto h-full">
					<Table>
						<TableHeader className="sticky top-0 z-10">
							<TableRow className="bg-[#60a5fa] hover:bg-[#60a5fa]">
								<TableHead className="w-[100px] text-white">日付</TableHead>
								<TableHead className="text-white">カテゴリー</TableHead>
								<TableHead className="text-right text-white">金額</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map((expense) => (
								<TableRow key={expense.id} className="hover:bg-[#e0e7ff]">
									<TableCell className="font-medium text-[#2563eb]">
										{new Date(expense.date).toLocaleDateString()}
									</TableCell>
									<TableCell>
										{categoryMap[expense.categoryId] || "Unknown"}
									</TableCell>
									<TableCell
										className={`text-right ${getStatusColor(
											Number.parseFloat(expense.amount),
										)}`}
									>
										¥{Number.parseFloat(expense.amount).toLocaleString()}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
			<div className="flex-none mt-2">
				<Table>
					<TableFooter>
						<TableRow className="bg-[#60a5fa] hover:bg-[#60a5fa]">
							<TableCell colSpan={2} className="text-white font-semibold">
								合計
							</TableCell>
							<TableCell className="text-right text-white font-semibold">
								¥{totalAmount.toLocaleString()}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</div>
	)
}
