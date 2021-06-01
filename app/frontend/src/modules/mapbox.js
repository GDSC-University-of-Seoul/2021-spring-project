import axios from "axios";

const FETCH_DATA_LOADING = "mapbox/FETCH_DATA_LOADING";
const FETCH_DATA_SUCCESS = "mapbox/FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "mapbox/FETCH_DATA_FAILURE";

/**
 * 지도를 초기화하기 위해 사용할 데이터를 Fetch하는 액션 함수
 *
 * @param {function} dispatch: 제공된 액션 객체의 타입을 통해 리듀서에서 지정된 동작을 호출
 */
export const fetchData = () => async (dispatch) => {
  dispatch({ type: FETCH_DATA_LOADING });
  try {
    let districtsGeojson = await axios.get(
      "/src/assets/data/KoreaDistrict.geojson"
    );
    districtsGeojson = districtsGeojson.data;

    // Todo : 어린이집 사건·사고 데이터 전체를 Fetch 할 예정 (지도 색상 레이블)

    let districts = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/districts`
    );
    districts = districts.data;

    // geojson 데이터에 어린이집 개수 property 추가
    // Todo : geojson 데이터에 어린이집 사건·사고 property 추가
    districtsGeojson.features.forEach((districtGeojson) => {
      districts.forEach((district) => {
        if (districtGeojson.properties.sidonm === district.district_name)
          districtGeojson.properties.sido_cnt = parseInt(district.count, 10);
      });
    });

    dispatch({
      type: FETCH_DATA_SUCCESS,
      payload: {
        districtsGeojson,
        districts,
      },
    });
  } catch (e) {
    dispatch({ type: FETCH_DATA_FAILURE });
  }
};

const initialState = {
  loading: false,
  data: { districtsGeojson: [], districts: [] },
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
    case FETCH_DATA_LOADING:
      return {
        ...state,
        loading: true,
        data: { districtsGeojson: null, districts: null },
        error: false,
      };
    // 데이터 Fetch 완료
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          districtsGeojson: action.payload.districtsGeojson,
          districts: action.payload.districts,
        },
        error: false,
      };
    // 에러 발생
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        data: { districtsGeojson: null, districts: null },
        error: true,
      };
    default:
      return state;
  }
}
