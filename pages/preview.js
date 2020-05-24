import Head from "next/head"
import Link from "next/link"
import { siteTitle } from "@c/layout"
import PreviewWelcomeScreen from "@c/preview-welcome-screen"

export default () => (
    <div>
        <Head>
            <title>Previewing your welcome page | {siteTitle}</title>
        </Head>
        <div className="relative h-screen">
            <PreviewWelcomeScreen />
        </div>
        <Link href="/customise">
            <a className="absolute left-0 top-0 text-white no-underline cursor-pointer px-4 py-3 bg-white bg-opacity-0 hover:bg-opacity-25 transition-all duration-100">
                ← Return to customise
            </a>
        </Link>
    </div>
)
