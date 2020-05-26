import Sparkline from "@c/charts/sparkline"

export default function Kpi({ value, label, sparkData }) {
    return (
        <div className="card flex">
            {sparkData && (
                <div className="inline-block w-24 my-auto">
                    <Sparkline data={sparkData} />
                </div>
            )}

            <div className="ml-4">
                <div className="text-5xl text-gray-700 font-bold">{value}</div>
                <div className="text-gray-600 -mt-2 mb-2">{label}</div>
            </div>
        </div>
    )
}
