interface Transaction {
  id: string;
  text: string;
  amount: number;
  userId: User["id"];
  categoryId: string;
  category: Category;
  type: TransactionType;
  createdAt: Dayjs;
  updatedAt: Dayjs;
  transactionDate: Dayjs;
}

type TransactionType = "expense" | "income";
