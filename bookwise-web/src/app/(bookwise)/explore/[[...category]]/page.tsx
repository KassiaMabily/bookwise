import {Title} from "@/components/ui/typography";
import {Telescope} from "lucide-react";
import Categories from "@/app/(bookwise)/explore/components/categories";
import {BookList} from "@/app/(bookwise)/explore/components/book-list";
import {getCategories, searchBooks} from "@/lib/services/book.service";
import {InputSearch} from "@/components/input-search";

export default async function ExplorePage(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const response = await getCategories()
    const responseBooks = await searchBooks()

    if (!responseBooks.data.success) {
        return null
    }

    return (
        <div className={"space-y-4 lg:space-y-8"}>
            <header className={"flex items-center justify-between pl-10 lg:pl-0"}>
                <Title text="Explorar" icon={<Telescope color={"#50B2C0"} size={32}/>}/>
                <div className={"hidden lg:block"}>
                    <InputSearch placeholder={"Buscar livro ou autor"}/>
                </div>
            </header>

            <section className={"space-y-4 lg:space-y-8"}>
                <Categories categories={response.data.data.results}/>

                <div className={"block lg:hidden"}>
                    <InputSearch placeholder={"Buscar livro ou autor"}/>
                </div>

                <BookList initialResponse={responseBooks.data.data}/>
            </section>
        </div>
    )
}
