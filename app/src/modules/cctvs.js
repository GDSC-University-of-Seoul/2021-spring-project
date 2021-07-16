/**
 * 백엔드 API를 통해 CCTV 데이터 관리
 */

import { dateFormat, macApiFormat, macFormat } from "../utils/format/format";

import axios from "axios";

const CCTVS_DATA_LOADING = "cctvs/CCTVS_DATA_LOADING";
const CCTVS_DATA_FETCH = "cctvs/CCTVS_DATA_FETCH";
const CCTVS_DATA_CREATE = "cctvs/CCTVS_DATA_CREATE";
const CCTVS_DATA_UPDATE = "cctvs/CCTVS_DATA_UPDATE";
const CCTVS_DATA_DELETE = "cctvs/CCTVS_DATA_DELETE";
const CCTVS_DATA_ERROR = "cctvs/CCTVS_DATA_ERROR";

// 모든 CCTV Data 가져오기 (READ)
export const fetchCctvsData = () => async (dispatch) => {
  try {
    dispatch({ type: CCTVS_DATA_LOADING });

    const cctvsData = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/cctvs`
    );
    // 날짜 형식 설정 (install_date, uninstall_date)
    const formatData = cctvsData.data.map((cctvData) => {
      const installDate = new Date(cctvData.install_date);
      const uninstallDate = new Date(cctvData.uninstall_date);

      return {
        ...cctvData,
        cctv_mac: macFormat(cctvData.cctv_mac),
        install_date: dateFormat(installDate),
        uninstall_date: dateFormat(uninstallDate),
      };
    });

    dispatch({ type: CCTVS_DATA_FETCH, payload: formatData });
  } catch (e) {
    dispatch({ type: CCTVS_DATA_ERROR, payload: e });
  }
};

/**
 * CCTV Data 생성하기 (CREATE - center_id 기준)
 *
 * @param {Object} createInfo : 새롭게 생성되는 데이터
 * - 속성 : { center_id, cctv_name, cctv_mac, quality, install_date, uninstall_date }
 */
export const createCctvsData = (createInfo) => async (dispatch) => {
  try {
    dispatch({ type: CCTVS_DATA_LOADING });
    createInfo.cctv_mac = macApiFormat(createInfo.cctv_mac);
    await axios.post(
      `${process.env.REACT_APP_API_SERVER}/api/cctvs`,
      createInfo
    );
    createInfo.cctv_mac = macFormat(createInfo.cctv_mac);
    dispatch({ type: CCTVS_DATA_CREATE, payload: createInfo });
  } catch (e) {
    dispatch({ type: CCTVS_DATA_ERROR, payload: e });
  }
};

/**
 * CCTV Data 갱신하기 (UPDATE - cctv_mac 기준)
 * - center_id, cctv_mac 이외의 속성 변경
 *
 * @param {Object} updateInfo : 새롭게 갱신되는 데이터
 * - 속성 : { cctv_name, cctv_mac, quality, install_date, uninstall_date }
 */
export const updateCctvsData = (updateInfo) => async (dispatch) => {
  try {
    dispatch({ type: CCTVS_DATA_LOADING });

    await axios.put(
      `${process.env.REACT_APP_API_SERVER}/api/cctvs/${macApiFormat(
        updateInfo.cctv_mac
      )}`,
      updateInfo
    );
    dispatch({ type: CCTVS_DATA_UPDATE, payload: updateInfo });
  } catch (e) {
    dispatch({ type: CCTVS_DATA_ERROR, payload: e });
  }
};

/**
 * CCTV Data 삭제하기 (DELETE - cctv_mac 기준)
 *
 * @param {Array} deleteData : 삭제하고자 하는 데이터들
 */
export const deleteCctvsData = (deleteData) => async (dispatch) => {
  try {
    dispatch({ type: CCTVS_DATA_LOADING });

    for (const data of deleteData) {
      await axios.delete(
        `${process.env.REACT_APP_API_SERVER}/api/cctvs/${macApiFormat(
          data.cctv_mac
        )}`
      );
    }

    dispatch({ type: CCTVS_DATA_DELETE, payload: deleteData });
  } catch (e) {
    dispatch({ type: CCTVS_DATA_ERROR, payload: e });
  }
};

// cctvsData : CCTV 전체 데이터
const initialState = {
  loading: false,
  cctvsData: [],
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
        cctvsData: action.payload,
        error: null,
      };
    case CCTVS_DATA_CREATE:
      return {
        ...state,
        loading: false,
        cctvsData: state.cctvsData.concat(action.payload),
        error: null,
      };
    case CCTVS_DATA_UPDATE:
      return {
        ...state,
        loading: false,
        cctvsData: state.cctvsData.map((data) =>
          data.cctv_mac === action.payload.cctv_mac ? action.payload : data
        ),
        error: null,
      };
    case CCTVS_DATA_DELETE:
      return {
        ...state,
        loading: false,
        cctvsData: state.cctvsData.filter(
          (data) =>
            !action.payload.find(
              (deleteData) => deleteData.cctv_mac === data.cctv_mac
            )
        ),
        error: null,
      };
    case CCTVS_DATA_ERROR:
      return {
        ...state,
        loading: false,
        cctvsData: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
