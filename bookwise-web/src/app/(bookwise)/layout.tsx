import {Sidebar} from "@/components/sidebar";
import {PanelBook} from "@/components/book/panel";

export default function HomeLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-full gap-0 lg:gap-8">
            <PanelBook/>
            <Sidebar/>
            <main className="flex-1 p-4 lg:p-8">
                {children}
            </main>
        </div>
    );
}
