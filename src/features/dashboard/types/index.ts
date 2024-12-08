export interface Category {
  id: number
  name: string
}

export interface CategoryTotal {
  categoryId: number
  total: string
}

export type CategoryMap = {
  [key: number]: string
}

export interface Expense {
  id: number
  date: string
  name: string
  amount: string
  categoryId: number
}

export interface CurrentMonthData {
  expenses: Expense[]
}

export interface Category {
  id: number
  name: string
}
