"use client"

import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from "recharts"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/common/ui/chart"

type MonthlyTotals = {
	[key: string]: number
}

type ChartProps = {
	data: MonthlyTotals
}

const chartConfig = {
	total: {
		label: "Total Expenses",
		color: "#2563eb",
	},
} satisfies ChartConfig

export function Chart({ data }: ChartProps) {
	// チャート用にデータを変換し、月順にソート
	const chartData = Object.entries(data)
		.map(([month, total]) => ({
			month,
			total,
			// ソート用に数値形式の日付を追加
			sortDate: new Date(month).getTime(),
		}))
		.sort((a, b) => a.sortDate - b.sortDate)
		.map(({ month, total }) => ({ month, total })) // sortDateを除去

	return (
		<ChartContainer config={chartConfig}>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="month"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
					/>
					<YAxis
						axisLine={false}
						tickLine={false}
						tickFormatter={(value) => `¥${value.toLocaleString()}`}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar dataKey="total" fill="var(--color-total)" radius={4} />
				</BarChart>
			</ResponsiveContainer>
		</ChartContainer>
	)
}
