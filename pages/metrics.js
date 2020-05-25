import useSWR from "swr"
import Head from "next/head"
import Layout, { siteTitle } from "@c/layout"
import Table from "@c/table"
import TimeSeriesChart from "@c/charts/time-series"
import TreemapChart from "@c/charts/treemap"
import Kpi from "@c/charts/kpi"
import PlaceholderTable from "@c/placeholders/table"
import ErrorMessage from "@c/errors/pill-with-text"
import { apiBaseUrl, asJson } from "@u/ajax"

export default () => {
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

    const { data: shipments, error: shipmentsError } = useSWR(
        `${apiBaseUrl}/shipments`,
        asJson,
    )

    const { data: kpis, error: kpisError } = useSWR(
        `${apiBaseUrl}/kpis`,
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
        <Layout>
            <Head>
                <title>Metrics | {siteTitle}</title>
            </Head>
            <section>
                <div className="py-10">
                    <header className="text-center">
                        <div className="text-4xl text-gray-800 font-light">
                            Key metrics
                        </div>
                    </header>

                    <div className="flex flex-wrap container mx-auto mt-12">
                        {kpisError ? (
                            <div className="p-2 w-full sm:w-auto">
                                <div className="card">
                                    <ErrorMessage label="KPIs" />
                                </div>
                            </div>
                        ) : !kpis ? (
                            <div className="p-2 w-full sm:w-auto">
                                <div className="card">
                                    <div>Loading KPIs</div>
                                </div>
                            </div>
                        ) : (
                            kpis.map(({ value, label, sparkData }) => (
                                <div
                                    className="p-2 w-full sm:w-auto"
                                    key={label}
                                >
                                    <Kpi
                                        value={value}
                                        label={label}
                                        sparkData={sparkData}
                                    />
                                </div>
                            ))
                        )}

                        <div className="w-full px-2 py-4 mt-10 text-gray-600">
                            <h3>Trends</h3>
                            <hr />
                        </div>

                        <div className="p-2 md:w-1/2 w-full">
                            <div className="card">
                                <h3>Entries by day</h3>
                                {countError ? (
                                    <ErrorMessage label="kpis" />
                                ) : !countsProcessed ? (
                                    <div>Loading entries</div>
                                ) : (
                                    <TimeSeriesChart data={countsProcessed} />
                                )}
                            </div>
                        </div>

                        <div className="p-2 md:w-1/2 w-full">
                            <div className="card">
                                <h3>Shipments received this week</h3>
                                {shipmentsError ? (
                                    <ErrorMessage label="shipments received" />
                                ) : !shipments ? (
                                    <div>Loading shipments</div>
                                ) : (
                                    <div className="h-48 mt-4 mb-2">
                                        <TreemapChart data={shipments} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-full px-2 py-4 mt-10 text-gray-600">
                            <h3>In detail</h3>
                            <hr />
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
