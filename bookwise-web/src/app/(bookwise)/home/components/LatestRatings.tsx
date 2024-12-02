import {RateDescription} from "@/components/book/rate-description"
import {getRatings} from "@/lib/services/rating.service"
import {LatestUserRating} from "@/app/(bookwise)/home/components/LatestUserRating";

const MAX_RATINGS_SHOW = 2

export async function LatestRatings() {
    const response = await getRatings({page: 1, size: MAX_RATINGS_SHOW})

    if (!response?.data.success || (response?.data.data.count <= 0)) {
        return (
            <p>Sem resultados</p>
        )
    }

    return (
        <div className="col-span-2 space-y-4 lg:space-y-8">
            <LatestUserRating/>

            <div className="col-span-2 space-y-4 lg:space-y-8">
                <h3>Avaliações mais recentes</h3>
                <ul className={"space-y-4 md:space-y-6"}>
                    {
                        response.data.data.results.map((item) => (
                            <RateDescription key={item.id} rate={item}/>
                        ))
                    }
                </ul>
            </div>
        </div>

    )
}
