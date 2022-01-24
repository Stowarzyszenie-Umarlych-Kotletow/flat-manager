import { Transaction } from "../transaction.model";

export interface CreateTransactionGroupRequest {
  name: string;
  usersConnected: string[];
  flatId: string;
  transactions: Transaction[];
}

export interface ResolveUserDebtRequest {
  userId: string;
  transactionGroupId: string;
}