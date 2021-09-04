// 어린이집 검색 모달창 상태 관리

import { getCenter, getSggCenters } from "../api/centers";
import { getSggData, getSidoData } from "../api/districts";

const OPEN_MODAL = "searchCenterModal/OPEN_MODAL";
const CLOSE_MODAL = "searchCenterModal/CLOSE_MODAL";
const INIT_MODAL = "searchCenterModal/INIT_MODAL";
const SEARCH_CENTER_LOADING = "searchCenterModal/SEARCH_CENTER_LOADING";
const FETCH_SIDO = "searchCenterModal/FETCH_SIDO";
const FETCH_SGG = "searchCenterModal/FETCH_SGG";
const FETCH_CENTER = "searchCenterModal/FETCH_CENTER";
const SELECTED_CENTER = "searchCenterModal/SELECTED_CENTER";
const SEARCH_CENTER_ERROR = "searchCenterModal/SEARCH_CENTER_ERROR";

// 모달창 열기
export const openSearchModal = () => ({ type: OPEN_MODAL });

// 모달창 닫기
export const closeSearchModal = () => ({ type: CLOSE_MODAL });

// 어린이집 검색정보 제출 후 기존 정보 초기화
export const initSearchModal = () => ({ type: INIT_MODAL });

// 도·특별시·광역시 정보 Fetch
export const fetchSido = () => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_CENTER_LOADING });

    const sido = await getSidoData();
    dispatch({ type: FETCH_SIDO, payload: sido });
  } catch (e) {
    dispatch({ type: SEARCH_CENTER_ERROR, payload: e });
  }
};

// 선택한 도·특별시·광역시 기준으로 시·군·구 정보 Fetch
export const fetchSgg = (sidoCode) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_CENTER_LOADING });

    const sgg = await getSggData(sidoCode);
    dispatch({ type: FETCH_SGG, payload: sgg });
  } catch (e) {
    dispatch({ type: SEARCH_CENTER_ERROR, payload: e });
  }
};

// 선택한 시·군·구 기준으로 어린이집 정보 Fetch
export const fetchCenter = (sggCode) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_CENTER_LOADING });

    const centers = await getSggCenters(sggCode);
    dispatch({ type: FETCH_CENTER, payload: centers });
  } catch (e) {
    dispatch({ type: SEARCH_CENTER_ERROR, payload: e });
  }
};

// 선택한 어린이집 정보 Fetch
export const selectCenter = (centerId) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_CENTER_LOADING });

    const centerInfo = await getCenter(centerId);
    dispatch({ type: SELECTED_CENTER, payload: centerInfo });
  } catch (e) {
    dispatch({ type: SEARCH_CENTER_ERROR, payload: e });
  }
};

/*
 * searchModalOpen : 어린이집 검색 모달창 열기/닫기
 * searchData: 선택된 어린이집 정보
 */
const initialState = {
  searchModalOpen: false,
  loading: false,
  searchData: {
    sido: null,
    sgg: null,
    center: null,
    selectedCenter: null,
  },
  error: null,
};

export default function searchCenterReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, searchModalOpen: true };
    case CLOSE_MODAL:
      return { ...state, searchModalOpen: false };
    case INIT_MODAL:
      return { ...initialState };
    case SEARCH_CENTER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SIDO:
      return {
        ...state,
        loading: false,
        searchData: {
          ...state.searchData,
          sido: action.payload,
        },
      };
    case FETCH_SGG:
      return {
        ...state,
        loading: false,
        searchData: {
          ...state.searchData,
          sgg: action.payload,
          center: null,
        },
      };
    case FETCH_CENTER:
      return {
        ...state,
        loading: false,
        searchData: {
          ...state.searchData,
          center: action.payload,
        },
      };
    case SELECTED_CENTER:
      return {
        ...state,
        loading: false,
        searchData: {
          ...state.searchData,
          selectedCenter: action.payload,
        },
      };
    case SEARCH_CENTER_ERROR:
      return {
        ...state,
        loading: false,
        searchData: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
