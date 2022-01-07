import { useMemo } from "react";
import { useAppSelector } from "../store";
import { useGetFlatQuery, useGetFlatUsersQuery } from "./api";

export const useAuth = () => {
    const user = useAppSelector(state => state.auth.user);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    return useMemo(() => ({user, isLoggedIn}), [user, isLoggedIn]);
}

export const useFlat = () => {
    const flatId = useSelectedFlatId();
    const {currentData: flat} = useGetFlatQuery({flatId}, {skip: !flatId});
    const {currentData: flatUsers} = useGetFlatUsersQuery({flatId}, {skip: !flatId});
    return useMemo(() => ({flatId, flat, flatUsers}), [flatId, flat, flatUsers]);
}

export const useSelectedFlatId = () => useAppSelector(state => state.flat.selectedFlatId);