// import ResponsiveBar from './primitive_charts/bar_chart';
// import ResponsivePieChart from './primitive_charts/pie_chart';
// import ResponsiveLineChart from './primitive_charts/line_chart';
// import BoxChart from "./box_chart";
// import BarChartData from '../data/bar_chart_data.json';
// import LineChartData from '../data/line_chart_data.json';
// import PieChartData from '../data/pie_chart_data.json';

// function three_cols_charts() {
//     return (
//         <div className="columns is-align-items-stretch">
//             <div className="column is-one-third">
//              <BoxChart title={BarChartData.title}
//                 description={BarChartData.description}
//                 primitive_chart={<ResponsiveBar data={BarChartData.data} keys={BarChartData.keys} indexBy={BarChartData.indexBy}/>}/>

//             </div>

//             <div className="column is-one-third">
//              <BoxChart title={PieChartData.title}
//                 description={PieChartData.description}
//                 primitive_chart={<ResponsivePieChart data={PieChartData.data} />}/>
//             </div>

//             <div className="column is-one-third">

//             <BoxChart title={LineChartData.title}
//                 description={LineChartData.description}
//                 primitive_chart={<ResponsiveLineChart data={LineChartData.data} legend={LineChartData.legend}/>}/>


//             </div>
//         </div>
//     );
// }

// export default three_cols_charts;