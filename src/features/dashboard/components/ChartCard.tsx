import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/common/ui/card"
import {
	Chart,
	type MonthlyTotals,
} from "@/features/dashboard/components/Chart"

type ChartCardProps = {
	data: MonthlyTotals
}

const ChartCard = ({ data }: ChartCardProps) => {
	return (
		<Card className="h-full flex flex-col bg-white">
			<CardHeader>
				<CardTitle>Comparison by Month</CardTitle>
			</CardHeader>
			<CardContent className="flex-1">
				<Chart data={data} />
			</CardContent>
		</Card>
	)
}

export default ChartCard
