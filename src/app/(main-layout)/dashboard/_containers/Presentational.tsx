import CategoryCardList from "../../../../features/dashboard/components/CategoryCardList"
import ChartCard from "../../../../features/dashboard/components/ChartCard"
import TableCard from "@/features/dashboard/components/TableCard"

// Presentationalコンポーネントのprops型
export interface PresentationalProps {
  financeData: FinanceDataResponse
  categoryData: CategoryDataResponse
}

const Presentational = ({ financeData, categoryData }: PresentationalProps) => {
  return (
    <div className="flex flex-col  h-[calc(100vh-70px)] w-full p-12 gap-4 bg-[#e0e7ff]">
      <h2 className="text-3xl">Dashboard</h2>
      <CategoryCardList financeData={financeData} categoryData={categoryData} />
      <div className="flex gap-2 w-full flex-1">
        <div className="w-3/5 h-full">
          <ChartCard financeData={financeData} />
        </div>
        <div className="w-2/5 h-full">
          <TableCard financeData={financeData} categoryData={categoryData} />
        </div>
      </div>
    </div>
  )
}

export default Presentational
