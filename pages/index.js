import fetch from "node-fetch"
import useSWR from "swr"
import Head from "next/head"
import Layout, { siteTitle } from "@c/layout"
import Table from "@c/table"
import TimeSeriesChart from "@/components/charts/time-series"
import PlaceholderTable from "@c/placeholders/table"
import ErrorMessage from "@c/errors/pill-with-text"

const asJson = url => fetch(url).then(res => res.json())

export default () => {
    const apiBaseUrl = "/.netlify/functions"

    const { data: entries, error: entriesError } = useSWR(
        `${apiBaseUrl}/entries`,
        asJson,
    )

    const { data: active, error: activeError } = useSWR(
        `${apiBaseUrl}/active`,
        asJson,
    )

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
                                <h3 className="text-gray-700">
                                    Customise the welcome screen
                                </h3>
                                <div>
                                    <div>Set image URL</div>
                                    <input className="bg-gray-200" />
                                    <button onClick={"test"}>Reset</button>
                                </div>
                            </div>
                        </div>

                        <div className="p-2 md:w-1/2 w-full">
                            <div className="card">
                                <h3>Entries by day</h3>
                                {countsProcessed ? (
                                    <TimeSeriesChart data={countsProcessed} />
                                ) : (
                                    <div>Loading entries</div>
                                )}
                            </div>
                        </div>

                        <div className="p-2 md:w-1/2 w-full">
                            <div className="card">
                                <h3 className="text-gray-700">
                                    List of entries
                                </h3>
                                <div className="overflow-x-auto">
                                    {entriesError ? (
                                        <ErrorMessage label="entries" />
                                    ) : !entries ? (
                                        <PlaceholderTable />
                                    ) : (
                                        <Table
                                            data={entries}
                                            columns={Object.keys(
                                                entries[0],
                                            ).map(a => ({
                                                Header: a,
                                                accessor: a,
                                            }))}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-2 md:w-1/2 w-full">
                            <div className="card">
                                <h3 className="text-gray-700">
                                    Visitors who haven't signed out
                                </h3>
                                <div className="overflow-x-auto">
                                    {activeError ? (
                                        <ErrorMessage label="active visitors" />
                                    ) : !active ? (
                                        <PlaceholderTable />
                                    ) : (
                                        <Table
                                            data={active}
                                            columns={Object.keys(active[0]).map(
                                                a => ({
                                                    Header: a,
                                                    accessor: a,
                                                }),
                                            )}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
