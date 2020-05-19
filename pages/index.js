import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "../components/layout"

export default () => (
    <Layout home>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <section>
            <p>Let's go Next.js</p>
            <p>Sample website</p>
            <Link href="/">
                <a>Self link</a>
            </Link>
        </section>
    </Layout>
)
