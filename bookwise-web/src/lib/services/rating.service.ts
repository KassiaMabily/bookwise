import api from "./api";
import {AxiosResponse} from "axios";

export async function getRatings(params?: {}): Promise<AxiosResponse<IResponsePaginated<IRate>>> {
    return await api.get<IResponsePaginated<IRate>>("/api/v1/ratings/", {params})
}

export async function createRating(data: {
    book_id: string,
    rate: number,
    description: string
}): Promise<AxiosResponse<IResponse<IRate>>> {
    return await api.post<IResponse<IRate>>("/api/v1/ratings/", data)
}
