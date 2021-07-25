import axios from "axios";

const FETCH_CDRENTER_LOADING = "cdrCenter/FETCH_CDRENTER_LOADING";
const FETCH_CDRCENTER_DATA = "cdrCenter/FETCH_CDRCENTER_DATA";
const FETCH_CDRCENTER_ERROR = "cdrCenter/FETCH_CDRCENTER_ERROR";
const RESET_CDRCENTER = "cdrCenter/RESET_CDRCENTER";

export const fetchCdrCenter = (cdrCenterId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CDRENTER_LOADING });

    const cdrCenterInfo = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/centers/${cdrCenterId}`
    );

    //어린이집 데이터 필터링 (이상행동 유무)
    const cdrCenterData = cdrCenterInfo.data.filter(
      (data) => data.anomaly_count > 0
    );

    dispatch({ type: FETCH_CDRCENTER_DATA, payload: cdrCenterData });
  } catch (e) {
    dispatch({ type: FETCH_CDRCENTER_ERROR, payload: e });
  }
};

export const resetCdrCenter = () => (dispatch) => {
  dispatch({ type: RESET_CDRCENTER });
};

const initialState = {
  loading: false,
  data: {
    center_name: "",
    operation_type: "",
    operation_status: "",
    address: "",
    zip_code: "",
    center_phone: "",
    fax: "",
    web_page: "",
  },
  error: null,
};

export default function cdrCenterReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CDRENTER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CDRCENTER_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_CDRCENTER_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case RESET_CDRCENTER:
      return initialState;
    default:
      return state;
  }
}
