export type Expense = {
  id: string;
  userId: string;
  amount: string;
  description: string;
  category: "food" | "rent" | "travel" | "other" | "utilities";
  date: string;
  createdAt: string;
  updatedAt: string;
};
