import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/context/AuthContext";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-inter"
});

export const metadata: Metadata = {
    title: "Bookwise",
    description: "Uma rede social de livros para compartilhar avaliações de leitura e muito mais",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} font-sans h-screen dark:bg-gray-800 dark:text-gray-100`}>
        <body className="p-4 h-full min-h-full w-full flex-col flex-1">
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
