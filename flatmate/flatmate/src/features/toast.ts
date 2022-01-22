import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessageState {
    message?: string;
}

const initialState: MessageState = { message: null };


const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        setMessage(state, {payload}: PayloadAction<string>) {
            state.message = payload;
        },
        clearMessage(state) {
            state.message = null;
        }
    },
    extraReducers: {

    }
});

export const { reducer } = toastSlice;
export default toastSlice;