"use client"
import { TransactionForm } from "@/features/transactions/components/TransactionForm"
import { useCreateFinance } from "@/features/transactions/hooks/useCreateFinanse"

interface TransactionFormPresentationProps {
  userId: string
  year: string
  month: string
}

const TransactionFormPresentation = ({
  userId,
  year,
  month,
}: TransactionFormPresentationProps) => {
  const { mutate, isLoading } = useCreateFinance(userId ?? "", year, month)
  return <TransactionForm isLoading={isLoading} mutate={mutate} />
}

export default TransactionFormPresentation
