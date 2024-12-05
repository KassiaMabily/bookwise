'use client';

import {SidebarDesktop} from "@/components/sidebar/sidebar-desktop";
import {useState} from "react";
import {SidebarMobile} from "@/components/sidebar/sidebar-mobile";
import {Menu} from "lucide-react";

export function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className={"relative"}>
            <SidebarDesktop/>
            <SidebarMobile sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            <button className={"absolute top-5 left-4 lg:hidden"} onClick={() => setSidebarOpen(true)}>
                <Menu size={24} color={"#303F73"}/>
            </button>
        </div>
    )
}

