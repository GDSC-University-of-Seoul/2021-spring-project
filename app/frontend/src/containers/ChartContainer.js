import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BarChart from "../components/BarChart";
import axisName from "../utils/chart/axisName";
import { fetchData } from "../modules/mapbox";

function ChartContainer({ sido }) {
  const {
    loading,
    data: { districts },
    error,
  } = useSelector((state) => state.mapboxReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <div className="chart">로딩중</div>;
  if (error) return <div className="chart">에러발생!</div>;

  const filterData = districts.filter((district) => {
    const len = district.district_name.length;
    return district.district_name[len - 1] === sido;
  });

  const chartData = [];
  filterData.forEach((district) => {
    chartData.push({
      시·도: axisName[district.district_name],
      개수: parseInt(district.count, 10),
    });
  });

  return <BarChart data={chartData} keys={["개수"]} indexBy="시·도" />;
}

export default ChartContainer;
