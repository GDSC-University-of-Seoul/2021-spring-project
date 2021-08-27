import { dateUTCFormat, timeUTCFormat } from "../utils/format";

import axios from "axios";

/**
 * 주어진 페이지네이션을 기반으로 최근 로그 데이터를 GET (1일 전 ~ 현재까지 로그 데이터)
 *
 * @param {Object} pagination - 현재 페이지네이션 {listSize: 페이지를 구성하는 데이터 수, range: 페이지 범위, page: range내에 속한 페이지 번호}
 * @param {Object} searchInfo - 검색 조건 {type: 검색 조건, keyword: 검색어}
 * @returns 최근 로그 데이터
 */
export const getRecentLogs = async (pagination, searchInfo) => {
  const { listSize, range, page } = pagination;

  try {
    // 최근 로그 데이터 Fetch
    let recentLogs = await axios.get(
      `${
        process.env.REACT_APP_API_SERVER
      }/api/anomalies/logs/recent?list_size=${listSize}&range=${range}&page=${page}${
        searchInfo && searchInfo.keyword !== ""
          ? `&type=${searchInfo.type}&keyword=${searchInfo.keyword}`
          : ""
      }`
    );

    // 날짜 형식 변경
    recentLogs.data.rows = recentLogs.data.rows.map((logData) => {
      const recordDate = new Date(logData.record_date);

      return {
        ...logData,
        record_date: `${dateUTCFormat(recordDate)} ${timeUTCFormat(
          recordDate
        )}`,
      };
    });

    return recentLogs.data;
  } catch (e) {
    throw e;
  }
};

/**
 * 모든 최신 로그 데이터를 GET
 *
 * @returns 모든 최신 로그 데이터
 */
export const getAllRecentLogs = async () => {
  try {
    // 모든 최신 로그의 개수를 파악하기 위한 기본 요청
    const fetchListSize = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/anomalies/logs/recent?list_size=1&range=1&page=1`
    );

    const { count } = fetchListSize.data;

    // 최신 로그가 없는 경우
    if (count.listCount === 0)
      return {
        count,
        rows: [],
      };

    // 모든 최신 로그 Fetch
    return await getRecentLogs({
      listSize: count.listCount,
      range: 1,
      page: 1,
    });
  } catch (e) {
    throw e;
  }
};
