import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../../models/api/auth";
import { api } from "./api";
import auth from "../auth";
import { DeleteAccountRequest } from "../../models/api/account";
import authSlice from "../auth";
import flatSlice from "../flat";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (data) => ({ url: '/auth/login', method: 'POST', data }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(auth.actions.setToken(data.token));
                dispatch(userApi.util.prefetch('getSelf', undefined, { force: true }));
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
        deleteAccount: builder.mutation<void, DeleteAccountRequest>({
            query: (data) => ({url: '/account/delete', method: 'POST', data}),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(api.util.resetApiState());
                dispatch(authSlice.actions.logout());
            }
        }),
        logout: builder.mutation<null, void>({
            query: () => ({}),
            async onQueryStarted(_, { dispatch }) {
                dispatch(auth.actions.logout());
                dispatch(flatSlice.actions.setCurrentFlat(null));
            }
        }),
    }),

});

export const { useLoginMutation, useGetSelfQuery, useGetUserByUsernameQuery, useRegisterMutation, useDeleteAccountMutation, useLogoutMutation } = userApi;