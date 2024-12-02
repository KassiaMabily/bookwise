import {AxiosResponse} from "axios";
import api from "@/lib/services/api";

export async function getProfile(userId: string): Promise<AxiosResponse<IResponse<IUserDetail>>> {
    return await api.get<IResponse<IUserDetail>>(`/api/v1/accounts/${userId}/`)
}