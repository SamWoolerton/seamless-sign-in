import Head from "next/head"
import Navbar from "@/components/navbar"

export const siteTitle = "Seamless visitor management"

export default ({ children, home }) => (
    <>
        <Head>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <main>{children}</main>
    </>
)
