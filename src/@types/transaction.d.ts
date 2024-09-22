interface Transaction {
  id: string;
  text: string;
  amount: number;
  userId: User["id"];
  type: TransactionType;
  createdAt: Dayjs;
  updatedAt: Dayjs;
  transactionDate: Dayjs;
}

type TransactionType = "sent" | "received";
