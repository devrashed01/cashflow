import privateRequest from "../config/axios.config";

export const getTransactionsAction = async () =>
  privateRequest
    .get<{ docs: Transaction[] }>("/admin/transaction/list")
    .then((res) => res.data.docs);

export const deleteTransactionAction = async (id: string) =>
  privateRequest.delete(`/admin/transaction/delete/${id}`);

export const createTransactionAction = async (data: Transaction) =>
  privateRequest.post("/admin/transaction/create", data);

export const updateTransactionAction = async (data: Transaction, ID: string) =>
  privateRequest.put(`/admin/transaction/update/${ID}`, data);
