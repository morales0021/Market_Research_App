import { ResponsivePie } from '@nivo/pie'

const Pie = ({data}) => {
    return (
      <ResponsivePie
        data={data}
        margin={{ top: 30, right: 30, bottom: 50, left: 30 }}
        innerRadius={0.5}
        outerRadius={1.8} 
        padAngle={0.0}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        enableArcLabels={true}
        enableArcLinkLabels={false}        
        />
    );
  };

export default Pie;