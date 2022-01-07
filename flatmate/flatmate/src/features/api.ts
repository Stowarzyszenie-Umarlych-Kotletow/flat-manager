import { createApi } from "@reduxjs/toolkit/dist/query/react";
import client from "../helpers/authorized-api-client";
import axiosBaseQuery from "../helpers/axios-query";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../models/api/auth";
import { API_BASE } from "../config";
import auth from "../features/auth";

type FlatQuery = {
    flatId: string;
}


export const api = createApi({
    reducerPath: 'flatApi',
    tagTypes: ['flats', 'flatUsers', 'flatTasks', 'self'],
    baseQuery: axiosBaseQuery(client, { baseUrl: API_BASE }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (data) => ({ url: '/auth/login', method: 'POST', data }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(auth.actions.setToken(data.token));
                dispatch(api.util.prefetch('getSelf', undefined, { force: true }));
            },
            invalidatesTags: ['self']
        }),
        getSelf: builder.query<User, void>({
            query: () => ({ url: '/account', method: 'GET' }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(auth.actions.setUser(data));
            },
            providesTags: ['self']
        }),
        getUserByUsername: builder.query<User, {username: string}>({
            query: ({username}) => ({url: `/users/by/username/${username}`})
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (data) => ({ url: '/auth/register', method: 'POST', data })
        }),
        logout: builder.mutation<null, void>({
            queryFn: () => ({data: null}),
            async onQueryStarted(_, { dispatch }) {
                dispatch(auth.actions.logout());
            }
        }),
        getFlats: builder.query<FlatInfo[], void>({
            query: () => ({ url: '/flats', method: 'GET' }),
            providesTags: ['flats']
        }),
        getFlat: builder.query<FlatInfo, FlatQuery>({
            query: ({ flatId }) => ({ url: `/flats/${flatId}`, method: 'GET' }),
            async onQueryStarted(req, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(api.util.prefetch('getFlatUsers', req, {}));
            },
            providesTags: (res, _, { flatId }) => [{ type: 'flats', id: flatId }]
        }),
        getFlatUsers: builder.query<UserInfo[], FlatQuery>({
            query: ({ flatId }) => ({ url: `/flats/${flatId}/users`, method: 'GET' }),
            providesTags: (res, _, { flatId }) => [{ type: 'flatUsers', id: flatId }]
        }),
        addUserToFlat: builder.mutation<void, { flatId: string, userId: string }>({
            query: ({ flatId, userId }) => ({ url: `/flats/${flatId}/users`, method: 'PUT', data: { userId } }),
            invalidatesTags: (res, _, { flatId }) => [{ type: 'flatUsers', id: flatId }]
        }),
        createFlat: builder.mutation<FlatInfo, CreateFlatRequest>({
            query: (data) => ({ url: `/flats`, method: 'POST', data }),
            invalidatesTags: (res, _, req) => ['flats']
        }),


    }),
});

export const { useLoginMutation, useGetSelfQuery, useGetUserByUsernameQuery, useRegisterMutation,
    useGetFlatQuery, useGetFlatsQuery, useAddUserToFlatMutation, useCreateFlatMutation, useGetFlatUsersQuery } = api;