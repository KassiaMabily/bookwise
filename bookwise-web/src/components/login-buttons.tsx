'use client'

import {SocialButton} from "@/components/ui/button";
import Link from "next/link";

export function LoginButtons({showVisitorButton = true, redirect}: { showVisitorButton?: boolean, redirect?: string }) {
    const loginWithGitHub = () => {
        const clientID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
        let redirectURI = `${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}`;

        if (redirect) {
            redirectURI = `${redirectURI}?redirect=${redirect}`;
        }
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
    };

    return (
        <div className="flex-col pt-8 space-y-4">
            <div>
                <SocialButton variant="google" disabled/>
            </div>
            <div>
                <SocialButton variant="github" onClick={() => loginWithGitHub()}/>
            </div>
            {
                showVisitorButton && (
                    <div>
                        <Link href={"/home"}>
                            <SocialButton variant="visitor"/>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}