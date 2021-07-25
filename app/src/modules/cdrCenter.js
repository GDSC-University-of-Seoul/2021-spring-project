const FETCH_CDRCENTER_DATA = "cdrCenter/FETCH_CDRCENTER_DATA";
const RESET_CDRCENTER = "cdrCenter/RESET_CDRCENTER";

export const setCdrCenter = (cdrCenterInfo) => async (dispatch) => {
  dispatch({ type: FETCH_CDRCENTER_DATA, payload: cdrCenterInfo });
};

export const resetCdrCenter = () => (dispatch) => {
  dispatch({ type: RESET_CDRCENTER });
};

const initialState = {
  data: {
    center_name: "",
    operation_type: "",
    operation_status: "",
    address: "",
    zip_code: "",
    center_phone: "",
    fax: "",
    web_page: "",
    latitude: "",
    longtitude: "",
  },
};

export default function cdrCenterReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CDRCENTER_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case RESET_CDRCENTER:
      return initialState;
    default:
      return state;
  }
}
