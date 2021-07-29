import React from "react";
import { ResponsiveBar } from "@nivo/bar";

/**
 * 차트를 생성하기 위한 컴포넌트
 *
 * @param {Object} data: 차트 구성 데이터, keys: 구성할 데이터, indexBy: x축 기준
 * @return {JSX.Element} 차트 컴포넌트
 */

function BarGraph({ data, keys, indexBy, maxVal }) {
  // 차트 내 스타일 설정
  const theme = {
    fontSize: 14,
  };
  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy={indexBy}
      theme={theme}
      margin={{ top: 20, right: 75, bottom: 40, left: 40 }}
      padding={0.3}
      maxValue={maxVal === 0 ? 10 : "auto"}
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
      labelSkipHeight={12}
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
  );
}

export default BarGraph;
