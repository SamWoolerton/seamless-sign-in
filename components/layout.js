import Head from "next/head"
import Link from "next/link"

export const siteTitle = "Seamless visitor management"

export default ({ children, home }) => (
    <>
        <Head>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <nav className="py-4 container mx-auto flex justify-between">
            <div>Seamless</div>
            <div className="flex">
                <div className="px-2">Home</div>
                <div className="px-2">Metrics</div>
                <div className="px-2">Settings</div>
                <div className="px-2">Customise</div>
                <div className="px-2">Preview</div>
            </div>
        </nav>

        <main>{children}</main>
    </>
)
