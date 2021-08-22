import { dateUTCFormat, timeUTCFormat } from "../utils/format";

import axios from "axios";

const ALL_LOGS_LOADING = "logs/ALL_LOGS_LOADING";
const ALL_LOGS_FETCH = "logs/ALL_LOGS_FETCH";
const ALL_LOGS_ERROR = "logs/ALL_LOGS_ERROR";
const ALL_LOGS_PAGINATION = "logs/ALL_LOGS_PAGINATION";

// 백엔드 API 를 통해 anomaly log 데이터 Fetch
export const fetchAllLogs = (pagination) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOGS_LOADING });

    const { listSize, range, page } = pagination;

    let allLogs = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/anomalies/logs?list_size=${listSize}&range=${range}&page=${page}`
    );

    // 날짜 형식 변경
    allLogs.data.rows = allLogs.data.rows.map((logData) => {
      const recordDate = new Date(logData.record_date);

      return {
        ...allLogs,
        record_date: `${dateUTCFormat(recordDate)} ${timeUTCFormat(
          recordDate
        )}`,
      };
    });

    dispatch({ type: ALL_LOGS_FETCH, payload: allLogs.data });
  } catch (e) {
    dispatch({ type: ALL_LOGS_ERROR, payload: e });
  }
};

// 전체 로그의 현재 페이지네이션 정보 설정
export const allLogsPagination = (pagination) => ({
  type: ALL_LOGS_PAGINATION,
  payload: pagination,
});

const initialState = {
  loading: false,
  pagination: {
    // 현재 페이지네이션 정보
    listSize: 1,
    range: 1,
    page: 1,
  },
  allLogs: [], // 페이지네이션에 대한 전체 로그 데이터
  count: {
    // 전체 페이지네이션 정보
    listCount: 1,
    pageCount: 1,
  },
  error: null,
};

export default function allLogsReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_LOGS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ALL_LOGS_FETCH:
      return {
        ...state,
        loading: false,
        allLogs: action.payload.rows,
        count: action.payload.count,
        error: null,
      };
    case ALL_LOGS_ERROR:
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      };
    case ALL_LOGS_PAGINATION:
      return {
        ...state,
        loading: false,
        pagination: action.payload,
        error: null,
      };
    default:
      return state;
  }
}
