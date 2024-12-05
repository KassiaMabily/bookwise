'use client'

import {cn} from "@/lib/utils";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function Categories({categories}: { categories: ICategory[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleCategory = (category?: ICategory) => {
        const params = new URLSearchParams(searchParams);
        if (category) {
            params.set('categories', category.id.toString());
        } else {
            params.delete('categories');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const isActiveCategory = (category?: ICategory) => {
        const params = new URLSearchParams(searchParams);
        const param = params.get('categories')
        if (category)
            return param === category.id.toString();

        if (!category && !param)
            return true;
    }


    return (
        <div className={"inline-block space-x-2 space-y-2 items-center justify-center"}>
            <button
                onClick={() => handleCategory()}
                className={cn(
                    "inline-flex items-center gap-x-1.5 rounded-full py-2 px-4 text-sm",
                    isActiveCategory() ? "bg-purple-200 text-white" : "border border-purple-100 text-purple-100"
                )}
            >
                <span>Todos</span>
            </button>

            {
                categories.map((category: ICategory) => (
                    <div key={category.id} className={"inline-flex items-center"}>
                        <button
                            onClick={() => handleCategory(category)}
                            className={cn(
                                " gap-x-1.5 rounded-full py-2 px-4 text-sm",
                                isActiveCategory(category) ? "bg-purple-200 text-white" : "border border-purple-100 text-purple-100"
                            )}
                        >
                            <span>{category.name}</span>
                        </button>
                    </div>
                ))
            }
        </div>
    )
}