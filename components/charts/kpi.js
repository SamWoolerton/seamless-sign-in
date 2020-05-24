import Sparkline from "@c/charts/sparkline"

export default ({ value, label, sparkData }) => (
    <div className="card flex">
        {sparkData && (
            <div className="inline-block w-24 my-auto">
                <Sparkline
                    data={[
                        { x: 1, y: 1 },
                        { x: 2, y: 3 },
                        { x: 3, y: 4 },
                        { x: 4, y: 5 },
                        { x: 5, y: 3 },
                    ]}
                />
            </div>
        )}

        <div className="ml-4">
            <div className="text-5xl text-gray-700 font-bold">{value}</div>
            <div className="text-gray-600 -mt-2 mb-2">{label}</div>
        </div>
    </div>
)
