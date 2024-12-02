import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";

export function NavItem({name, href, icon}: {
    name: string,
    href: string,
    icon: React.ReactNode
}): React.ReactNode {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} className={cn("flex items-center relative", isActive ? "text-white" : "text-gray-400")}>
            <span
                className={cn(isActive ? "absolute -left-4 h-4/5 w-1 mr-2 bg-gradient-to-b from-[#7FD1CC] to-[#9694F5] rounded-lg" : "hidden")}>
                &nbsp;
            </span>
            <div className={"flex space-x-2 items-center"}>
                {icon}
                <span>{name}</span>
            </div>
        </Link>
    )
}
