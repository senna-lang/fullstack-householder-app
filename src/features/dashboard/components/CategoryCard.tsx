import { ArrowUpIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CategoryCardProps = {
  category: {
    id: number;
    name: string;
  }
  totalAmount: number;
};

export function CategoryCard({ category, totalAmount }: CategoryCardProps) {
   return (
     <Card className="w-full flex-1 transition-all duration-300 hover:shadow-lg bg-[#60a5fa] text-white">
       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
         <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
         <ArrowUpIcon className="h-4 w-4 text-[#2563eb]" />
       </CardHeader>
       <CardContent>
         <div className="text-2xl font-bold">{totalAmount.toLocaleString()} JPY</div>
         <p className="text-xs text-[#e0e7ff]">前月比 +20%</p>
       </CardContent>
       <CardContent className="pt-4">
         <div className="h-4 w-full rounded-full bg-[#93c5fd]">
           <div
             className="h-4 rounded-full bg-[#2563eb]"
             style={{ width: "75%" }}
             role="progressbar"
             aria-valuenow={75}
             aria-valuemin={0}
             aria-valuemax={100}
           ></div>
         </div>
         <p className="mt-2 text-xs text-[#e0e7ff]">目標達成率: 75%</p>
       </CardContent>
     </Card>
   );
 }