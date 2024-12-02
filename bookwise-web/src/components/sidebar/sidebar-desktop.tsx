'use client';

import Image from "next/image";
import logo from "@/assets/logo.svg";
import {Navigation} from "@/components/sidebar/navigation";

export function SidebarDesktop() {

    return (
        <aside
            className="hidden flex-col rounded-xl h-full min-h-full bg-[url('./../assets/background-sidebar.png')] py-8 px-12 space-y-8 lg:flex">
            <div className="flex h-16 shrink-0 items-center">
                <Image src={logo} width={128} height={32} alt="Bookwise logo"/>
            </div>
            <div className="flex-1 flex flex-col justify-between text-lg">
                <Navigation/>
            </div>

        </aside>
    )
}