import {Task} from "../../models/task.model";
import {api} from "./api"
import {FlatInfo, UserDebt, UserRole} from "../../models/flat.model";
import {CreateFlatRequest} from "../../models/api/flat";

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
            query: () => ({url: '/flats', method: 'GET'}),
            providesTags: ['flats']
        }),
        getFlat: builder.query<FlatInfo, FlatQuery>({
            query: ({flatId}) => ({url: `/flats/${flatId}`, method: 'GET'}),
            async onQueryStarted(req, {dispatch, queryFulfilled}) {
                await queryFulfilled;
                dispatch(flatApi.util.prefetch('getFlatUsers', req, {}));
                dispatch(flatApi.util.prefetch('getFlatTasks', req, {}));
            },
            providesTags: (res, _, {flatId}) => [{type: 'flats', id: flatId}]
        }),
        getFlatDebts: builder.query<UserDebt[], FlatQuery>({
            query: ({flatId}) => ({url: `/flats/${flatId}/my-debts`, method: 'GET'})
        }),
        getFlatUsers: builder.query<UserInfo[], FlatQuery>({
            query: ({flatId}) => ({url: `/flats/${flatId}/users`, method: 'GET'}),
            providesTags: (res, _, {flatId}) => [{type: 'flatUsers', id: flatId}]
        }),
        addUserToFlat: builder.mutation<void, { flatId: string, userId: string, role: UserRole }>({
            query: ({flatId, userId, role}) => ({
                url: `/flats/${flatId}/users`,
                method: 'PUT',
                data: {userId, role}
            }),
            invalidatesTags: (res, _, {flatId}) => [{type: 'flatUsers', id: flatId}]
        }),
        deleteUserFromFlat: builder.mutation<void, { flatId: string, userId: string }>({
            query: ({flatId, userId}) => ({url: `/flats/${flatId}/users/${userId}/remove`, method: 'POST'}),
            invalidatesTags: (res, _, {flatId}) => [{type: 'flatUsers', id: flatId}]
        }),
        getFlatTasks: builder.query<Task[], FlatQuery>({
            query: ({flatId}) => ({url: `/flats/${flatId}/tasks`, method: 'GET'}),
            providesTags: (res, _, {flatId}) => [{type: 'flatTasks', id: flatId}]
        }),
        createFlatTask: builder.mutation<void, FlatQueryData<CreateTaskRequest>>({
            query: ({flatId, data}) => ({url: `/flats/${flatId}/tasks`, method: 'PUT', data}),
            invalidatesTags: (res, _, {flatId}) => [{type: 'flatTasks', id: flatId}]
        }),
        deleteFlatTask: builder.mutation<void, {flatId: string, taskId: string }>({
           query: ({flatId, taskId}) => ({url: `/flats/${flatId}/tasks/${taskId}`, method: 'DELETE'}),
            invalidatesTags: (res, _, {flatId}) => [{type: 'flatTasks', id: flatId}]
        }),
        createFlat: builder.mutation<FlatInfo, CreateFlatRequest>({
            query: (data) => ({url: `/flats`, method: 'POST', data}),
            invalidatesTags: (res, _, req) => ['flats']
        }),
        getFlatSchedule: builder.query<GetScheduleResponse, FlatQueryData<GetScheduleRequest>>({
            query: ({flatId, data}) => ({url: `/flats/${flatId}/tasks-schedule`, method: 'POST', data}),
            providesTags: ['flatSchedule']
        }),
        getFlatTask: builder.query<Task, { flatId: string, taskId: string }>({
            query: ({flatId, taskId}) => ({url: `/flats/${flatId}/tasks/${taskId}`}),
            providesTags: (res, _, {taskId}) => [{type: 'flatTask', id: taskId}]
        }),
        setFlatTaskCompleted: builder.mutation<void, { flatId: string, taskId: string, taskInstanceId: string }>({
            query: ({flatId, taskId, taskInstanceId}) =>
                ({url: `/flats/${flatId}/tasks/${taskId}/instances/${taskInstanceId}/completed`, method: 'POST'}),
            invalidatesTags: (res, _, {taskId}) => ['flatSchedule', {type: 'flatTask', id: taskId}]
        })
    })
});

export const {
    useGetFlatQuery, useGetFlatsQuery, useAddUserToFlatMutation, useCreateFlatMutation, useGetFlatUsersQuery,
    useCreateFlatTaskMutation, useGetFlatScheduleQuery, useGetFlatTasksQuery, useGetFlatTaskQuery,
    useSetFlatTaskCompletedMutation, useDeleteUserFromFlatMutation, useDeleteFlatTaskMutation,
    useGetFlatDebtsQuery
} = flatApi;