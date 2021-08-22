import { dateUTCFormat, timeUTCFormat } from "../utils/format";

import axios from "axios";

const RECENT_LOGS_LOADING = "recentLogs/RECENT_LOGS_LOADING";
const RECENT_LOGS_FETCH = "recentLogs/RECENT_LOGS_FETCH";
const RECENT_LOGS_ERROR = "recentLogs/RECENT_LOGS_ERROR";
const RECENT_LOGS_PAGINATION = "recentLogs/RECENT_LOGS_PAGINATION";
const RECENT_LOGS_ALL_FETCH = "recentLogs/RECENT_LOGS_ALL_FETCH";

// 백엔드 API 를 통해 anomaly log 데이터 Fetch
export const fetchRecentLogs = (pagination) => async (dispatch) => {
  try {
    dispatch({ type: RECENT_LOGS_LOADING });

    const { listSize, range, page } = pagination;

    let recentLogs = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/anomalies/logs/recent?list_size=${listSize}&range=${range}&page=${page}`
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

    dispatch({ type: RECENT_LOGS_FETCH, payload: recentLogs.data });
  } catch (e) {
    dispatch({ type: RECENT_LOGS_ERROR, payload: e });
  }
};

// 최근 로그의 현재 페이지네이션 정보 설정
export const recentLogsPagination = (pagination) => ({
  type: RECENT_LOGS_PAGINATION,
  payload: pagination,
});

// 모든 최근 로그 데이터 Fetch
export const recentLogsAllFetch = (pagination) => async (dispatch) => {
  try {
    const { listSize, range, page } = pagination;

    let allRecentLogs = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/anomalies/logs/recent?list_size=${listSize}&range=${range}&page=${page}`
    );

    // 날짜 형식 변경
    allRecentLogs.data.rows = allRecentLogs.data.rows.map((logData) => {
      const recordDate = new Date(logData.record_date);

      return {
        ...logData,
        record_date: `${dateUTCFormat(recordDate)} ${timeUTCFormat(
          recordDate
        )}`,
      };
    });

    dispatch({ type: RECENT_LOGS_ALL_FETCH, payload: allRecentLogs.data.rows });
  } catch (e) {
    dispatch({ type: RECENT_LOGS_ERROR, payload: e });
  }
};

const initialState = {
  loading: false,
  pagination: {
    // 현재 페이지네이션 정보
    listSize: 1,
    range: 1,
    page: 1,
  },
  recentLogs: [], // 페이지네이션에 대한 최근 로그 데이터
  allRecentLogs: [], // 모든 최근 로그 데이터
  count: {
    // 전체 페이지네이션 정보
    listCount: 1,
    pageCount: 1,
  },
  error: null,
};

export default function recentLogsReducer(state = initialState, action) {
  switch (action.type) {
    case RECENT_LOGS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case RECENT_LOGS_FETCH:
      return {
        ...state,
        loading: false,
        recentLogs: action.payload.rows,
        count: action.payload.count,
        error: null,
      };
    case RECENT_LOGS_ERROR:
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      };
    case RECENT_LOGS_PAGINATION:
      return {
        ...state,
        loading: false,
        pagination: action.payload,
        error: null,
      };
    case RECENT_LOGS_ALL_FETCH:
      return {
        ...state,
        loading: false,
        allRecentLogs: action.payload,
        error: null,
      };
    default:
      return state;
  }
}
