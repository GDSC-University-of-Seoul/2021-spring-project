import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BarChart from "../components/BarChart";
import { fetchData } from "../modules/mapbox";

function ChartContainer() {
  const {
    loading,
    data: { districts },
    error,
  } = useSelector((state) => state.mapboxReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <div>로딩중</div>;
  if (error) return <div>에러발생!</div>;

  const chartData = [];

  districts.forEach((district) => {
    chartData.push({
      sido: district.district_name,
      count: parseInt(district.count, 10),
    });
  });

  return (
    <BarChart
      data={chartData}
      keys={["count"]}
      indexBy="sido"
      bottomLegend="도·광역시"
      leftLegend="어린이집 개수"
    />
  );
}

export default ChartContainer;
