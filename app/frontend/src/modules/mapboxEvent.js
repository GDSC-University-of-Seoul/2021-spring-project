import axios from "axios";

const SET_GEOJSON_DATA = "mapboxEvent/SET_GEOJSON_DATA";
const SET_HOVER_INFO = "mapboxEvent/SET_HOVER_INFO";
const SIDO_CLICK = "mapboxEvent/SIDO_CLICK";
const SGG_CLICK = "mapboxEvent/SGG_CLICK";
const RESET_DISTRICT = "mapboxEvent/RESET";
const ERROR = "mapboxEvent/ERROR";

/**
 * 전달받은 geojsonData를 상태에 반영하는 액션함수
 *
 * @param {JSON} geojsonData 행정구역 geojson 데이터
 */
export const setGeojsonData = (geojsonData) => (dispatch) => {
  dispatch({ type: SET_GEOJSON_DATA, payload: geojsonData });
};

/**
 * 도, 광역시 hover 이벤트를 처리하는 액션함수
 * - 도, 광역시 관련 hoverInfo를 생성하여 상태에 반영
 *
 * @param {Object} e hover 이벤트 객체
 */
export const sidoHover = (e) => (dispatch) => {
  const hoverArea = e.features[0];
  /*
   * hoverInfo : hover 이벤트를 통한 정보
   *
   * - longitude : hover 중인 위도
   * - latitude : hover 중인 경도
   * - districtName : hover 중인 지역구 이름
   * - districtCode : hover 중인 지역구 코드
   * - districtCount : hover 중인 지역구 어린이집 개수
   */
  const hoverInfo = {
    longitude: e.lngLat[0],
    latitude: e.lngLat[1],
    districtName: hoverArea.properties.sidonm,
    districtCode:
      hoverArea.properties.sido && hoverArea.properties.sido + "00000000",
    districtCount: hoverArea.properties.sido_cnt,
  };
  dispatch({ type: SET_HOVER_INFO, payload: hoverInfo });
};
/**
 * 시,군,구 hover 이벤트를 처리하는 액션함수
 * - 시,군,구 관련 hoverInfo를 생성하여 상태에 반영
 *
 * @param {Object} e hover 이벤트 객체
 */
export const sggHover = (e) => (dispatch) => {
  const hoverArea = e.features[0];
  const hoverInfo = {
    longitude: e.lngLat[0],
    latitude: e.lngLat[1],
    districtName: hoverArea.properties.sggnm,
    districtCode:
      hoverArea.properties.sgg && hoverArea.properties.sgg + "00000",
    districtCount: hoverArea.properties.sgg_cnt,
  };
  dispatch({ type: SET_HOVER_INFO, payload: hoverInfo });
};
/**
 * 도, 광역시 클릭 이벤트를 처리하는 액션함수
 * - 도, 광역시 코드에 기반해 속해있는 시,군,구 구역 데이터를 Fetch
 * - 도, 광역시 내에 속해있는 시,군,구 geojson 데이터 필터링
 * - 필터링한 geojson 데이터를 상태에 반영
 *
 * @param {Object} geojsonData 행정구역 geojson 데이터
 * @param {Object} selectedDistrictInfo hover 중인 영역의 정보 (지역명, 코드)
 */
export const sidoClick =
  (geojsonData, selectedDistrictInfo) => async (dispatch) => {
    try {
      const geojson = {
        type: "FeatureCollection",
        features: [],
      };

      // 도, 광역시 코드에 기반해 속해있는 시,군,구 구역 데이터를 Fetch
      const sggsDistrictData = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/api/districts?parent_code=${selectedDistrictInfo.code}`
      );
      // 도, 광역시 내에 속해있는 시,군,구 geojson 데이터 필터링
      const sggsFeatures = geojsonData.features.filter(
        (data) => data.properties.sidonm === selectedDistrictInfo.name
      );
      // geojson 데이터에 시,군,구 어린이집 개수(sgg_cnt) 정보 저장
      sggsFeatures.forEach((sggFeatures) => {
        sggsDistrictData.data.forEach((sggDistrictData) => {
          if (sggFeatures.properties.sggnm === sggDistrictData.district_name)
            sggFeatures.properties.sgg_cnt = parseInt(
              sggDistrictData.count,
              10
            );
        });
        if (!sggFeatures.properties.sgg_cnt) sggFeatures.properties.sgg_cnt = 0;
      });

      // 필터링한 geojson 데이터를 상태에 반영하고 레벨을 시,군,구 기준으로 변경
      geojson.features = sggsFeatures;
      dispatch({
        type: SIDO_CLICK,
        payload: { geojson, sidoName: selectedDistrictInfo.name },
      });
    } catch (e) {
      dispatch({ type: ERROR, payload: e });
    }
  };

/**
 * 시,군,구 클릭 이벤트를 처리하는 액션함수
 * - 시,군,구 코드에 기반해 어린이집 데이터를 Fetch
 * - Fetch한 어린이집 데이터를 상태에 반영
 *
 * @param {Object} selectedDistrictInfo hover 중인 영역의 정보 (지역명, 코드)
 */
export const sggClick = (selectedDistrictInfo) => async (dispatch) => {
  try {
    // 시,군,구 코드에 기반해 어린이집 데이터를 Fetch
    const sggCdrCenterData = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/centers?code=${selectedDistrictInfo.code}`
    );
    dispatch({
      type: SGG_CLICK,
      payload: {
        cdrCenters: sggCdrCenterData.data,
        sggName: selectedDistrictInfo.name,
      },
    });
  } catch (e) {
    dispatch({ type: ERROR, payload: e });
  }
};
/**
 * 리셋 버튼 클릭 이벤트를 처리하는 액션함수
 * - 도, 광역시 기준 geojson 데이터 반영
 * - 도, 광역시 기준 level 변경
 * - 어린이집 정보 제거
 *
 * @param {Object} selectedDistrictInfo hover 중인 영역의 정보 (지역명, 코드)
 */
export const resetDistrict = (geojsonData) => async (dispatch) => {
  dispatch({ type: RESET_DISTRICT, payload: geojsonData });
};
const initialState = {
  data: {
    level: 1,
    hoverInfo: null,
    sidoName: "",
    sggName: "",
    geojsonData: null,
    cdrCentersInfo: null,
  },
  error: null,
};

/**
 * 액션 타입에 따라 상태를 업데이트하는 리듀서 함수
 *
 * @param {Object} state : 변경할 상태
 * @param {Object} action : 수행할 리듀서 동작을 지정하는 액션 객체
 * @return {Object} 변경된 상태
 */
export default function mapboxEventReducer(state = initialState, action) {
  switch (action.type) {
    // geojson 데이터 설정
    case SET_GEOJSON_DATA:
      return {
        data: {
          ...state.data,
          geojsonData: action.payload,
          cdrCentersInfo: null,
        },
        error: null,
      };
    // 지역구 hover 이벤트
    case SET_HOVER_INFO:
      return {
        data: {
          ...state.data,
          hoverInfo: action.payload,
        },
        error: null,
      };
    // 도, 광역시 클릭 이벤트
    case SIDO_CLICK:
      return {
        data: {
          ...state.data,
          level: 2,
          geojsonData: action.payload.geojson,
          sidoName: action.payload.sidoName,
        },
        error: null,
      };
    // 시,군,구 클릭 이벤트
    case SGG_CLICK:
      return {
        data: {
          ...state.data,
          cdrCentersInfo: action.payload.cdrCenters,
          sggName: action.payload.sggName,
        },
        error: null,
      };
    // reset 이벤트
    case RESET_DISTRICT:
      return {
        data: {
          ...state.data,
          level: 1,
          sidoName: "",
          sggName: "",
          geojsonData: action.payload,
          cdrCentersInfo: null,
        },
      };
    // 에러 발생
    case ERROR:
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
