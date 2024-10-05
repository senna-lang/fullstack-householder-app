import React from "react";
import { Chart } from "@/components/chart";
import { DataTable } from "@/components/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-70px)] p-12 gap-4 bg-[#e0e7ff]">
      <h2 className="text-3xl font-extrabold text-[#2563eb]">ダッシュボード</h2>
      <div className="flex gap-2 w-full">
        {["合計", "固定費", "娯楽費", "雑費"].map((title, index) => (
          <Card
            key={index}
            className="w-full flex-1 transition-all duration-300 hover:shadow-lg bg-[#60a5fa] text-white"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <ArrowUpIcon className="h-4 w-4 text-[#2563eb]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">260,000 JPY</div>
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
  );
}
