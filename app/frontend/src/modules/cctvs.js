/**
 * 백엔드 API를 통해 CCTV 데이터 관리
 */

import axios from "axios";

const CCTVS_DATA_LOADING = "cctvs/CCTVS_DATA_LOADING";
const CCTVS_DATA_FETCH = "cctvs/CCTVS_DATA_FETCH";
const CCTVS_DATA_CREATE = "cctvs/CCTVS_DATA_CREATE";
const CCTVS_DATA_UPDATE = "cctvs/CCTVS_DATA_UPDATE";
const CCTVS_DATA_DELETE = "cctvs/CCTVS_DATA_DELETE";
const CCTVS_DATA_ERROR = "cctvs/CCTVS_DATA_ERROR";

const format = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? "0" + String(month) : month}-${
    day < 10 ? "0" + String(day) : day
  }`;
};

export const fetchCctvsData = () => async (dispatch) => {
  try {
    dispatch({ type: CCTVS_DATA_LOADING });

    const cctvsData = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/cctvs`
    );
    const formatData = cctvsData.data.map((cctvData) => {
      const installDate = new Date(cctvData.install_date);
      const uninstallDate = new Date(cctvData.uninstall_date);

      return {
        ...cctvData,
        install_date: format(installDate),
        uninstall_date: format(uninstallDate),
      };
    });

    dispatch({ type: CCTVS_DATA_FETCH, payload: formatData });
  } catch (e) {
    dispatch({ type: CCTVS_DATA_ERROR, payload: e });
  }
};
export const createCctvsData = (cctvData) => async (dispatch) => {};
export const updateCctvsData = (cctvData) => async (dispatch) => {};
export const deleteCctvsData = () => async (dispatch) => {};

const initialState = {
  loading: false,
  cctvsData: null,
  error: null,
};

export default function cctvsReducer(state = initialState, action) {
  switch (action.type) {
    case CCTVS_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CCTVS_DATA_FETCH:
      return {
        ...state,
        loading: false,
        cctvsData: action.payload,
        error: null,
      };
    case CCTVS_DATA_CREATE:
      return;
    case CCTVS_DATA_UPDATE:
      return;
    case CCTVS_DATA_DELETE:
      return;
    case CCTVS_DATA_ERROR:
      return {
        ...state,
        loading: false,
        cctvsData: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
