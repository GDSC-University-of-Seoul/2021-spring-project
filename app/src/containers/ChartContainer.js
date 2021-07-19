import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BarChart from "../components/BarChart";
import Loading from "../components/Loading";
import axisName from "../utils/chart/axisName";
import { fetchData } from "../modules/mapbox";

/**
 * 구성할 차트에 맞게 시·도 데이터 가공 및 차트 컴포넌트 구성
 *
 * @param {Object} sido: "시"/"도"
 * @returns {JSX.Element} 시·도 데이터에 기반한 차트 컴포넌트
 */
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

  // 데이터 가공(districts 데이터 활용)
  const filterData = districts.filter((district) => {
    const len = district.district_name.length;
    return district.district_name[len - 1] === sido;
  });

  // 차트 데이터 구성
  const chartData = [];
  filterData.forEach((district) => {
    chartData.push({
      시·도: axisName[district.district_name],
      폭행: parseInt(district.count, 10),
      싸움: parseInt(district.count, 10),
      실신: parseInt(district.count, 10),
    });
  });

  return (
    <BarChart
      data={chartData}
      keys={["폭행", "싸움", "실신"]}
      indexBy="시·도"
    />
  );
}

export default ChartContainer;
