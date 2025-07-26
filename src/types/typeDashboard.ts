


export type DashboardType = {
   totalExpenses: number;
  totalBudget: number;
  remainingBudget: number;
  categorySpending: Record<string, number>;
  expenseCount: number;
  budgetCount: number;
  budgets: Budget[];
}

export type Budget = {
  id: string;
  userId: string;
  category: string;
  amount: number;
  month: string; // e.g. "2020-02"
  spent: number;
  createdAt: string; 
  updatedAt: string; 
};