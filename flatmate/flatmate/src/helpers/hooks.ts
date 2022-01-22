import { useEffect, useRef } from "react";

export const useTimeout = (callback: () => void, delay: number) => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const handle = setTimeout(callback, delay);
        return () => clearTimeout(handle);
    }, []);
}