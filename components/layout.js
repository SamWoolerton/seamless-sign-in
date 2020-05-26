import Head from "next/head"
import Navbar from "@/components/navbar"

export const siteTitle = "Seamless visitor management"

export default function Layout({ children, home }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Navbar />

            <main>{children}</main>

            <footer className="container text-center pt-16 pb-6 text-gray-600">
                A demo project by{" "}
                <a
                    className="no-underline font-semibold text-gray-700 hover:text-blue-800"
                    href="samwoolerton.com"
                >
                    Sam Woolerton
                </a>
                . Check out the source{" "}
                <a
                    className="no-underline font-semibold text-gray-700 hover:text-blue-800"
                    href="https://github.com/SamWoolerton/seamless-sign-in"
                >
                    on Github
                </a>
                .
            </footer>
        </>
    )
}
