"use client"
import React, { useState, useEffect } from "react"

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/common/ui/table"

const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
]

export function DataTable() {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Paid":
				return "text-green-600"
			case "Pending":
				return "text-yellow-600"
			case "Unpaid":
				return "text-red-600"
			default:
				return ""
		}
	}

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
								<TableHead className="w-[100px] text-white">
									請求書番号
								</TableHead>
								<TableHead className="text-white">状態</TableHead>
								<TableHead className="text-white">支払方法</TableHead>
								<TableHead className="text-right text-white">金額</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{invoices.map((invoice, index) => (
								<TableRow
									key={`${invoice.invoice}-${index}`}
									className="hover:bg-[#e0e7ff]"
								>
									<TableCell className="font-medium text-[#2563eb]">
										{invoice.invoice}
									</TableCell>
									<TableCell className={getStatusColor(invoice.paymentStatus)}>
										{invoice.paymentStatus}
									</TableCell>
									<TableCell>{invoice.paymentMethod}</TableCell>
									<TableCell className="text-right">
										{invoice.totalAmount}
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
						<TableRow className="bg-[#60a5fa]  hover:bg-[#60a5fa]">
							<TableCell colSpan={3} className="text-white font-semibold">
								合計
							</TableCell>
							<TableCell className="text-right text-white font-semibold">
								$2,500.00
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</div>
	)
}
