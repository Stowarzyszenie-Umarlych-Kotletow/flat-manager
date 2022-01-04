import axios from "axios";
import store from "../store";
import auth from "../features/auth";
import { getConfig } from "./api-client";


const client = axios.create(getConfig());



client.interceptors.request.use(req => {
    const authState = store.getState().auth;
    if (authState.isLoggedIn) {
        req.headers["Authorization"] = `Bearer ${authState.token.value}`;
    }

    return req;
}, err => {
    return Promise.reject(err);
});

client.interceptors.response.use(res => {
    const authState = store.getState().auth;
    if (authState.isLoggedIn && res.status == 401) {
        console.log("Logout because of received 401");
        store.dispatch(auth.actions.logout());
    }
    return res;
}, err => {
    return Promise.reject(err);
});

export default client;