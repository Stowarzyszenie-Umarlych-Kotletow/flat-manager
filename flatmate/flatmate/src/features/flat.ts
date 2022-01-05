import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stringHasContent } from "react-native-big-calendar";
import { LoginRequest, RegisterRequest } from "../models/api/auth";
import authService from "../services/auth.service";
import flatService from "../services/flat.service";
import taskService from "../services/task.service";

interface FlatContext extends FlatInfo {
    users?: UserInfo[];
    tasks?: TaskInfo[];
}

interface FlatContextMap {
    [flatId: string]: FlatContext;
}

interface FlatState {
    selectedFlatId?: string;
    flats: FlatContextMap;
}

interface FlatUpdate<T> {
    id: string;
    data: T;
}

const initialState: FlatState = { selectedFlatId: null, flats: {}};

export const getFlat = createAsyncThunk(
    "flat/getFlat",
    async (id: string, {dispatch}) => {
        const {data} = await flatService.getFlat(id);
        await dispatch(flatSlice.actions.addFlat({id, data}));
        await dispatch(updateFlatUsers(id)).unwrap();
        await dispatch(updateFlatTasks(id)).unwrap();
        return data;
    }
);

export const getUserFlats = createAsyncThunk(
    "flat/getUserFlats",
    async (_, {dispatch}) => {
        const {data} = await flatService.getFlats();
        data.forEach(flatData => {
            dispatch(flatSlice.actions.addFlat({id: flatData.id, data: flatData}));
        });
        return data;
    }
);

export const updateFlatUsers = createAsyncThunk(
    "flat/updateUsers",
    async (id: string, {dispatch}) => {
        const {data} = await flatService.getFlatUsers(id);
        dispatch(flatSlice.actions.setFlatUsers({id, data}));
        return data;
    }
)

export const updateFlatTasks = createAsyncThunk(
    "flat/updateTasks",
    async (id: string, {dispatch}) => {
        const {data} = await taskService.getFlatTasks(id);
        dispatch(flatSlice.actions.setFlatTasks({id, data}));
        return data;
    }
)
export const createFlat = createAsyncThunk(
    "flat/create",
    async (body: CreateFlatRequest, {dispatch}) => {
        const {data} = await flatService.createFlat(body);
        dispatch(flatSlice.actions.addFlat({id: data.id, data}));
        return data;
    }
)

export const addUser = createAsyncThunk(
    "flat/addUser",
    async ({flatId, userId}: any, {dispatch}) => {
        const {data} = await flatService.addUserToFlat(flatId, userId);
        await dispatch(updateFlatUsers(flatId)).unwrap();
        return data;
    }
)

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
        },
        setFlatTasks(state, {payload: {id, data}}) {
            getContext(state, id).tasks = data;
        },
        setFlatUsers(state, {payload: {id, data}}) {
            getContext(state, id).users = data;
        },
        addFlat(state, {payload: {id, data}}: PayloadAction<FlatUpdate<FlatInfo>>) {
            state.flats[id] = data;
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
