// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);



// STEP 3 - Creating the JSON object to store the chart configurations
let colorString = ""

// TAKES FROM SPECIFIC COLOR ARRAY... NOT RANDOM ENOUGH

// function pickColors(){
//   for (let i = 0; i < 4; i++) {
//     let x = Math.floor(Math.random() * colorsArray.length)
//     const element = colorsArray[x];
//     i !== 3? colorString += `${element}, `: colorString += element
//   }
// }
// pickColors()

// COMPLETE RANDOM COLORS... SOMETIMES UGLY

function pickColors(){
  for (let i = 0; i < 4; i++) {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    i !== 3? colorString += `${color}, `: colorString += color
  }
}
pickColors()

const Bar3D = ({data}) => {
  const chartConfigs = {
    type: "bar3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Forks by Repo",
        yAxisName: "Forks",
        xAxisName: "Repos",
        xAxisNameFontSize: "16px",
        yAxisNameFontSize: "16px",
        paletteColors: colorString
      },
      // Chart Data
      data
    }
  };
  return (<ReactFC {...chartConfigs} />);
}

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component

export default Bar3D;