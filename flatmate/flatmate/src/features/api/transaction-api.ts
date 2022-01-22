import { TransactionGroupInfo } from "../../models/transaction.model";
import { CreateTransactionGroupRequest } from '../../models/api/transaction'
import { api } from "./api";

type FlatQuery = {
    flatId: string;
}

type FlatQueryData<T> = {
    flatId: string;
    data: T;
}

type TransactionGroupQuery = {
  transactionGroupId: string;
}

type TransactionGroupQueryData<T> = {
  data: T;
}

export const flatApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTransactionGroupsByFlatId: builder.query<TransactionGroupInfo[], FlatQuery> ({
          query: (flatId) => ({url: `/transaction-groups/by-flat-id/${flatId}`, method: 'GET'})
        }),
        getTransactionGroup: builder.query<TransactionGroupInfo, TransactionGroupQuery> ({
          query: (transactionGroupId) => ({url: `/transaction-groups/${transactionGroupId}`, method: 'GET'})
        }),
        addTransactionGroup: builder.mutation<void, TransactionGroupQueryData<CreateTransactionGroupRequest>> ({
          query: (data) => ({url: `/transaction-groups`, method: 'POST', data}),
        }),
        deleteTransactionGroup: builder.mutation<void, TransactionGroupQuery> ({
          query: (transactionGroupId) => ({url: `/transaction-groups/${transactionGroupId}`, method: 'DELETE'})
        }),
    })
});

export const { useAddTransactionGroupMutation } = flatApi;