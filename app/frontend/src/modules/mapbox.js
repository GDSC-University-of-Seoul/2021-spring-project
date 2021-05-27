import axios from "axios";

const DATA_LOADING = "mapbox/DATA_LOADING";
const DATA_SUCCESS = "mapbox/DATA_SUCCESS";
const DATA_FAILURE = "mapbox/DATA_FAILURE";

/**
 * 지도를 초기화하기 위해 사용할 데이터를 Fetch하는 액션 함수
 *
 * @param {function} dispatch: 제공된 액션 객체의 타입을 통해 리듀서에서 지정된 동작을 호출
 */
export const getData = () => async (dispatch) => {
  dispatch({ type: DATA_LOADING });
  try {
    const districtsGeojson = await axios.get(
      "/src/assets/data/KoreaDistrict.geojson"
    );
    // Todo : 어린이집 사건·사고 데이터 전체를 Fetch 할 예정 (지도 색상 레이블)
    const districts = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/districts`
    );
    dispatch({
      type: DATA_SUCCESS,
      payload: {
        districtsGeojson: districtsGeojson.data,
        districts: districts.data,
      },
    });
  } catch (e) {
    console.log(e);
    dispatch({ type: DATA_FAILURE, payload: e });
  }
};

const initialState = {
  loading: false,
  data: { districtsGeojson: null, districts: null },
  error: null,
};

/**
 * 액션 타입에 따라 상태를 업데이트하는 리듀서 함수
 *
 * @param {Object} state : 변경할 상태
 * @param {Object} action : 수행할 리듀서 동작을 지정하는 액션 객체
 * @return {Object} 변경된 상태
 */
export default function mapboxReducer(state = initialState, action) {
  switch (action.type) {
    // 데이터 로딩중
    case DATA_LOADING:
      return {
        ...state,
        loading: true,
        data: { districtsGeojson: null, districts: null },
        error: null,
      };
    // 데이터 Fetch 완료
    case DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          districtsGeojson: action.payload.districtsGeojson,
          districts: action.payload.districts,
        },
        error: null,
      };
    // 에러 발생
    case DATA_FAILURE:
      return {
        ...state,
        loading: false,
        data: { districtsGeojson: null, districts: null },
        error: action.payload,
      };
    default:
      return state;
  }
}
