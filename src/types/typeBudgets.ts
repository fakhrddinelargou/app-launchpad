

 export type Budget = {
  id: string;
  userId: string;
  category: "food" | "rent" | "travel" | "other";
  amount: number;
  month: string; 
  spent: number;
  createdAt: string; 
  updatedAt: string; 
};


