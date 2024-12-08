export interface NewTransaction {
  name: string
  date: string
  categoryId: string
  amount: string
}

export interface Expense {
  id: string
  name: string
  date: string
  categoryId: number
  amount: number
}

export interface MonthData {
  expenses: Expense[]
}

export interface MonthlyFinanceDataResponse {
  monthData: MonthData
}

export interface Category {
  id: number
  name: string
}

type CategoryDataResponse = Category[]

export interface CategoryMap {
  [key: number]: string
}
