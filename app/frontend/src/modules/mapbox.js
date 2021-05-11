import axios from "axios";

const DATA_LOADING = "mapbox/DATA_LOADING";
const DATA_SUCCESS = "mapbox/DATA_SUCCESS";
const DATA_FAILURE = "mapbox/DATA_FAILURE";

export const getData = () => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  try {
    const fetchArea = await axios.get("/src/assets/data/Korea_area.geojson");
    // Todo : 어린이집 사건·사고 데이터 전체를 Fetch 할 예정 (지도 색상 레이블)
    // 현재는 은평구 어린이집 데이터를 fetch 하여 사용중
    const fetchChildHouse = await axios.get(
      "/src/assets/data/Eunpyeonggu_childhouse_data.xml"
    );
    dispatch({
      type: DATA_SUCCESS,
      payload: { area: fetchArea.data, childHouse: fetchChildHouse.data },
    });
  } catch (e) {
    dispatch({ type: DATA_FAILURE, payload: e });
  }
};

const initialState = {
  loading: false,
  data: { area: null, childHouse: null },
  error: null,
};

export default function mapboxReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        loading: true,
        data: { area: null, childHouse: null },
        error: null,
      };
    case DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          area: action.payload.area,
          childHouse: action.payload.childHouse,
        },
        error: null,
      };
    case DATA_FAILURE:
      return {
        ...state,
        loading: false,
        data: { area: null, childHouse: null },
        error: action.payload,
      };
    default:
      return state;
  }
}
