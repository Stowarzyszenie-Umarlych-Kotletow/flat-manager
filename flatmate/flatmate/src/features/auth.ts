import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest, RegisterRequest } from "../models/api/auth";
import authService from "../services/auth.service";
import jwt from "jwt-decode";
import accountService from "../services/account.service";

interface AuthToken {
    username: string;
    expires_at: number;
    value: string;
}

interface AuthState {
    isLoggedIn: boolean;
    token?: AuthToken;
    user?: User;
}
const initialState: AuthState = { isLoggedIn: false };

export const login = createAsyncThunk(
    "auth/login",
    async (body: LoginRequest, {dispatch}) => {
        const response = await authService.login(body);
        dispatch(authSlice.actions.setToken(response.data.token));
        return response.data;
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (body: RegisterRequest, api) => {
        const response = await authService.register(body);
        const { username, password } = body;
        api.dispatch(login({ username, password }));
        return response.data;
    }
)

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (payload, api) => {
        const response = await accountService.getSelf();
        api.dispatch(authSlice.actions.setUser(response.data));
        return response.data;
    }
)

export const verifyToken = (token: AuthToken) => {
    return token != null && token.expires_at > Date.now();
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        checkToken(state) {
            state.isLoggedIn = verifyToken(state.token);
        },
        setUser(state, { type, payload }: PayloadAction<User>) {
            state.user = payload;
        },
        setToken(state, { type, payload }: PayloadAction<string>) {
            const { exp, sub } = jwt(payload) as any;
            const token = { username: sub, expires_at: exp * 1000, value: payload };
            if (!verifyToken(token))
                throw new Error("Invalid token");
            state.isLoggedIn = true;
            state.token = token;
            state.user = null;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.token = null;
            state.user = null;
        }
    },
    extraReducers: {
        [getUser.rejected]: (state, action) => {
            console.log("Failed to retrieve current user");
        }
    }
});

export const { reducer } = authSlice;
export default authSlice;