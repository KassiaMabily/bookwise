'use client'
import {CardBook} from "@/components/book/card";
import {useEffect, useState} from "react";
import {searchBooks} from "@/lib/services/book.service";
import {useSearchParams} from "next/navigation";

const SIZE = 12

export function BookList({initialResponse}: { initialResponse: IPaginatedData<IBook> }) {
    const searchParams = useSearchParams()
    const [page, setPage] = useState(1)
    const [hasNextPage, setHasNextPage] = useState(initialResponse.next != null)
    const [books, setBooks] = useState<IBook[]>([])
    const [searchCategory, setSearchCategory] = useState<string | null>(null)
    const [search, setSearch] = useState<string | null>(null)

    const fetchBooks = async () => {
        if (page === 1 && !searchCategory && !search) {
            setBooks(initialResponse.results)
            return
        }

        let filter: { [key: string]: string | number } = {"size": SIZE, "page": page}
        if (searchCategory)
            filter["categories"] = searchCategory
        if (search)
            filter["search"] = search

        const response = await searchBooks(filter);
        setHasNextPage(response.data.data.next != null)

        if (page == 1) {
            setBooks(response.data.data.results)
        } else {
            if (!books.some(book => response.data.data.results.some(newBook => newBook.id === book.id))) {
                setBooks(books => [...books, ...response.data.data.results])
            }
        }
    }

    const loadMoreBooks = async () => {
        setPage(p => p + 1)
    }

    useEffect(() => {
        setPage(1)
        setSearchCategory(searchParams.get('categories') || null)
        setSearch(searchParams.get('query') || null)
    }, [searchParams]);

    useEffect(() => {
        fetchBooks()
    }, [searchCategory, search, page])

    return (
        <div className={"flex flex-col space-y-5 min-h-full"}>
            <ul className={"grid gap-5 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4"}>
                {
                    books.map((book: IBook) => (
                        <div key={book.id}>
                            <CardBook book={book}/>
                        </div>
                    ))
                }
            </ul>

            {
                hasNextPage && (
                    <button onClick={loadMoreBooks} className={"self-center px-4 py-2 rounded bg-green-200 h-10"}>
                        Carregar mais
                    </button>
                )

            }
        </div>
    )
}