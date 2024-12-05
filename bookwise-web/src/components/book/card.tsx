'use client'

import Image from "next/image";
import {Card} from "../ui/card";
import {Stars} from "@/components/ui/stars";
import {Legend} from "@/components/ui/typography";
import {usePathname} from "next/navigation";
import {useQueryString} from "@/lib/hooks/useQueryString";
import Link from "next/link";

export function CardBook({book}: { book: IBook }) {
    const pathname = usePathname()
    const {createQueryString} = useQueryString();


    return (
        <Link href={pathname + '?' + createQueryString('view', book.id)}>
            <Card
                className={"flex gap-4 lg:gap-8 transition ease-in-out delay-100 duration-150 hover:cursor-pointer hover:scale-105"}
            >
                <Image className={"rounded-lg w-auto h-full"} src={book.cover} width={100} height={192}
                       alt={book.name}/>


                <header className={"flex flex-col justify-between"}>
                    <div className={"mb-4"}>
                        <h2 className="text-md font-bold">{book.name}</h2>
                        <Legend text={book.author}/>
                    </div>

                    <Stars value={book.average_rating}/>
                </header>


            </Card>
        </Link>

    )
}
