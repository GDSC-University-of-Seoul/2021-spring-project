import React, { useEffect, useMemo, useState } from "react";
import { fetchRecentLogs, recentLogsPagination } from "../modules/recentLogs";
import { useDispatch, useSelector } from "react-redux";

import ChartContainer from "../containers/ChartContainer";
import Loading from "../components/Loading";
import LogTableContainer from "../containers/LogTableContainer";
import { fetchData } from "../modules/mapbox";

/**
 * `/` 페이지 렌더링
 *
 * @return {JSX.Element} `/` 페이지를 구성하는 컴포넌트
 */
function Home() {
  const RECENT_LOGS_SIZE = 15;

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

  const initialState = useMemo(
    () => ({
      assualt: 0,
      fight: 0,
      swoon: 0,
      anomaly: 0,
    }),
    []
  );
  const [anomalyCnt, setAnomalyCnt] = useState(initialState);

  useEffect(() => {
    // 헤더부 - 어린이집 이상행동 정보 설정
    dispatch(fetchData()).then(() => {
      const total = initialState;

      for (let district in districts) {
        total.assualt += district.assualt_cnt;
        total.fight += district.fight_cnt;
        total.swoon += district.swoon_cnt;
        total.anomaly += district.anomaly_cnt;
      }
      setAnomalyCnt(total);
    });

    // 최근 로그 데이터 초기화
    const initPagination = {
      listSize: RECENT_LOGS_SIZE,
      range: 1,
      page: 1,
    };
    dispatch(recentLogsPagination(initPagination));
    dispatch(fetchRecentLogs(initPagination));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
