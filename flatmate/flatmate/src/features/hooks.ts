import { useMemo } from "react";
import { useAppSelector } from "../store";
import { useGetFlatQuery, useGetFlatTasksQuery, useGetFlatUsersQuery } from "./api/flat-api";

export const useAuth = () => {
    const user = useAppSelector(state => state.auth.user);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    return useMemo(() => ({user, isLoggedIn}), [user, isLoggedIn]);
}

export const useFlat = () => {
    const flatId = useSelectedFlatId();
    const {currentData: flat = null} = useGetFlatQuery({flatId}, {skip: !flatId});
    const {currentData: flatUsers = []} = useGetFlatUsersQuery({flatId}, {skip: !flatId});
    const {currentData: flatTasks = []} = useGetFlatTasksQuery({flatId}, {skip: !flatId});
    return useMemo(() => ({flatId, flat, flatUsers, flatTasks}), [flatId, flat, flatUsers, flatTasks]);
}

export const useSelectedFlatId = () => useAppSelector(state => state.flat.selectedFlatId);