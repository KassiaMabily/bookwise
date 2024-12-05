export function Title({
                          text, icon
                      }: { text: string, icon?: React.ReactNode }) {
    return (
        <div className="flex items-center space-x-4">
            {icon && (icon)}
            <h1 className="text-2xl font-bold">{text}</h1>
        </div>
    )
}

export function Legend({
                           text
                       }: { text: string }) {
    return (
        <p className="text-sm text-gray-400">{text}</p>
    )
}
