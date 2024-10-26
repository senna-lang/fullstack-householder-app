"use client"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/common/shadcn/card"
import {
	Chart,
	type MonthlyTotals,
} from "@/features/dashboard/components/Chart"
import { useFinanceData } from "../hooks/useFinanceData"
import { SkeltonBox } from "../../../components/common/SkeltonBox"
import { ErrorAlert } from "../../../components/common/ErrorAlert"

type ChartCardProps = {
	userId: string
}

const ChartCard = ({ userId }: ChartCardProps) => {
	const {
		data: financeData,
		isLoading: isFinanceLoading,
		error: financeError,
	} = useFinanceData(userId)

	// 両方のデータの読み込み中状態を処理
	if (isFinanceLoading) {
		return <SkeltonBox />
	}

	// エラー状態の処理
	if (financeError || !financeData) {
		return <ErrorAlert />
	}

	return (
		<Card className="h-full flex flex-col bg-white">
			<CardHeader>
				<CardTitle>Comparison by Month</CardTitle>
			</CardHeader>
			<CardContent className="flex-1">
				<Chart data={financeData.monthlyTotals} />
			</CardContent>
		</Card>
	)
}

export default ChartCard
