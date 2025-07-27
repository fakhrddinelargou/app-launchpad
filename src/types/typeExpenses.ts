export type Expense = {
  id: string;
  userId: string;
  amount: string;
  description: string;
  category: "food"| "entertainment" | "health" | "other" |  "travel" | "tech";
  date: string;
  createdAt: string;
  updatedAt: string;
};
