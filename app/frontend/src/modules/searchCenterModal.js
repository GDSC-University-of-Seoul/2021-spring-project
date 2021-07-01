import axios from "axios";

const OPEN_MODAL = "searchCenterModal/OPEN_MODAL";
const CLOSE_MODAL = "searchCenterModal/CLOSE_MODAL";
const SEARCH_CENTER_LOADING = "searchCenterModal/SEARCH_CENTER_LOADING";
const FETCH_SIDO = "searchCenterModal/FETCH_SIDO";
const FETCH_SGG = "searchCenterModal/FETCH_SGG";
const FETCH_CENTER = "searchCenterModal/FETCH_CENTER";
const SELECTED_CENTER = "searchCenterModal/SELECTED_CENTER";
const SEARCH_CENTER_ERROR = "searchCenterModal/SEARCH_CENTER_ERROR";

export const openSearchModal = () => ({ type: OPEN_MODAL });
export const closeSearchModal = () => ({ type: CLOSE_MODAL });
export const fetchSido = () => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_CENTER_LOADING });
    const sido = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/districts`
    );
    dispatch({ type: FETCH_SIDO, payload: sido.data });
  } catch (e) {
    dispatch({ type: SEARCH_CENTER_ERROR, payload: e });
  }
};
export const fetchSgg = (sidoCode) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_CENTER_LOADING });
    const sgg = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/districts/${sidoCode}`
    );
    dispatch({ type: FETCH_SGG, payload: sgg.data });
  } catch (e) {
    dispatch({ type: SEARCH_CENTER_ERROR, payload: e });
  }
};
export const fetchCenter = (sggCode) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_CENTER_LOADING });
    const center = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/centers?district_code=${sggCode}`
    );
    dispatch({ type: FETCH_CENTER, payload: center.data });
  } catch (e) {
    dispatch({ type: SEARCH_CENTER_ERROR, payload: e });
  }
};
export const selectCenter = (centerId) => ({
  type: SELECTED_CENTER,
  payload: centerId,
});

const initialState = {
  searchModalOpen: false,
  loading: false,
  searchData: {
    sido: null,
    sgg: null,
    center: null,
    selectedCenterId: null,
  },
  error: null,
};

export default function searchCenterReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, searchModalOpen: true };
    case CLOSE_MODAL:
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
          selectedCenterId: action.payload,
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
