import Head from "next/head"
import Layout, { siteTitle } from "@c/layout"
import Router from "next/router"
import { useEffect } from "react"

export default function HomePage() {
    useEffect(() => {
        if (Router.pathname === "/") {
            Router.push("/metrics")
        }
    })

    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className="container mx-auto py-32">
                <h3 className="text-gray-600 text-center">Loading...</h3>
            </div>
        </Layout>
    )
}
