'use client';

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {SearchIcon} from "lucide-react";
import {useDebouncedCallback} from "use-debounce";

export function InputSearch({placeholder}: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);

        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className={"w-full relative"}>
            <input
                defaultValue={searchParams.get('query')?.toString()}
                placeholder={placeholder}
                type="text"
                className="w-full pl-8 pr-10 py-2 border border-gray-500 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-green-200"
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
            <div className="absolute inset-y-0 right-3 pl-0 flex items-center pointer-events-none">
                <SearchIcon color={"#303F73"} size={24}/>
            </div>
        </div>
    )
}