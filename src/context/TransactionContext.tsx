import dayjs from "dayjs";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const transactions = localStorage.getItem("transactions");
    if (transactions) {
      setTransactions(JSON.parse(transactions));
    }
  }, []);

  useEffect(() => {
    if (transactions.length === 0) return;
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addUpdateTransaction = (
    transaction: Omit<Transaction, "id"> & { id?: Transaction["id"] }
  ) => {
    if (transaction?.id) {
      setTransactions(
        transactions.map((u) =>
          u.id === transaction.id
            ? { ...u, ...transaction, updatedAt: dayjs() }
            : u
        )
      );
    } else {
      setTransactions([
        { ...transaction, id: uuid(), createdAt: dayjs(), updatedAt: dayjs() },
        ...transactions,
      ]);
    }
  };

  const deleteTransaction = (id: Transaction["id"]) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addUpdateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
