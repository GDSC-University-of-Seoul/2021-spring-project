import { getRecentLogs } from "../api/recentLogs";

const RECENT_LOGS_LOADING = "recentLogs/RECENT_LOGS_LOADING";
const RECENT_LOGS_FETCH = "recentLogs/RECENT_LOGS_FETCH";
const RECENT_LOGS_ERROR = "recentLogs/RECENT_LOGS_ERROR";
const RECENT_LOGS_PAGINATION = "recentLogs/RECENT_LOGS_PAGINATION";
const RECENT_LOGS_SEARCH = "recentLogs/RECENT_LOGS_SEARCH";

// 현재 페이지네이션의 최근 로그 데이터 Fetch
export const fetchRecentLogs = (pagination, searchInfo) => async (dispatch) => {
  try {
    dispatch({ type: RECENT_LOGS_LOADING });

    const recentLogs = await getRecentLogs(pagination, searchInfo);

    dispatch({ type: RECENT_LOGS_FETCH, payload: recentLogs });
  } catch (e) {
    dispatch({ type: RECENT_LOGS_ERROR, payload: e });
  }
};

// 최근 로그의 현재 페이지네이션 정보 설정
export const recentLogsPagination = (pagination) => ({
  type: RECENT_LOGS_PAGINATION,
  payload: pagination,
});

// 검색 조건 설정
export const searchRecentLogs = (searchInfo) => ({
  type: RECENT_LOGS_SEARCH,
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
  recentLogs: [], // 페이지네이션에 대한 최근 로그 데이터
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
    case RECENT_LOGS_SEARCH:
      return {
        ...state,
        searchInfo: action.payload,
      };
    default:
      return state;
  }
}
