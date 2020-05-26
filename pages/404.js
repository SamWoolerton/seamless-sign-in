import Head from "next/head"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { ErrorAlt } from "@styled-icons/boxicons-solid"
import { siteTitle } from "@/components/layout"

export default function page404() {
    return (
        <>
            <Head>
                <title>Page not found | {siteTitle}</title>
            </Head>
            <Navbar />
            <main>
                <div className="container mt-12">
                    <div className="py-6 flex flex-col justify-center text-center">
                        <ErrorAlt className="h-12 w-12 text-red-800 mx-auto my-4" />
                        <h3 className="text-red-800">404 | Page not found</h3>
                        <p className="text-gray-700">
                            Sorry, that page doesn't exist
                        </p>
                        <Link href="/">
                            <a className="button on-dark inline-block mx-auto mt-8">
                                ← Return to the home page
                            </a>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}
