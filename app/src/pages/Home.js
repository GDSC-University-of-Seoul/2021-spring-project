import React, { useEffect, useMemo, useState } from "react";
import { fetchRecentLogs, recentLogsPagination } from "../modules/recentLogs";
import { useDispatch, useSelector } from "react-redux";

import ChartContainer from "../containers/ChartContainer";
import Loading from "../components/Loading";
import LogTableContainer from "../containers/LogTableContainer";
import { fetchData } from "../modules/mapbox";
import { getLoginCookie } from "../modules/login";

/**
 * `/home` 페이지 렌더링
 *
 * @return {JSX.Element} `/home` 페이지를 구성하는 컴포넌트
 */
function Home() {
  const RECENT_LOGS_SIZE = 10;

  const {
    loading: recentLogsLoading,
    pagination,
    recentLogs,
    count,
  } = useSelector((state) => state.recentLogsReducer);

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
    dispatch(fetchData());

    // 최근 로그 데이터 초기화
    const initPagination = {
      listSize: RECENT_LOGS_SIZE,
      range: 1,
      page: 1,
    };
    dispatch(recentLogsPagination(initPagination));
    dispatch(fetchRecentLogs(initPagination));

    // 유저 정보 확인
    dispatch(getLoginCookie());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 이상행동 건수 집계
  useEffect(() => {
    let total = initialAnomalyCnt;

    districts.forEach((district) => {
      let { assualt, fight, swoon, anomaly } = total;
      let { assualt_count, fight_count, swoon_count, anomaly_count } = district;

      total = {
        assualt: assualt + parseInt(assualt_count),
        fight: fight + parseInt(fight_count),
        swoon: swoon + parseInt(swoon_count),
        anomaly: anomaly + parseInt(anomaly_count),
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
          <LogTableContainer
            loading={recentLogsLoading}
            pagination={pagination}
            logsData={recentLogs}
            count={count}
            setPagination={(pagination) =>
              dispatch(fetchRecentLogs(pagination))
            }
            fetchData={(pagination) =>
              dispatch(recentLogsPagination(pagination))
            }
          />
        </div>
      </section>
    </>
  );
}

export default Home;
