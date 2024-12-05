'use client'

import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {Check, X} from "lucide-react";
import {Card} from "@/components/ui/card";
import Image from "next/image";
import {Legend} from "@/components/ui/typography";
import {Stars, StarsRate} from "@/components/ui/stars";
import {useEffect, useState} from "react";
import api from "@/lib/services/api";
import {Avatar} from "@/components/ui/avatar";
import {formatDistanceToNow} from "date-fns";
import {ptBR} from "date-fns/locale";
import {Textarea} from "@/components/ui/textarea";
import {LoginButtons} from "@/components/login-buttons";
import Modal from "@/components/ui/modal";
import {useAuth} from "@/context/AuthContext";
import {usePathname, useRouter} from "next/navigation";
import {useQueryString} from "@/lib/hooks/useQueryString";
import {createRating} from "@/lib/services/rating.service";

const KEY_BOOK = 'view'
const KEY_RATE = 'rate'

export function PanelBook() {
    const pathname = usePathname()
    const router = useRouter()
    const {createQueryString, removeQueryString, getSearchQueryString} = useQueryString()
    const bookId = getSearchQueryString(KEY_BOOK)
    const rate = getSearchQueryString(KEY_RATE)

    //region State
    const hasSelectedBook = bookId !== null
    const showRate = rate !== null
    const {isLoggedIn, user} = useAuth()
    const [showLogin, setShowLogin] = useState(false)
    const [redirectTo, setRedirectTo] = useState<string | undefined>()
    const [book, setBook] = useState<BookDetail | null>(null)
    const [rating, setRating] = useState(0)
    const [textValue, setTextValue] = useState("");
    //endregion

    //region Rate
    async function handleSubmitRate() {
        if (bookId) {
            try {
                await createRating({book_id: bookId, rate: rating, description: textValue})
                await fetchBook()
                handleCloseRate()
            } catch (e) {
                handleCloseRate()
            }
        }
    }

    function handleCloseRate() {
        setTextValue("")
        setRating(0)
        router.push(pathname + '?' + removeQueryString([KEY_RATE]))
    }

    function handleOpenRate() {
        const redirectTo = pathname + '?' + createQueryString(KEY_RATE, 'true')

        if (!isLoggedIn) {
            setRedirectTo(redirectTo)
            setShowLogin(true)
        } else {
            router.push(redirectTo)
        }
    }

    function handleClosePanelBook() {
        router.push(pathname + '?' + removeQueryString([KEY_BOOK, KEY_RATE]))
    }

    //endregion

    async function fetchBook() {
        try {
            const response = await api.get(`/api/v1/books/${bookId}`)
            setBook(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (hasSelectedBook) {
            fetchBook()
        }
    }, [bookId]);

    if (book === null) {
        return null
    }

    return (
        <Dialog open={hasSelectedBook} onClose={handleClosePanelBook} className="relative z-10">
            <Modal open={showLogin} setOpen={setShowLogin}>
                <h2 className="leading-6">Faça login para deixar sua avaliação</h2>
                <LoginButtons showVisitorButton={false} redirect={redirectTo}/>
            </Modal>

            <DialogBackdrop
                transition
                className="fixed inset-0 bg-[#000]/60 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full lg:pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen min-w-full lg:max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll w-full bg-gray-800 py-6 shadow-xl">
                                <div className="px-4 sm:px-6">
                                    <div className="flex items-start justify-end">
                                        <DialogTitle
                                            className="sr-only text-base font-semibold text-gray-900">{book.name}</DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={handleClosePanelBook}
                                                className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                <span className="absolute -inset-2.5"/>
                                                <span className="sr-only">Close panel</span>
                                                <X aria-hidden="true" className="size-6"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative space-y-6 mt-6 flex-1 px-4 sm:px-6">
                                    <Card className={"flex gap-4 lg:gap-8"}>
                                        <div className={"flex gap-4 lg:gap-8"}>
                                            <Image className={"rounded-lg w-auto h-full"} src={book.cover} width={100}
                                                   height={192} alt={book.name}/>

                                            <header className={"flex flex-col justify-between"}>
                                                <div>
                                                    <h2 className="text-md font-bold">{book.name}</h2>
                                                    <Legend text={book.author}/>
                                                </div>

                                                <div className={"flex flex-col space-y-2"}>
                                                    <Stars value={book.average_rating}/>
                                                    <Legend
                                                        text={`${book.ratings.length} ${book.ratings.length === 1 ? "avaliação" : "avaliações"}`}/>
                                                </div>
                                            </header>
                                        </div>
                                    </Card>

                                    <div className={"flex justify-between pt-6"}>
                                        <h2 className={"text-gray-200"}>Avaliações</h2>
                                        <button className={"text-purple-100 hover:cursor-pointer"}
                                                onClick={() => handleOpenRate()}>Avaliar
                                        </button>
                                    </div>

                                    <ul className={"flex flex-col space-y-4"}>
                                        {
                                            (showRate && isLoggedIn) && (
                                                <li>
                                                    <Card className={"flex flex-col space-y-4"}>
                                                        <header className={"flex justify-between"}>
                                                            <div className={"flex items-center space-x-2"}>
                                                                <Avatar userPhoto={user.user.avatar}
                                                                        alt={user.user.full_name}/>
                                                                <h3 className={"font-bold"}>{user.user.full_name}</h3>
                                                            </div>

                                                            <StarsRate onClick={(value) => setRating(value)}/>
                                                        </header>

                                                        <div>
                                                            <Textarea placeholder={"Escreva sua avaliação"} rows={4}
                                                                      value={textValue} maxLength={450}
                                                                      onChange={(e) => setTextValue(e.target.value)}/>
                                                            <div
                                                                className={" flex items-center justify-end space-x-2"}>
                                                                <button
                                                                    className={"rounded bg-gray-600 text-purple-100 transition-colors delay-100 duration-75 p-2 hover:bg-opacity-70"}
                                                                    onClick={handleCloseRate}
                                                                >
                                                                    <X size={24}/>
                                                                </button>
                                                                <button
                                                                    className={"rounded bg-gray-600 text-green-100 p-2 transition-colors delay-100 duration-75 p-2 hover:bg-opacity-70"}
                                                                    onClick={handleSubmitRate}
                                                                >
                                                                    <Check size={24}/>
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </Card>
                                                </li>
                                            )
                                        }
                                        {
                                            book.ratings.length > 0 ? book.ratings.map((rating: IRate) => (
                                                <li key={rating.id}>
                                                    <Card className={"flex flex-col space-y-4"}>
                                                        <header className={"flex justify-between"}>
                                                            <div className={"flex space-x-2"}>
                                                                <Avatar userPhoto={rating.user.avatar}
                                                                        alt={rating.user.username}/>
                                                                <div>
                                                                    <h3>{rating.user.full_name}</h3>
                                                                    <Legend
                                                                        text={formatDistanceToNow(rating.created_at, {locale: ptBR})}/>
                                                                </div>
                                                            </div>

                                                            <Stars value={rating.rate}/>
                                                        </header>

                                                        <p className={"text-gray-300"}>
                                                            {rating.description}
                                                        </p>
                                                    </Card>
                                                </li>
                                            )) : (
                                                <p className={"text-gray-400"}>
                                                    Nenhuma avaliação
                                                </p>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}