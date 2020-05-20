import fetch from "node-fetch"
import useSWR from "swr"

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

    return (
        <div className="h-screen bg-gray-100 pt-8">
            <div className="text-center text-3xl">Admin UI</div>

            <div className="flex container mx-auto mt-8">
                <div className="card mr-6 mb-4">
                    <h3>Admin config</h3>
                    <div>
                        <div>Set image URL</div>
                        <input className="bg-gray-200" />
                        <button onClick={"test"}>Reset</button>
                    </div>
                </div>

                <div className="card mr-6 mb-4">
                    <h3>List of entries</h3>
                    <div>
                        {entriesError ? (
                            <div>Hit an error loading entries.</div>
                        ) : !entries ? (
                            <div>Loading entries...</div>
                        ) : (
                            entries.map(({ id, name, direction }) => (
                                <div key={id}>
                                    {id} | {name} | {direction}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="card mr-6 mb-4">
                    <h3>Haven't signed out</h3>
                    <div>
                        {activeError ? (
                            <div>Hit an error loading active visitors.</div>
                        ) : !active ? (
                            <div>Loading visitors...</div>
                        ) : (
                            active.map(({ id, name }) => (
                                <div key={id}>
                                    {id} | {name}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
