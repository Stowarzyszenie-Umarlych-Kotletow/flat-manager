import { createApi } from "@reduxjs/toolkit/dist/query/react";
import client from "../../helpers/authorized-api-client";
import axiosBaseQuery from "../../helpers/axios-query";
import { API_BASE } from "../../config";


export const api = createApi({
    reducerPath: 'flatApi',
    tagTypes: [
        'flats', 'flatUsers', 'flatTasks', 'flatTask',
        'flatTransactions', 'flatSchedule', 'self'],
    keepUnusedDataFor: 30,
    baseQuery: axiosBaseQuery(client, { baseUrl: API_BASE }),
    endpoints: (builder) => ({


    }),
});
