import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  allLogsPagination,
  fetchAllLogs,
  searchAllLogs,
} from "../modules/allLogs";
import { dateFormat, timeFormat } from "../utils/format";
import {
  fetchRecentLogs,
  recentLogsPagination,
  searchRecentLogs,
} from "../modules/recentLogs";
import { useDispatch, useSelector } from "react-redux";

import { BiRefresh } from "react-icons/bi";
import { Button } from "@material-ui/core";
import LogTableContainer from "../containers/LogTableContainer";
import SearchBar from "../components/SearchBar";
import { getLoginCookie } from "../modules/login";

/**
 * `/logs` 페이지 렌더링
 *
 * @return {JSX.Element} `/logs` 페이지를 구성하는 컴포넌트
 */
function Logs() {
  const LOGS_SIZE = 10;

  const logSearchCategories = useMemo(
    () => [
      { value: "center_name", text: "어린이집 명", type: "text" },
      {
        value: "anomaly_type",
        text: "의심 유형",
        type: "text",
      },
      {
        value: "record_date",
        text: "발생 시간",
        type: "date",
      },
      {
        value: "address",
        text: "상세주소",
        type: "text",
      },
    ],
    []
  );

  const {
    loading: rLogsLoading,
    pagination: rLogsPagination,
    recentLogs,
    count: rLogsCount,
    searchInfo: rLogsSearchInfo,
  } = useSelector((state) => state.recentLogsReducer);

  const {
    loading: aLogsLoading,
    pagination: aLogsPagination,
    allLogs,
    count: aLogsCount,
    searchInfo: aLogsSearchInfo,
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
    const initSearchInfo = {
      type: logSearchCategories[0].value,
      keyword: "",
    };

    dispatch(fetchAllLogs(initPagination, initSearchInfo));
    dispatch(fetchRecentLogs(initPagination, initSearchInfo));
    getTimer();
  }, [dispatch, getTimer, logSearchCategories]);

  useEffect(() => {
    const initPagination = {
      listSize: LOGS_SIZE,
      range: 1,
      page: 1,
    };
    const initSearchInfo = {
      type: logSearchCategories[0].value,
      keyword: "",
    };
    dispatch(searchAllLogs(initSearchInfo));
    dispatch(allLogsPagination(initPagination));
    dispatch(fetchAllLogs(initPagination, initSearchInfo));

    dispatch(searchRecentLogs(initSearchInfo));
    dispatch(recentLogsPagination(initPagination));
    dispatch(fetchRecentLogs(initPagination, initSearchInfo));

    // 유저 정보 확인
    dispatch(getLoginCookie());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 검색어 변경에 따른 데이터 Fetch
  useEffect(() => {
    const initPagination = {
      listSize: LOGS_SIZE,
      range: 1,
      page: 1,
    };

    dispatch(allLogsPagination(initPagination));
    dispatch(fetchAllLogs(initPagination, aLogsSearchInfo));

    dispatch(recentLogsPagination(initPagination));
    dispatch(fetchRecentLogs(initPagination, rLogsSearchInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aLogsSearchInfo, rLogsSearchInfo]);

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

  // 검색 상태 설정
  const setSearchInfo = useCallback(
    (searchInfo) => {
      dispatch(searchAllLogs(searchInfo));
      dispatch(searchRecentLogs(searchInfo));
    },
    [dispatch]
  );

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
          <SearchBar
            searchCategories={logSearchCategories}
            setSearchInfo={setSearchInfo}
          />
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
            searchInfo={rLogsSearchInfo}
            setPagination={(pagination) =>
              dispatch(recentLogsPagination(pagination))
            }
            fetchData={(pagination, rLogsSearchInfo) =>
              dispatch(fetchRecentLogs(pagination, rLogsSearchInfo))
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
            searchInfo={aLogsSearchInfo}
            setPagination={(pagination) =>
              dispatch(allLogsPagination(pagination))
            }
            fetchData={(pagination, aLogsSearchInfo) =>
              dispatch(fetchAllLogs(pagination, aLogsSearchInfo))
            }
          />
        </div>
      </section>
    </>
  );
}
export default Logs;
