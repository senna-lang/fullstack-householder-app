import { Chart } from "@/components/common/chart";
import { DataTable } from "@/components/common/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { fetchFinanceData } from "@/features/dashboard/api";
import { CategoryCard } from "@/features/dashboard/components/CategoryCard";
import { calculateCategoryTotals } from "@/features/dashboard/utils";
import { auth } from "@clerk/nextjs/server";
import { useMemo } from "react";

export default async function Home() {
  const { userId } = auth();
  const { financeData, expenseCategoryData } = await fetchFinanceData(
    userId || ""
  );
  const categoryTotals = calculateCategoryTotals(financeData);

  return (
    <div className="flex flex-col  h-[calc(100vh-70px)] w-full p-12 gap-4 bg-[#e0e7ff]">
      <h2 className="text-3xl font-extrabold text-[#2563eb]">Dashboard</h2>
      <div className="flex gap-2 w-full">
        <CategoryCard
          category="total"
          totalAmount={categoryTotals.grandTotal}
        />
        {expenseCategoryData.map(category => (
          <CategoryCard
            key={category.id}
            category={category.name}
            totalAmount={categoryTotals.categoryTotals[category.id] || 0}
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
              <Chart />
            </CardContent>
          </Card>
        </div>
        <div className="w-2/5 h-full">
          <Card className="h-full flex flex-col bg-white">
            <CardHeader>
              <CardTitle>Expenses This Month</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <DataTable />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
