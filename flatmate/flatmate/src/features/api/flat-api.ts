import {api} from "./api"

type FlatQuery = {
    flatId: string;
}

type FlatQueryData<T> = {
    flatId: string;
    data: T;
}   

export const flatApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFlats: builder.query<FlatInfo[], void>({
            query: () => ({ url: '/flats', method: 'GET' }),
            providesTags: ['flats']
        }),
        getFlat: builder.query<FlatInfo, FlatQuery>({
            query: ({ flatId }) => ({ url: `/flats/${flatId}`, method: 'GET' }),
            async onQueryStarted(req, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(flatApi.util.prefetch('getFlatUsers', req, {}));
                dispatch(flatApi.util.prefetch('getFlatTasks', req, {}));
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
        getFlatTasks: builder.query<Task[], FlatQuery>({
            query: ({ flatId }) => ({ url: `/flats/${flatId}/tasks`, method: 'GET' }),
            providesTags: (res, _, { flatId }) => [{ type: 'flatTasks', id: flatId }]
        }),
        createFlatTask: builder.mutation<void, FlatQueryData<CreateTaskRequest>>({
            query: ({ flatId, data }) => ({ url: `/flats/${flatId}/tasks`, method: 'PUT', data }),
            invalidatesTags: (res, _, { flatId }) => [{ type: 'flatUsers', id: flatId }]
        }),
        createFlat: builder.mutation<FlatInfo, CreateFlatRequest>({
            query: (data) => ({ url: `/flats`, method: 'POST', data }),
            invalidatesTags: (res, _, req) => ['flats']
        }),
        getFlatSchedule: builder.query<GetScheduleResponse, FlatQueryData<GetScheduleRequest>>({
            query: ({flatId, data}) => ({url: `/flats/${flatId}/tasks-schedule`, method: 'POST'}),
            providesTags: ['flatSchedule']
        })
    })
});

export const {
    useGetFlatQuery, useGetFlatsQuery, useAddUserToFlatMutation, useCreateFlatMutation, useGetFlatUsersQuery,
    useCreateFlatTaskMutation, useGetFlatScheduleQuery, useGetFlatTasksQuery } = flatApi;