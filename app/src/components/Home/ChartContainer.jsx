import BarChart from "@components/Home/BarChart";
import Loading from "@components/Loading";
import React from "react";
import axisName from "@utils/axisName";
import { useSelector } from "react-redux";

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

  if (loading) return <Loading />;
  if (error) return <div>에러발생!</div>;

  // 데이터 가공(districts 데이터 활용)
  const filterData = districts.filter((district) => {
    const len = district.district_name.length;
    return district.district_name[len - 1] === sido;
  });

  // 차트 데이터 구성
  const chartData = [];
  let maxAnomalyCnt = 0;
  filterData.forEach((district) => {
    const {
      district_name,
      anomaly_count,
      assualt_count,
      fight_count,
      swoon_count,
    } = district;

    maxAnomalyCnt = Math.max(maxAnomalyCnt, anomaly_count ? anomaly_count : 0);
    chartData.push({
      시·도: axisName[district_name],
      폭행: assualt_count ? parseInt(assualt_count, 10) : 0,
      싸움: fight_count ? parseInt(fight_count, 10) : 0,
      실신: swoon_count ? parseInt(swoon_count, 10) : 0,
    });
  });

  return (
    <BarChart
      data={chartData}
      keys={["폭행", "싸움", "실신"]}
      indexBy="시·도"
      maxVal={maxAnomalyCnt}
    />
  );
}

export default ChartContainer;
