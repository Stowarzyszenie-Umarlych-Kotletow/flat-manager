import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FlatState {
    selectedFlatId?: string;
}

const initialState: FlatState = { selectedFlatId: null };


const flatSlice = createSlice({
    name: "flats",
    initialState,
    reducers: {
        setCurrentFlat(state, {payload}: PayloadAction<string>) {
            state.selectedFlatId = payload;
        }
    },
    extraReducers: {

    }
});

export const { reducer } = flatSlice;
export default flatSlice;