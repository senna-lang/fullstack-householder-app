"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/common/shadcn/chart"

export type MonthlyTotals = {
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
  const chartData = Object.entries(data)
    .map(([month, total]) => ({
      month,
      total,
      sortDate: new Date(month).getTime(),
    }))
    .sort((a, b) => a.sortDate - b.sortDate)
    .map(({ month, total }) => ({ month, total }))

  return (
    <ChartContainer config={chartConfig}>
      <BarChart width={527} height={275} data={chartData}>
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
    </ChartContainer>
  )
}
