import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Quiz App",
    description: "Test pengetahuan umum Anda dengan mengerjakan quiz ini",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="id" className="h-full">
            <body className={`${inter.className} min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600`}>
                {children}
            </body>
        </html>
    )
}
