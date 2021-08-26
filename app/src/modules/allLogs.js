import { getAllLogs } from "../api/allLogs";

const ALL_LOGS_LOADING = "logs/ALL_LOGS_LOADING";
const ALL_LOGS_FETCH = "logs/ALL_LOGS_FETCH";
const ALL_LOGS_ERROR = "logs/ALL_LOGS_ERROR";
const ALL_LOGS_PAGINATION = "logs/ALL_LOGS_PAGINATION";
const ALL_LOGS_SEARCH = "logs/ALL_LOGS_SEARCH";

// 현재 페이지네이션의 모든 로그 데이터 Fetch
export const fetchAllLogs = (pagination, searchInfo) => async (dispatch) => {
  try {
    dispatch({ type: ALL_LOGS_LOADING });

    const allLogs = getAllLogs(pagination, searchInfo);

    dispatch({ type: ALL_LOGS_FETCH, payload: allLogs });
  } catch (e) {
    dispatch({ type: ALL_LOGS_ERROR, payload: e });
  }
};

// 전체 로그의 현재 페이지네이션 정보 설정
export const allLogsPagination = (pagination) => ({
  type: ALL_LOGS_PAGINATION,
  payload: pagination,
});

// 검색 조건 설정
export const searchAllLogs = (searchInfo) => ({
  type: ALL_LOGS_SEARCH,
  payload: searchInfo,
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
  searchInfo: {
    // 검색 조건
    type: "",
    keyword: "",
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
    case ALL_LOGS_SEARCH:
      return {
        ...state,
        searchInfo: action.payload,
      };
    default:
      return state;
  }
}
