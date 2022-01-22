import { Transaction } from "../transaction.model";

export interface CreateTransactionGroupRequest {
  name: string;
  participants: string[];
  flatId: string;
  transactions: Transaction[];
}