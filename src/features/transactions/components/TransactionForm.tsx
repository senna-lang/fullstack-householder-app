"use client"

import { Button } from "@/components/common/shadcn/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type {
  CreateFinanceData,
  CreateFinanceResponse,
} from "../hooks/useCreateFinanse"
import type { UseMutateFunction } from "@tanstack/react-query"
import { useTransactionForm } from "../hooks/useTransactionForm"

interface TransactionFormProps {
  isLoading: boolean
  mutate: UseMutateFunction<
    CreateFinanceResponse,
    Error,
    CreateFinanceData,
    unknown
  >
}

export function TransactionForm({ isLoading, mutate }: TransactionFormProps) {
  const {
    newTransaction,
    handleInputChange,
    handleCategoryChange,
    handleSubmit,
  } = useTransactionForm(mutate)
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-white shadow sm:rounded-lg p-4"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input
            type="text"
            name="name"
            value={newTransaction.name}
            onChange={handleInputChange}
            placeholder="Transaction name"
            className="flex-1"
            required
            disabled={isLoading}
          />
          <Input
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
            className="flex-1"
            required
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center gap-4">
          <Select
            onValueChange={handleCategoryChange}
            value={newTransaction.categoryId}
            required
            disabled={isLoading}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Hobbies</SelectItem>
              <SelectItem value="2">Fixed</SelectItem>
              <SelectItem value="3">Miscellaneous</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            name="amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
            placeholder="Amount (JPY)"
            className="flex-1"
            required
            disabled={isLoading}
          />
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Transaction"}
          </Button>
        </div>
      </div>
    </form>
  )
}
