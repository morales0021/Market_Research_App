import { ResponsiveBar } from '@nivo/bar'

  const Bar = ({data, keys, indexBy}) => {
    return (
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={{ top: 30, right: 30, bottom: 50, left: 50 }}
        padding={0.4}
        valueScale={{ type: "linear" }}
        colors="#3182CE"
        animate={true}
        enableLabel={false}
        axisBottom={{tickRotation: 45}}
        axisRight={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: keys.join(', '),
          legendPosition: "middle",
          legendOffset: -40
        }}
      />
    );
  };

export default Bar;