import { ArrowUpIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card";
import { Progress } from "@/components/common/shadcn/progress";

type CategoryCardProps = {
  category: string;
  totalAmount: number;
};

export function CategoryCard({ category, totalAmount }: CategoryCardProps) {
  return (
    <Card className="w-full max-w-md transition-all duration-300 hover:shadow-lg bg-blue-500 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{category}</CardTitle>
        <ArrowUpIcon className="h-4 w-4 text-blue-200" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {totalAmount.toLocaleString()} JPY
        </div>
        <p className="text-xs text-blue-200">+20% from last month</p>
      </CardContent>
      <CardContent className="pt-4">
        <Progress value={20} className="h-4 w-full bg-blue-300" />
        <p className="mt-2 text-xs text-blue-200">Target completion: {20}%</p>
      </CardContent>
    </Card>
  );
}
