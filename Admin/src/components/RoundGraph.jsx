import React from "react";
import Chart from "react-apexcharts";

import { ResponsiveContainer } from "recharts";
// import useWindowDimensions from "./useWindowDimensions";

function RoundGraph({series, labels}) {
  // console.log(useWindowDimensions().width);

  return (
    <ResponsiveContainer>
          <Chart
      type="donut"
      series={series}
      // width={useWindowDimensions().width / 4}
      // height={useWindowDimensions().width / 4}
      options={{
        labels:labels,
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  fontSize: 15  ,
                  fontFamily: "Poppins",
                  color: "#989898",
                },
              },
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
      }}
    />
    </ResponsiveContainer>

  );
}

export default RoundGraph;
