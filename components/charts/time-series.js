import { ResponsiveLine } from "@nivo/line"

export default ({ data }) => (
    <div style={{ height: 350 }}>
        <ResponsiveLine
            data={data}
            margin={{ top: 40, right: 0, bottom: 25, left: 25 }}
            xScale={{
                type: "time",
                format: "%Y-%m-%d",
            }}
            xFormat="time:%Y-%m-%d"
            yScale={{
                type: "linear",
                min: 0,
                max: "auto",
                stacked: true,
            }}
            axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            axisBottom={{
                format: "%b %d",
                tickValues: 5,
            }}
            colors={{ scheme: "set1" }}
            enableArea={true}
            enablePoints={false}
            enableSlices="x"
            sliceTooltip={({ slice }) => (
                <div
                    className="shadow-lg"
                    style={{
                        background: "white",
                        padding: "9px 12px",
                    }}
                >
                    <strong>{slice.points[0].data.xFormatted}</strong>
                    {slice.points.map(point => (
                        <div key={point.id}>
                            <span
                                className="font-bold py-1"
                                style={{
                                    color: point.serieColor,
                                }}
                            >
                                {point.serieId}:{" "}
                            </span>
                            {point.data.yFormatted}
                        </div>
                    ))}
                </div>
            )}
            legends={[
                {
                    anchor: "top-left",
                    direction: "row",
                    translateX: -5,
                    translateY: -30,
                    itemsSpacing: 10,
                    itemWidth: 80,
                    itemHeight: 20,
                    symbolSize: 12,
                    symbolShape: "circle",
                },
            ]}
            useMesh={true}
        />
    </div>
)
