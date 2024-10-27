import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card"
import { Chart } from "@/features/dashboard/components/chart"

type ChartCardProps = {
  financeData: FinanceDataResponse
}

const ChartCard = ({ financeData }: ChartCardProps) => {
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
