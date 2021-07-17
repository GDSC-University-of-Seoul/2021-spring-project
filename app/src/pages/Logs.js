import React, { useCallback, useEffect, useState } from "react";
import { dateFormat, timeFormat } from "../utils/format/format";
import { useDispatch, useSelector } from "react-redux";

import { BiRefresh } from "react-icons/bi";
import { Button } from "@material-ui/core";
import LogTableContainer from "../containers/LogTableContainer";
import { fetchLogsData } from "../modules/logs";

/**
 * `/logs` 페이지 렌더링
 *
 * @return {JSX.Element} `/logs` 페이지를 구성하는 컴포넌트
 */
function Logs() {
  const {
    loading,
    data: { newLogsData, recentLogsData },
  } = useSelector((state) => state.logsReducer);
  const dispatch = useDispatch();

  const [initial, setInitial] = useState(true);
  const [refreshTimer, setRefreshTimer] = useState("");

  // 새로고침한 시간 return
  const getTimer = useCallback(() => {
    const getDate = new Date();

    return `${dateFormat(getDate)} ${timeFormat(getDate)}`;
  }, []);

  // 로그 데이터 새로고침
  const refreshLogsData = useCallback(() => {
    dispatch(fetchLogsData());
    setRefreshTimer(getTimer());
  }, [dispatch, setRefreshTimer, getTimer]);

  useEffect(() => {
    // 페이지 초기화
    if (initial) {
      refreshLogsData();
      setInitial(false);
    }
    // 1시간마다 로그 새로고침
    const tick = setInterval(() => {
      refreshLogsData();
    }, 3600000);

    return () => clearInterval(tick);
  }, [initial, refreshLogsData]);

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
            <span className="timer">{` (로그 기준 시간 : ${refreshTimer})`}</span>
          </div>
          <hr />
          <LogTableContainer loading={loading} logsData={newLogsData} />
        </div>
        <div className="container entireLogs-section">
          <div className="allLogs section-title">
            전체 사건·사고 발생 로그
            <span className="timer">{` (로그 기준 시간 : ${
              refreshTimer || ""
            })`}</span>
          </div>
          <hr />
          <LogTableContainer loading={loading} logsData={recentLogsData} />
        </div>
      </section>
    </>
  );
}
export default Logs;
