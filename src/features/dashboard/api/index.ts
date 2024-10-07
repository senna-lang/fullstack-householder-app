// lib/data-fetching.ts
import { notFound } from "next/navigation";

import { client } from "@/lib/hono";

export async function fetchFinanceData() {
  const financeResponse = await client.api["user-finance"].$get();
  const expenseCategoryResponse = await client.api["expense-category"].$get();

  if (!financeResponse.ok || !expenseCategoryResponse.ok) {
    return notFound();
  }

  const financeData = await financeResponse.json();
  const expenseCategoryData = await expenseCategoryResponse.json();

  return { financeData, expenseCategoryData };
}