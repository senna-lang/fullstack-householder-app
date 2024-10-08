import { Chart } from "@/components/chart"
import { DataTable } from "@/components/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchFinanceData } from "@/features/dashboard/api"
import { CategoryCard } from "@/features/dashboard/components/CategoryCard"
import { calculateCategoryTotals } from "@/features/dashboard/utils"

export default async function Home() {
	const { financeData, expenseCategoryData } = await fetchFinanceData()
	const categoryTotals = calculateCategoryTotals(financeData)

	return (
		<div className="flex flex-col  h-[calc(100vh-70px)] w-full p-12 gap-4 bg-[#e0e7ff]">
			<h2 className="text-3xl font-extrabold text-[#2563eb]">ダッシュボード</h2>
			<div className="flex gap-2 w-full">
				{expenseCategoryData.map((category) => (
					<CategoryCard
						key={category.id}
						category={category}
						totalAmount={categoryTotals[category.id] || 0}
					/>
				))}
			</div>
			<div className="flex gap-2 w-full flex-1">
				<div className="w-3/5 h-full">
					<Card className="h-full flex flex-col bg-white">
						<CardHeader>
							<CardTitle>月毎の比較</CardTitle>
						</CardHeader>
						<CardContent className="flex-1">
							<Chart />
						</CardContent>
					</Card>
				</div>
				<div className="w-2/5 h-full">
					<Card className="h-full flex flex-col bg-white">
						<CardHeader>
							<CardTitle>今月の出費</CardTitle>
						</CardHeader>
						<CardContent className="flex-1 overflow-auto">
							<DataTable />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
