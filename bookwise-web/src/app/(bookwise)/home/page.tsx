import {Title} from "@/components/ui/typography";
import {ChartLine, ChevronRight} from "lucide-react";
import {Suspense} from "react";
import {TrendingBooks} from "./components/TrendingBooks";
import {LatestRatings} from "@/app/(bookwise)/home/components/LatestRatings";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className={"space-y-4 lg:space-y-8"}>
            <div className={"pl-10 lg:pl-0"}>
                <Title text="Início" icon={<ChartLine className={"text-green-100 "} size={32}/>}/>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">

                <Suspense fallback={<p>Carregando...</p>}>
                    <LatestRatings/>
                </Suspense>

                <div className="col-span-1 space-y-4 lg:space-y-8">
                    <div className={"flex items-center justify-between"}>
                        <h3>Livros populares</h3>
                        <Link href={"/explore"} className={"flex items-center space-x-2 text-purple-100"}>
                            <span>Ver todos</span>
                            <ChevronRight/>
                        </Link>
                    </div>

                    <Suspense fallback={<p>Carregando...</p>}>
                        <TrendingBooks/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
