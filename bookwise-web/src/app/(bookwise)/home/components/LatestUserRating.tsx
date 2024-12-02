'use client'

import {useAuth} from "@/context/AuthContext";
import {RateDescription} from "@/components/book/rate-description";
import {getRatings} from "@/lib/services/rating.service";
import {useEffect, useState} from "react";
import {AxiosResponse} from "axios";

export function LatestUserRating() {
    const {isLoggedIn, user} = useAuth()
    const [ratingUserResponse, setRatingUserResponse] = useState<AxiosResponse<IResponsePaginated<IRate>> | null>(null)

    async function fetchUserRatings() {
        try {
            const response = await getRatings({user: user.id})
            setRatingUserResponse(response)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserRatings()
        }
    }, [isLoggedIn])

    if (!isLoggedIn || (isLoggedIn && (ratingUserResponse == null || !ratingUserResponse.data.success) || (ratingUserResponse && ratingUserResponse?.data.data.count <= 0))) return null

    
    if (ratingUserResponse)
        return (
            <div className="col-span-2 space-y-4 lg:space-y-8">
                <div>
                    <h3>Sua última leitura</h3>
                </div>

                <ul className={"space-y-4 md:space-y-6"}>
                    <RateDescription rate={ratingUserResponse?.data.data.results[0]}/>
                </ul>
            </div>

        )
}