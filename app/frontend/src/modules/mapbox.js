import axios from "axios";

const DATA_LOADING = "mapbox/DATA_LOADING";
const DATA_SUCCESS = "mapbox/DATA_SUCCESS";
const DATA_FAILURE = "mapbox/DATA_FAILURE";

export const getData = () => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  try {
    const fetchDistrict = await axios.get(
      "/src/assets/data/KoreaDistrict.geojson"
    );
    // Todo : 어린이집 사건·사고 데이터 전체를 Fetch 할 예정 (지도 색상 레이블)
    // 현재는 은평구 어린이집 데이터를 fetch 하여 사용중
    console.log(`${process.env.REACT_APP_API_SERVER}/api/regions`);
    const fetchRegions = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/regions`
    );
    dispatch({
      type: DATA_SUCCESS,
      payload: { district: fetchDistrict.data, regions: fetchRegions.data },
    });
  } catch (e) {
    console.log(e);
    dispatch({ type: DATA_FAILURE, payload: e });
  }
};

const initialState = {
  loading: false,
  data: { district: null, regions: null },
  error: null,
};

export default function mapboxReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        loading: true,
        data: { district: null, regions: null },
        error: null,
      };
    case DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          district: action.payload.district,
          regions: action.payload.regions,
        },
        error: null,
      };
    case DATA_FAILURE:
      return {
        ...state,
        loading: false,
        data: { district: null, regions: null },
        error: action.payload,
      };
    default:
      return state;
  }
}
