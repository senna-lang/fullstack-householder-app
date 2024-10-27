import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card"
import { DataTable } from "./table"

interface TableCardProps {
  financeData: FinanceDataResponse
  categoryData: CategoryDataResponse
}

const TableCard = ({ financeData, categoryData }: TableCardProps) => {
  return (
    <Card className="h-full flex flex-col bg-white">
      <CardHeader>
        <CardTitle>Expenses This Month</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <DataTable financeData={financeData} categoryData={categoryData} />
      </CardContent>
    </Card>
  )
}

export default TableCard
