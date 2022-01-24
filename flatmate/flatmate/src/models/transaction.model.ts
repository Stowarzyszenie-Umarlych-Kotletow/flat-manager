import { UserDebt } from "./flat.model";

export interface TransactionGroupInfo {
  id: string;
  name: string;
  usersConnected: string[];
  createdBy: string;
  flatId: string;
  transactions: Transaction[];
  debts: UserDebt[];
  dateCreated: Date;
  lastModified: Date;
  sumOfTransactions: string;
}

export interface Transaction {
  name: string;
  price: string;
}