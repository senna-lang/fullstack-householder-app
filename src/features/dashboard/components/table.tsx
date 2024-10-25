"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/ui/table";
import { useCategory } from "../hooks/useCategory";
import { useFinanceData } from "../hooks/useFinanceData";

interface DataTableProps {
  userId: string;
}

export function DataTable({ userId }: DataTableProps) {
  const [mounted, setMounted] = useState(false);
  const { data: categories } = useCategory();
  const {
    data: financeData,
    isLoading: isFinanceLoading,
    error: financeError,
  } = useFinanceData(userId);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categoryMap = useMemo(() => {
    return (
      categories?.reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
      }, {} as { [key: number]: string }) || {}
    );
  }, [categories]);

  const getStatusColor = (amount: number) => {
    if (amount > 100000) return "text-red-600";
    if (amount > 50000) return "text-yellow-600";
    return "text-green-600";
  };

  if (!mounted) {
    return null;
  }

  if (isFinanceLoading) {
    return <div className="w-full flex justify-center p-4">Loading...</div>;
  }

  if (financeError || !financeData) {
    return (
      <div className="w-full flex justify-center p-4 text-red-500">
        Failed to load data
      </div>
    );
  }

  const totalAmount = financeData.currentMonthData.expenses.reduce(
    (sum, item) => sum + Number.parseFloat(item.amount),
    0
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto border rounded-md border-gray-200 h-full">
        <Table className="table-fixed w-full h-full">
          <TableHeader className="sticky top-0 z-10 bg-blue-500">
            <TableRow>
              <TableHead className="w-1/4 text-white">日付</TableHead>
              <TableHead className="w-1/2 text-white">カテゴリー</TableHead>
              <TableHead className="w-1/4 text-right text-white">
                金額
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {financeData.currentMonthData.expenses.length > 0 ? (
              financeData.currentMonthData.expenses.map(expense => (
                <TableRow key={expense.id} className="hover:bg-gray-50">
                  <TableCell className="w-1/4 font-medium text-blue-600">
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="w-1/2">
                    {categoryMap[expense.categoryId] || "Unknown"}
                  </TableCell>
                  <TableCell
                    className={`w-1/4 text-right font-mono ${getStatusColor(
                      Number.parseFloat(expense.amount)
                    )}`}
                  >
                    ¥{Number.parseFloat(expense.amount).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center p-4">
                  データがありません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex-none mt-2">
        <Table className="table-fixed w-full">
          <TableFooter>
            <TableRow className="bg-blue-500 flex justify-between items-center">
              <div className="flex w-full justify-between items-center px-4">
                <span className="text-white font-semibold">合計</span>
                <span className="text-white font-semibold font-mono">
                  ¥{totalAmount.toLocaleString()}
                </span>
              </div>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
