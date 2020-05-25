import { ResponsiveTreeMap } from "@nivo/treemap"

export default ({ data }) => (
    <ResponsiveTreeMap
        root={data}
        identity="name"
        value="count"
        label="count"
        innerPadding={3}
        outerPadding={4}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors={{ scheme: "pastel2" }}
        labelFormat=".0s"
        labelSkipSize={12}
        animate={true}
        motionStiffness={90}
        motionDamping={11}
    />
)
