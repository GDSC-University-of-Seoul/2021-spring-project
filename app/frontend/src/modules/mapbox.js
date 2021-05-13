import axios from "axios";

const DATA_LOADING = "mapbox/DATA_LOADING";
const DATA_SUCCESS = "mapbox/DATA_SUCCESS";
const DATA_FAILURE = "mapbox/DATA_FAILURE";

export const getData = () => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  try {
    const fetchData = await axios.get(
      "https://raw.githubusercontent.com/vuski/admdongkor/master/ver20210101/HangJeongDong_ver20210101.geojson"
    );
    dispatch({ type: DATA_SUCCESS, payload: fetchData.data });
  } catch (e) {
    dispatch({ type: DATA_FAILURE, payload: e });
  }
};

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export default function mapboxReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      return { ...state, loading: true, data: null, error: null };
    case DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case DATA_FAILURE:
      return { ...state, loading: false, data: null, error: action.payload };
    default:
      return state;
  }
}
