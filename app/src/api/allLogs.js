import { dateUTCFormat, timeUTCFormat } from "../utils/format";

import axios from "axios";

/**
 * 주어진 페이지네이션을 기반으로 모든 로그 데이터를 GET
 *
 * @param {Object} pagination - 현재 페이지네이션 {listSize: 페이지를 구성하는 데이터 수, range: 페이지 범위, page: range내에 속한 페이지 번호}
 * @param {Object} searchInfo - 검색 조건 {type: 검색 조건, keyword: 검색어}
 * @returns 모든 로그 데이터
 */

export const getAllLogs = async (pagination, searchInfo) => {
  const { listSize, range, page } = pagination;
  const { type, keyword } = searchInfo;

  try {
    // 모든 로그 데이터 Fetch
    let allLogs = await axios.get(
      `${
        process.env.REACT_APP_API_SERVER
      }/api/anomalies/logs?list_size=${listSize}&range=${range}&page=${page}${
        keyword !== "" ? `&type=${type}&keyword=${keyword}` : ""
      }`
    );

    // 날짜 형식 변경
    allLogs.data.rows = allLogs.data.rows.map((logData) => {
      const recordDate = new Date(logData.record_date);

      return {
        ...logData,
        record_date: `${dateUTCFormat(recordDate)} ${timeUTCFormat(
          recordDate
        )}`,
      };
    });
  } catch (e) {
    throw e;
  }
};
