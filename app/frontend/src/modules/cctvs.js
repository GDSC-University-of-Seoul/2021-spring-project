import axios from "axios";

const CCTVS_DATA_LOADING = "cctvs/CCTVS_DATA_LOADING";
const CCTVS_DATA_FETCH = "cctvs/CCTVS_DATA_FETCH";
const CCTVS_DATA_CREATE = "cctvs/CCTVS_DATA_CREATE";
const CCTVS_DATA_UPDATE = "cctvs/CCTVS_DATA_UPDATE";
const CCTVS_DATA_DELETE = "cctvs/CCTVS_DATA_DELETE";
const CCTVS_DATA_ERROR = "cctvs/CCTVS_DATA_ERROR";

export const fetchCctvsData = () => async (dispatch) => {
  try {
    dispatch({ type: CCTVS_DATA_LOADING });

    const cctvsData = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/cctvs`
    );
    dispatch({ type: CCTVS_DATA_FETCH, payload: cctvsData.data });
  } catch (e) {
    dispatch({ type: CCTVS_DATA_ERROR, payload: e });
  }
};
export const createCctvsData = (cctvData) => async (dispatch) => {};
export const updateCctvsData = (cctvData) => async (dispatch) => {};
export const deleteCctvsData = () => async (dispatch) => {};

const initialState = {
  loading: false,
  data: null,
  error: false,
};

export default function cctvsReducer(state = initialState, action) {
  switch (action.type) {
    case CCTVS_DATA_LOADING:
      return;
    case CCTVS_DATA_FETCH:
      return;
    case CCTVS_DATA_CREATE:
      return;
    case CCTVS_DATA_UPDATE:
      return;
    case CCTVS_DATA_DELETE:
      return;
    case CCTVS_DATA_ERROR:
      return;
    default:
      return state;
  }
}
