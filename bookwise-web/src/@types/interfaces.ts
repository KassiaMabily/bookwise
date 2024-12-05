type IPaginatedData<TData> = {
    count: number
    next: null
    previous: null
    results: TData[]
}

type IResponse<TData> = {
    success: boolean
    error?: any
    message?: string
    data: TData
}

type IResponsePaginated<TData> = {
    success: boolean
    error?: any
    message?: string
    data: IPaginatedData<TData>
}

interface ICategory {
    id: string
    name: string
}

interface IBook {
    id: string
    average_rating: number
    name: string
    author: string
    slug: string
    summary: string
    total_pages: number
    cover: string
    created_at: string
    categories: ICategory[]
}

interface IUserDetail {
    id: string,
    full_name: string,
    avatar: string,
    date_joined: string,
    stats: {
        total_pages: number,
        total_books: number,
        total_authors: number,
        trending_category: string
    }
}

interface IUser {
    id: string,
    username: string,
    email: string,
    avatar: string,
    full_name: string
}

interface IRate {
    id: string
    book: IBook;
    user: IUser;
    rate: number;
    description: string;
    created_at: string;
}

interface BookDetail extends IBook {
    ratings: IRate[],
}
