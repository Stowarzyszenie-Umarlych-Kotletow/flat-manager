export interface TransactionGroupInfo {
  id: string;
  name: string;
  participants: string[];
  createdBy: string;
  flatId: string;
  transactions: Transaction[];
  dateCreated: Date;
  lastModified: Date;
}

export interface Transaction {
  name: string;
  price: string;
}