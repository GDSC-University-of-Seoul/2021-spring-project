import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DetailLogTableContainer from "../containers/DetailLogTableContainer";
import { fetchLogsData } from "../modules/logs";

/**
 * `/logs` 페이지 렌더링
 *
 * @return {JSX.Element} `/logs` 페이지를 구성하는 컴포넌트
 */
function Logs() {
  const {
    data: { newLogsData, recentLogsData },
  } = useSelector((state) => state.logsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLogsData());
  }, [dispatch]);

  return (
    <>
      <section className="section logs">
        <div className="container newLogs-section">
          <div className="newLogs section-title">신규 사건·사고 발생 로그</div>
          <DetailLogTableContainer logsData={newLogsData} />
        </div>
        <div className="container entireLogs-section">
          <div className="allLogs section-title">전체 사건·사고 발생 로그</div>
          <DetailLogTableContainer logsData={recentLogsData} />
        </div>
      </section>
    </>
  );
}
export default Logs;
