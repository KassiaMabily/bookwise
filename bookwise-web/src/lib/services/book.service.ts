import api from "./api";
import {AxiosResponse} from "axios";

export async function getTrendingBooks(): Promise<AxiosResponse<IResponsePaginated<IBook>>> {
    return await api.get<IResponsePaginated<IBook>>("/api/v1/books/trending/")
}

export async function searchBooks(params?: {}): Promise<AxiosResponse<IResponsePaginated<IBook>>> {
    return await api.get<IResponsePaginated<IBook>>("/api/v1/books/", {params})
}

export async function getCategories(): Promise<AxiosResponse<IResponsePaginated<ICategory>>> {
    return await api.get<IResponsePaginated<ICategory>>("/api/v1/books/categories/")
}