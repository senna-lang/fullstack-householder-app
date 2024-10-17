import { Chart } from "@/features/dashboard/components/chart"
import { DataTable } from "@/features/dashboard/components/table"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/common/ui/card"
import { fetchFinanceData } from "@/features/dashboard/api"
import { CategoryCard } from "@/features/dashboard/components/CategoryCard"
import { calculateCategoryTotals } from "@/features/dashboard/utils"
import { auth } from "@clerk/nextjs/server"

export default async function Home() {
	const { userId } = auth()
	const { financeData, expenseCategoryData } = await fetchFinanceData(
		userId || "",
	)
	const calculatedData = calculateCategoryTotals(financeData)

	// 現在の年月を取得
	const currentDate = new Date()
	const currentYearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`

	// 現在の月のデータのみをフィルタリング
	const currentMonthData = financeData.filter((item) => {
		const itemDate = new Date(item.date)
		const itemYearMonth = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, "0")}`
		return itemYearMonth === currentYearMonth
	})

	// 現在の月のデータで再計算
	const currentMonthCalculatedData = calculateCategoryTotals(currentMonthData)

	return (
		<div className="flex flex-col  h-[calc(100vh-70px)] w-full p-12 gap-4 bg-[#e0e7ff]">
			<h2 className="text-3xl font-extrabold text-[#2563eb]">Dashboard</h2>
			<div className="flex gap-2 w-full">
				<CategoryCard
					category="total"
					totalAmount={currentMonthCalculatedData.grandTotal}
				/>
				{expenseCategoryData.map((category) => (
					<CategoryCard
						key={category.id}
						category={category.name}
						totalAmount={
							currentMonthCalculatedData.categoryTotals[category.id] || 0
						}
					/>
				))}
			</div>
			<div className="flex gap-2 w-full flex-1">
				<div className="w-3/5 h-full">
					<Card className="h-full flex flex-col bg-white">
						<CardHeader>
							<CardTitle>Comparison by Month</CardTitle>
						</CardHeader>
						<CardContent className="flex-1">
							<Chart data={calculatedData.monthlyTotals} />
						</CardContent>
					</Card>
				</div>
				<div className="w-2/5 h-full">
					<Card className="h-full flex flex-col bg-white">
						<CardHeader>
							<CardTitle>Expenses This Month</CardTitle>
						</CardHeader>
						<CardContent className="flex-1 overflow-auto">
							<DataTable data={currentMonthData} />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
