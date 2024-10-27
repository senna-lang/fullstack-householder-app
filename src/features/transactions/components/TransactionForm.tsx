"use client"

import { useState, type ChangeEvent } from "react"
import { Button } from "@/components/common/shadcn/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCreateFinance } from "../hooks/useCreateFinanse"

interface NewTransaction {
  date: string
  categoryId: string
  amount: string
}

interface TransactionFormProps {
  userId: string
  year: string
  month: string
}

export function TransactionForm({ userId, year, month }: TransactionFormProps) {
  const { mutate, isLoading } = useCreateFinance(userId, year, month)

  const [newTransaction, setNewTransaction] = useState<NewTransaction>({
    date: "",
    categoryId: "",
    amount: "",
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value })
  }

  const handleCategoryChange = (value: string) => {
    setNewTransaction({ ...newTransaction, categoryId: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate({
      date: newTransaction.date,
      categoryId: Number(newTransaction.categoryId),
      amount: Number(newTransaction.amount),
    })

    setNewTransaction({ date: "", categoryId: "", amount: "" })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-white shadow sm:rounded-lg p-4"
    >
      <div className="flex items-center gap-4">
        <Input
          type="date"
          name="date"
          value={newTransaction.date}
          onChange={handleInputChange}
          className="flex-1"
          required
          disabled={isLoading}
        />
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
    </form>
  )
}
