import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChartContainer from "../containers/ChartContainer";
import Loading from "../components/Loading";
import LogTableContainer from "../containers/LogTableContainer";
import { fetchData } from "../modules/mapbox";
import { fetchLogsData } from "../modules/logs";

/**
 * `/` 페이지 렌더링
 *
 * @return {JSX.Element} `/home` 페이지를 구성하는 컴포넌트
 */
function Home() {
  const {
    loading,
    data: { newLogsData, recentLogsData },
  } = useSelector((state) => state.logsReducer);

  const {
    loading: mapLoading,
    data: { districts },
  } = useSelector((state) => state.mapboxReducer);

  const dispatch = useDispatch();

  const initialAnomalyCnt = useMemo(
    () => ({
      assualt: 0,
      fight: 0,
      swoon: 0,
      anomaly: 0,
    }),
    []
  );

  const [anomalyCnt, setAnomalyCnt] = useState(initialAnomalyCnt); // 이상행동 건수

  useEffect(() => {
    // 구역 정보 Fetch - 어린이집 이상행동 건수 추출용
    if (districts.length === 0) dispatch(fetchData());

    // 로그 정보 Fetch
    if (recentLogsData.length === 0) dispatch(fetchLogsData());
  }, [dispatch, districts, initialAnomalyCnt, recentLogsData]);

  // 이상행동 건수 집계
  useEffect(() => {
    let total = initialAnomalyCnt;

    districts.forEach((district) => {
      let { assualt, fight, swoon, anomaly } = total;
      let { assualt_count, fight_count, swoon_count, anomaly_count } = district;

      total = {
        assualt: assualt + assualt_count,
        fight: fight + fight_count,
        swoon: swoon + swoon_count,
        anomaly: anomaly + anomaly_count,
      };
    });
    setAnomalyCnt(total);
  }, [districts, initialAnomalyCnt]);

  const HeaderItem = ({ title, children }) => {
    return (
      <div className="header-item">
        <div>{title}</div>
        <div>{children}</div>
      </div>
    );
  };

  return (
    <>
      <section className="section home">
        <div className="container header">
          {mapLoading ? (
            <Loading />
          ) : (
            <>
              <HeaderItem title="총 이상행동 건수">
                {anomalyCnt.anomaly} 건
              </HeaderItem>
              <HeaderItem title="어린이집 폭행건수">
                {anomalyCnt.assualt} 건
              </HeaderItem>
              <HeaderItem title="어린이집 싸움건수">
                {anomalyCnt.fight} 건
              </HeaderItem>
              <HeaderItem title="어린이집 실신건수">
                {anomalyCnt.swoon} 건
              </HeaderItem>
            </>
          )}
        </div>
        <div className="container chart-section">
          <div className="chart-title">
            특별시·광역시 어린이집 사건·사고 발생 건수
          </div>
          <div className="chart">
            <ChartContainer sido={"시"} />
          </div>
        </div>
        <div className="container chart-section">
          <div className="chart-title">도 어린이집 사건·사고 발생 건수</div>
          <div className="chart">
            <ChartContainer sido={"도"} />
          </div>
        </div>
        <div className="container log-section">
          <LogTableContainer loading={loading} logsData={newLogsData} />
        </div>
      </section>
    </>
  );
}

export default Home;
