interface User {
  id: string;
  name: string;
}

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

interface UserContextType {
  users: User[];
  addUpdateUser: (user: Omit<User, "id"> & { id?: User["id"] }) => void;
  deleteUser: (id: User["id"]) => void;
}

interface TransactionContextType {
  transactions: Transaction[];
  addUpdateTransaction: (
    transaction: Omit<Transaction, "id"> & { id?: Transaction["id"] }
  ) => void;
  deleteTransaction: (id: Transaction["id"]) => void;
}
