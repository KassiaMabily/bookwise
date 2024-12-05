import {CardBook} from "@/components/book/card"
import {getTrendingBooks} from "@/lib/services/book.service"

export async function TrendingBooks() {
    const response = await getTrendingBooks()
    if (!response.data.success || (response.data.data.count <= 0)) {
        return (
            <p>Sem resultados</p>
        )
    }

    return (
        <section className={"flex flex-col space-y-4"}>
            {
                response.data.data.results.map((item: IBook) => (
                    <CardBook key={item.id} book={item}/>
                ))
            }
        </section>
    )
}
