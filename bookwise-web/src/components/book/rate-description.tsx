'use client'

import {Card} from "../ui/card";
import {Legend} from "../ui/typography";
import {Stars} from "@/components/ui/stars";
import {Avatar} from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

export function RateDescription({rate, showUser = true}: { rate: IRate, showUser?: boolean }) {
    return (
        <Card className={"space-y-4 lg:space-y-8"}>
            <Link href={`/profile/${rate.user.id}`} prefetch={false}>
                <header className="flex">
                    <div className="flex flex-1 space-x-4">
                        <Avatar userPhoto={rate.user.avatar} alt={rate.user.full_name}/>
                        <div>
                            <h1 className="text-accent-foreground font-medium">{rate.user.full_name}</h1>
                            <Legend text="Ontem"/>
                        </div>
                    </div>

                    <Stars value={rate.rate}/>
                </header>
            </Link>


            <div className={"flex space-x-4 lg:space-x-8"}>
                <Image src={rate.book.cover} alt={rate.book.name} width={108} height={152}/>
                <div>
                    <div className={"mb-4"}>
                        <h2 className="text-md font-bold">{rate.book.name}</h2>
                        <Legend text={rate.book.author}/>
                    </div>
                    <p className={"text-gray-300"}>
                        {rate.description}
                    </p>
                </div>
            </div>
        </Card>
    )
}
