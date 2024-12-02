import {useCallback} from 'react';
import {useSearchParams} from 'next/navigation';

export function useQueryString() {
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const clearQueryString = useCallback(() => {
        const params = new URLSearchParams();
        return params.toString();
    }, []);

    const removeQueryString = useCallback(
        (names: string[]) => {
            const params = new URLSearchParams(searchParams.toString());
            names.forEach(name => params.delete(name));

            return params.toString();
        },
        [searchParams]
    );

    const getSearchQueryString = (name: string) => {
        return searchParams.get(name)
    }

    return {createQueryString, clearQueryString, removeQueryString, getSearchQueryString};
}