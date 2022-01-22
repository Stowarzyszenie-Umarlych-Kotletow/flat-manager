import { Transaction } from "../transaction.model";

export interface CreateTransactionGroupRequest {
  name: string;
  usersConnected: string[];
  flatId: string;
  transactions: Transaction[];
}