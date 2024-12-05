'use client'
import {useEffect} from 'react';
import api from "@/lib/services/api";
import {useRouter, useSearchParams} from "next/navigation";
import {useAuth} from "@/context/AuthContext";

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const code = searchParams.get('code')
    const redirectURL = searchParams.get('redirect')
    const {login} = useAuth();

    async function githubCallback(code: string) {
        try {
            const response = await api.post<IResponse<{
                key: string,
                user: IUserDetail
            }>>("api/v1/accounts/auth/github/callback/", {code})
            login({...response.data.data})
            if (redirectURL) {
                router.push(redirectURL + `&rate=true`)
            } else {
                router.push(`/home`)
            }
        } catch (error) {
            console.error(error)
            router.push(`/`)
        }
    }

    useEffect(() => {
        if (code) {
            githubCallback(code)
        }
    }, [code]);


    return <div>Processing GitHub login...</div>;
}