import { ResponsiveLine } from "@nivo/line"

export default ({ data }) => (
    <div style={{ height: "5rem" }}>
        <ResponsiveLine
            data={[{ id: "sparkline", data }]}
            axisLeft={null}
            axisBottom={null}
            colors={{ scheme: "set2" }}
            enableArea={true}
            enablePoints={false}
            enableGridX={false}
            enableGridY={false}
        />
    </div>
)
