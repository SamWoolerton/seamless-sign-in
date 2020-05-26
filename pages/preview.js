import Head from "next/head"
import Link from "next/link"
import { siteTitle } from "@c/layout"
import PreviewWelcomeScreen from "@c/preview-welcome-screen"
import createPersistedState from "use-persisted-state"
const useStored = createPersistedState("admin-customise")

export default function PreviewPage() {
    const [stored] = useStored()

    return (
        <div>
            <Head>
                <title>Previewing your welcome page | {siteTitle}</title>
            </Head>
            <div className="relative h-screen">
                <PreviewWelcomeScreen {...stored} />
            </div>
            <Link href="/customise">
                <a className="absolute left-0 top-0 text-white no-underline cursor-pointer px-4 py-3 bg-white bg-opacity-0 hover:bg-opacity-25 transition-all duration-100">
                    ← Return to customise
                </a>
            </Link>
        </div>
    )
}
