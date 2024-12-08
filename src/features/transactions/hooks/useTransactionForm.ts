import { type ChangeEvent, useState } from "react"
import type { NewTransaction } from "../types"
import type { UseMutateFunction } from "@tanstack/react-query"
import type {
  CreateFinanceData,
  CreateFinanceResponse,
} from "./useCreateFinanse"

export const useTransactionForm = (
  mutate: UseMutateFunction<
    CreateFinanceResponse,
    Error,
    CreateFinanceData,
    unknown
  >,
) => {
  const [newTransaction, setNewTransaction] = useState<NewTransaction>({
    name: "",
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
      name: newTransaction.name,
      date: newTransaction.date,
      categoryId: Number(newTransaction.categoryId),
      amount: Number(newTransaction.amount),
    })

    setNewTransaction({ name: "", date: "", categoryId: "", amount: "" })
  }

  return {
    newTransaction,
    handleInputChange,
    handleCategoryChange,
    handleSubmit,
  }
}
