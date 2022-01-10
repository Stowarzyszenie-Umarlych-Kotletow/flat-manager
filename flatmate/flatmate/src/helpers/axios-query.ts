import { BaseQueryFn } from "@reduxjs/toolkit/query"
import axios, { Axios, AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const axiosBaseQuery =
  (
    client: AxiosInstance,
    { baseUrl, urlTransformer }: { baseUrl: string, urlTransformer?: (url: string) => string } = { baseUrl: '', urlTransformer: null }
  ): BaseQueryFn<
    {
      url?: string
      method?: AxiosRequestConfig['method'],
      data?: AxiosRequestConfig['data']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data }) => {
    try {
      if (!url) {
        return { data: null};
      }
      if (!method) {
        method = 'GET';
      }
      let targetUrl = baseUrl + url;
      if (urlTransformer != null) {
        targetUrl = urlTransformer(targetUrl);
      }
      const result = await client({ url: baseUrl + url, method, data })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: { status: err.response?.status, data: err.response?.data },
      }
    }
  };

export default axiosBaseQuery;