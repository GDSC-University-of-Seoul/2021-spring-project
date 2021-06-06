import React from "react";
import { ResponsiveBar } from "@nivo/bar";

function BarGraph({ data, keys, indexBy }) {
  const theme = {
    fontSize: 14,
  };
  return (
    <div className="chart">
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        theme={theme}
        margin={{ top: 20, right: 65, bottom: 40, left: 55 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        labelSkipWidth={12}
        legends={[
          {
            dataFrom: "keys",
            anchor: "top-right",
            direction: "column",
            justify: false,
            translateX: 110,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
          },
        ]}
        animate={false}
      />
    </div>
  );
}

export default BarGraph;
