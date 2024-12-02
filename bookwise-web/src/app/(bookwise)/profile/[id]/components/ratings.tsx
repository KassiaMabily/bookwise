'use client'

import {formatDistanceToNow} from "date-fns";
import {ptBR} from "date-fns/locale";
import {Legend} from "@/components/ui/typography";
import {RateDescription} from "@/components/book/rate-description";
import {useEffect, useState} from "react";
import {getRatings} from "@/lib/services/rating.service";

export function UserRatings({userId, initialRatings, query}: {
    userId: string,
    initialRatings: IPaginatedData<IRate>,
    query: string;
}) {
    const [page, setPage] = useState(1)
    const [ratings, setRatings] = useState<IRate[]>(initialRatings.results)

    const fetchRatings = async (p: number) => {
        setPage(p)
        const response = await getRatings({user: userId, size: 1, page: p, search: query});
        setRatings(ratings => [...ratings, ...response.data.data.results])
    }

    const loadMoreRatings = async () => {
        const p = page + 1
        await fetchRatings(p)
    }

    useEffect(() => {
        if (query)
            fetchRatings(1)
    }, [query])

    return (
        <div className={"flex flex-col space-y-3"}>

            <ul className={"space-y-6"}>
                {ratings.map((rating) => (
                    <li key={rating.id} className={"space-y-2"}>
                        <Legend text={formatDistanceToNow(rating.created_at, {locale: ptBR, addSuffix: true})}/>
                        <RateDescription rate={rating} showUser={false}/>
                    </li>
                ))}
            </ul>

            {
                (initialRatings.count > ratings.length) && (
                    <button onClick={loadMoreRatings} className={"self-center px-4 py-2 rounded bg-green-200 h-10"}>
                        Carregar mais
                    </button>
                )
            }

        </div>
    )
}