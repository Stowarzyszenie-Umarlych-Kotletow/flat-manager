import auth from "../features/auth";
import { getConfig } from "./api-client";
import { handleDates } from "./date-helper";
import axios from "axios";

const client = axios.create(getConfig());

export const config = {
    store: null
};

export function setStore(newStore) {
    config.store = newStore;
}


client.interceptors.request.use(req => {
    const authState = config.store.getState().auth;
    if (authState.isLoggedIn) {
        req.headers["Authorization"] = `Bearer ${authState.token.value}`;
    }

    return req;
}, err => {
    return Promise.reject(err);
});

client.interceptors.response.use(res => {
    const authState = config.store.getState().auth;
    if (authState.isLoggedIn && res.status == 401) {
        console.log("Logout because of received 401");
        config.store.dispatch(auth.actions.logout());
    }
    return res;
}, err => {
    return Promise.reject(err);
});


export default client;