import {cn} from "@/lib/utils";

export function Card({children, className}: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("bg-gray-700 rounded-lg p-4", className)}>
            {children}
        </div>
    )
}
