import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "@c/layout"
import PreviewWelcomeScreen from "@c/preview-welcome-screen"

export default () => (
    <Layout>
        <Head>
            <title>Customise your welcome page | {siteTitle}</title>
        </Head>
        <div className="container mx-auto flex">
            <div className="relative py-12 w-2/3">
                <PreviewWelcomeScreen />
            </div>
            <div className="w-1/3 bg-gray-700 text-white p-4">
                Controls go here
            </div>
        </div>
        <div className="container mx-auto mt-12 flex justify-center">
            <Link href="/preview">
                <a className="button on-dark">Preview →</a>
            </Link>
        </div>
    </Layout>
)
