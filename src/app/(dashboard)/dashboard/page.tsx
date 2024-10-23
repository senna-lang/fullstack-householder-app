import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/common/ui/card"
import { DataTable } from "@/features/dashboard/components/Table"
import { auth } from "@clerk/nextjs/server"
import CategoryCardList from "@/features/dashboard/components/CategoryCardList"
import ChartCard from "@/features/dashboard/components/ChartCard"
import { client } from "@/lib/hono"

export default async function Home() {
	const { userId } = auth()
	const financeData = await client.api["user-finance-data"][":id"].$get({
		param: { id: userId as string },
	})
	if (!financeData.ok) {
		return <div>Failed to fetch data</div>
	}

	const { monthlyTotals, currentMonthData } = await financeData.json()

	return (
		<div className="flex flex-col  h-[calc(100vh-70px)] w-full p-12 gap-4 bg-[#e0e7ff]">
			<h2 className="text-3xl font-extrabold text-[#2563eb]">Dashboard</h2>
			<CategoryCardList
				total={currentMonthData.total}
				categoryTotals={currentMonthData.categoryTotals}
			/>
			<div className="flex gap-2 w-full flex-1">
				<div className="w-3/5 h-full">
					<ChartCard data={monthlyTotals} />
				</div>
				<div className="w-2/5 h-full">
					<Card className="h-full flex flex-col bg-white">
						<CardHeader>
							<CardTitle>Expenses This Month</CardTitle>
						</CardHeader>
						<CardContent className="flex-1 overflow-auto">
							<DataTable data={currentMonthData.expenses} />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
