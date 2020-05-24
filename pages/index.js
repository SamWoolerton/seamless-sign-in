import useSWR from "swr"
import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "@c/layout"
import TimeSeriesChart from "@c/charts/time-series"
import { apiBaseUrl, asJson } from "@u/ajax"

export default () => {
    const { data: counts, error: countError } = useSWR(
        `${apiBaseUrl}/counts`,
        asJson,
    )

    // split into sub-arrays based on location key
    // transform data to x and y to work with Nivo
    const countsProcessed =
        counts &&
        Object.entries(
            counts.reduce((acc, { date, count, location }) => {
                if (!acc[location]) acc[location] = []
                // first 10 characters gets the date portion before T in datetime string
                acc[location].push({ x: date.substring(0, 10), y: count })
                return acc
            }, {}),
        ).map(([location, data]) => ({ id: location, data }))

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section>
                <div className="py-10">
                    <header className="text-center">
                        <div className="text-4xl text-gray-800 font-light">
                            Seamless sign-in
                        </div>
                        <div className="text-lg uppercase tracking-wide font-semibold text-gray-700 mt-1">
                            Admin portal
                        </div>
                    </header>

                    <div className="flex flex-wrap container mx-auto mt-12">
                        <div className="p-2 md:w-1/2 w-full">
                            <div className="card">
                                <h3>Entries by day</h3>
                                {countsProcessed ? (
                                    <>
                                        <TimeSeriesChart
                                            data={countsProcessed}
                                        />

                                        <div className="flex mt-6">
                                            <Link href="/metrics">
                                                <a className="ml-auto cursor-pointer no-underline hover:font-semibold text-gray-700 hover:text-blue-800">
                                                    See more metrics →
                                                </a>
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <div>Loading entries</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
