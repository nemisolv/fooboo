import { useEffect, useState } from "react";

export default function useDebounce(value, delay =500) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);

        }, delay);
        return () => {
            clearTimeout(handler);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debouncedValue;
}