import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BarChart from "../components/BarChart";
import Loading from "../components/Loading";
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
    if (districts.length === 0) dispatch(fetchData());
  }, [districts, dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>에러발생!</div>;

  const filterData = districts.filter((district) => {
    const len = district.district_name.length;
    return district.district_name[len - 1] === sido;
  });

  const chartData = [];
  filterData.forEach((district) => {
    chartData.push({
      시·도: axisName[district.district_name],
      사건: parseInt(district.count, 10) % 100,
      사고: parseInt(district.count, 10) % 10,
    });
  });

  return <BarChart data={chartData} keys={["사건", "사고"]} indexBy="시·도" />;
}

export default ChartContainer;
