import Head from "next/head"
import styles from "./layout.module.scss"
import Link from "next/link"

export const siteTitle = "Seamless visitor management"

export default ({ children, home }) => (
    <div className={styles.container}>
        <Head>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className={styles.header}>
            {home ? (
                <>
                    <h1>Home page</h1>
                </>
            ) : (
                <>
                    <h1>Not home page</h1>
                </>
            )}
        </header>
        <main>{children}</main>
        {!home && (
            <div className={styles.backToHome}>
                <Link href="/">
                    <a>← Back to home</a>
                </Link>
            </div>
        )}
    </div>
)
