import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stringHasContent } from "react-native-big-calendar";
import { LoginRequest, RegisterRequest } from "../models/api/auth";
import authService from "../services/auth.service";
import flatService from "../services/flat.service";
import taskService from "../services/task.service";

interface FlatContext extends FlatInfo {
    users?: UserInfo[];
    tasks?: Task[];
}

interface FlatContextMap {
    [flatId: string]: FlatContext;
}

interface TaskContextMap {
    [taskId: string]: Task;
}

interface FlatState {
    selectedFlatId?: string;
    flats: FlatContextMap;
    tasks?: TaskContextMap;
    
}

interface FlatUpdate<T> {
    id: string;
    data: T;
}

const initialState: FlatState = { selectedFlatId: null, flats: {}, tasks: {}};


function getContext(state: FlatState, flatId: string): FlatContext {
    if (!(flatId in state)) {
        throw new Error("Can't update missing flat");
    }
    return state.flats[flatId];
}


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
export function getFlatContext(state: FlatState) {
    var id = state.selectedFlatId;
    if (id == null) return null;
    if (!(id in state.flats)) return null;
    return state.flats[id];
}
export default flatSlice;