/**
 * 백엔드 API를 통해 CCTV 데이터 관리
 */

import { dateFormat, macApiFormat, macFormat } from "../utils/format";

import axios from "axios";

const CCTVS_DATA_LOADING = "cctvs/CCTVS_DATA_LOADING";
const CCTVS_DATA_FETCH = "cctvs/CCTVS_DATA_FETCH";
const CCTVS_DATA_ERROR = "cctvs/CCTVS_DATA_ERROR";
const CCTVS_PAGINATION = "cctvs/CCTVS_PAGINATION";

// 모든 CCTV Data 가져오기 (READ)
export const fetchCctvsData = (pagination) => async (dispatch) => {
  try {
    dispatch({ type: CCTVS_DATA_LOADING });

    const { listSize, range, page } = pagination;

    // CCTV 데이터 Fetch
    let cctvsData = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/cctvs?list_size=${listSize}&range=${range}&page=${page}`
    );

    // 데이터 형식 설정 (MAC 주소, 날짜)
    cctvsData.data.rows = cctvsData.data.rows.map((cctvData) => {
      const installDate = new Date(cctvData.install_date);
      const uninstallDate = new Date(cctvData.uninstall_date);

      return {
        ...cctvData,
        cctv_mac: macFormat(cctvData.cctv_mac),
        install_date: dateFormat(installDate),
        uninstall_date: cctvData.uninstall_date
          ? dateFormat(uninstallDate)
          : "",
      };
    });

    dispatch({ type: CCTVS_DATA_FETCH, payload: cctvsData.data });
  } catch (e) {
    dispatch({ type: CCTVS_DATA_ERROR, payload: e });
  }
};

// CCTV 데이터 추가 (CREATE - center_id 기준)
export const createCctvsData = (createInfo, pagination) => async (dispatch) => {
  try {
    dispatch({ type: CCTVS_DATA_LOADING });
    createInfo.cctv_mac = macApiFormat(createInfo.cctv_mac);

    // CCTV 데이터 추가
    await axios.post(
      `${process.env.REACT_APP_API_SERVER}/api/cctvs`,
      createInfo
    );

    // 정보 갱신용
    fetchCctvsData(pagination);
  } catch (e) {
    dispatch({ type: CCTVS_DATA_ERROR, payload: e });
  }
};

// CCTV 데이터 갱신 (UPDATE - cctv_mac 기준)
export const updateCctvsData = (updateInfo, pagination) => async (dispatch) => {
  try {
    dispatch({ type: CCTVS_DATA_LOADING });

    // CCTV 데이터 갱신
    await axios.put(
      `${process.env.REACT_APP_API_SERVER}/api/cctvs/${macApiFormat(
        updateInfo.cctv_mac
      )}`,
      updateInfo
    );

    // 정보 갱신용
    fetchCctvsData(pagination);
  } catch (e) {
    dispatch({ type: CCTVS_DATA_ERROR, payload: e });
  }
};

// CCTV Data 삭제하기 (DELETE - cctv_mac 기준)
export const deleteCctvsData = (deleteData, pagination) => async (dispatch) => {
  try {
    dispatch({ type: CCTVS_DATA_LOADING });

    // CCTV 데이터 삭제
    for (const data of deleteData) {
      await axios.delete(
        `${process.env.REACT_APP_API_SERVER}/api/cctvs/${macApiFormat(
          data.cctv_mac
        )}`
      );
    }

    // 정보 갱신용
    fetchCctvsData(pagination);
  } catch (e) {
    dispatch({ type: CCTVS_DATA_ERROR, payload: e });
  }
};

// CCTV 현재 페이지네이션 정보 설정
export const cctvsPagination = (pagination) => ({
  type: CCTVS_PAGINATION,
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
  cctvsData: [], // 페이지네이션에 대한 CCTV 데이터
  count: {
    // 전체 페이지네이션 정보
    listCount: 1,
    pageCount: 1,
  },
  error: null,
};

export default function cctvsReducer(state = initialState, action) {
  switch (action.type) {
    case CCTVS_DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CCTVS_DATA_FETCH:
      return {
        ...state,
        loading: false,
        cctvsData: action.payload.rows,
        count: action.payload.count,
        error: null,
      };
    case CCTVS_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CCTVS_PAGINATION:
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
