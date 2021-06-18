import axios from "axios";

const FETCH_CDRENTER_LOADING = "cdrCenter/FETCH_CDRENTER_LOADING";
const FETCH_CDRCENTER_DATA = "cdrCenter/FETCH_CDRCENTER_DATA";
const FETCH_CDRCENTER_ERROR = "cdrCenter/FETCH_CDRCENTER_ERROR";

export const fetchCdrCenter = (cdrCenterId) => (dispatch) => {
  try {
    dispatch({ type: FETCH_CDRENTER_LOADING });

    const cdrCenterInfo = axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/centers/${cdrCenterId}`
    );
    dispatch({ type: FETCH_CDRCENTER_DATA, payload: cdrCenterInfo.data });
  } catch (e) {
    dispatch({ type: FETCH_CDRCENTER_ERROR, payload: e });
  }
};

const initialState = {
  loading: false,
  data: {
    center_name: "",
    operation_type: "",
    operation_status: "",
    address: "",
    zipcode: "",
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
        data: null,
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
    default:
      return state;
  }
}
