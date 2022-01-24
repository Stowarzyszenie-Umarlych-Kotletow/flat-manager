import axios, { AxiosRequestConfig } from "axios";
import { API_BASE } from "../config";

export function getConfig(): AxiosRequestConfig {
    return {
        baseURL: API_BASE,
        validateStatus: (status) => status >= 200 && status < 300,
        withCredentials: false
    };
}

const client = axios.create(getConfig());

export default client;