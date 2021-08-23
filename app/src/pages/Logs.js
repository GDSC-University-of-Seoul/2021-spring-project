import React, { useCallback, useEffect, useState } from "react";
import { allLogsPagination, fetchAllLogs } from "../modules/allLogs";
import { dateFormat, timeFormat } from "../utils/format";
import { fetchRecentLogs, recentLogsPagination } from "../modules/recentLogs";
import { useDispatch, useSelector } from "react-redux";

import { BiRefresh } from "react-icons/bi";
import { Button } from "@material-ui/core";
import LogTableContainer from "../containers/LogTableContainer";

/**
 * `/logs` 페이지 렌더링
 *
 * @return {JSX.Element} `/logs` 페이지를 구성하는 컴포넌트
 */
function Logs() {
  const LOGS_SIZE = 10;

  const {
    loading: rLogsLoading,
    pagination: rLogsPagination,
    recentLogs,
    count: rLogsCount,
  } = useSelector((state) => state.recentLogsReducer);

  const {
    loading: aLogsLoading,
    pagination: aLogsPagination,
    allLogs,
    count: aLogsCount,
  } = useSelector((state) => state.allLogsReducer);

  const dispatch = useDispatch();

  const [initial, setInitial] = useState(true);
  const [refreshTimer, setRefreshTimer] = useState({
    currTime: "",
    untilTime: "",
  });

  const ONE_DAY = 24 * 60 * 60 * 1000;

  // 새로고침한 시간 return
  const getTimer = useCallback(() => {
    const getDate = new Date();
    const standardDate = new Date(getDate - ONE_DAY);

    setRefreshTimer({
      currTime: `${dateFormat(standardDate)} ${timeFormat(standardDate)}`,
      untilTime: `${dateFormat(getDate)} ${timeFormat(getDate)}`,
    });
  }, [ONE_DAY]);

  // 로그 데이터 새로고침
  const refreshLogsData = useCallback(() => {
    const initPagination = {
      listSize: LOGS_SIZE,
      range: 1,
      page: 1,
    };

    dispatch(fetchAllLogs(initPagination));
    dispatch(fetchRecentLogs(initPagination));
    getTimer();
  }, [dispatch, getTimer]);

  useEffect(() => {
    const initPagination = {
      listSize: LOGS_SIZE,
      range: 1,
      page: 1,
    };
    dispatch(allLogsPagination(initPagination));
    dispatch(fetchAllLogs(initPagination));
    dispatch(recentLogsPagination(initPagination));
    dispatch(fetchRecentLogs(initPagination));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 페이지 초기화
    if (initial) {
      refreshLogsData();
      setInitial(false);
    }
    // 하루마다 로그 새로고침
    const tick = setInterval(() => {
      refreshLogsData();
    }, ONE_DAY);

    return () => clearInterval(tick);
  }, [ONE_DAY, initial, refreshLogsData]);

  return (
    <>
      <section className="section logs">
        <div className="logs-menu">
          <Button
            data-id="create"
            variant="outlined"
            color="primary"
            startIcon={<BiRefresh />}
            onClick={refreshLogsData}
          >
            새로고침
          </Button>
        </div>
        <div className="container newLogs-section">
          <div className="newLogs section-title">
            최근 사건·사고 발생 로그
            <span className="timer">{` (로그 기준 시간 : ${refreshTimer.currTime} ~ ${refreshTimer.untilTime})`}</span>
          </div>
          <hr />
          <LogTableContainer
            loading={rLogsLoading}
            pagination={rLogsPagination}
            logsData={recentLogs}
            count={rLogsCount}
            setPagination={(pagination) =>
              dispatch(fetchRecentLogs(pagination))
            }
            fetchData={(pagination) =>
              dispatch(recentLogsPagination(pagination))
            }
          />
        </div>
        <div className="container entireLogs-section">
          <div className="allLogs section-title">
            전체 사건·사고 발생 로그
            <span className="timer">{` (로그 기준 시간 : ${refreshTimer.untilTime})`}</span>
          </div>
          <hr />
          <LogTableContainer
            loading={aLogsLoading}
            pagination={aLogsPagination}
            logsData={allLogs}
            count={aLogsCount}
            setPagination={(pagination) =>
              dispatch(allLogsPagination(pagination))
            }
            fetchData={(pagination) => dispatch(fetchAllLogs(pagination))}
          />
        </div>
      </section>
    </>
  );
}
export default Logs;
