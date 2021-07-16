/**
 * CCTV 표 이벤트 상태 관리
 */
const CCTV_ITEM_SELECTED_ON = "cctvsTableEvent/CCTV_ITEM_SELECTED_ON";
const CCTV_ITEM_SELECTED_OFF = "cctvsTableEvent/CCTV_ITEM_SELECTED_OFF";
const CCTV_ITEM_CLICKED = "cctvsTableEvent/CCTV_ITEM_CLICKED";
const CCTV_ITEM_INIT_SELECTED = "cctvsTableEvent/CCTV_ITEM_INIT_SELECTED";

// 표 데이터 선택 이벤트 처리
export const selectCctvData = (cctvData) => ({
  type: CCTV_ITEM_SELECTED_ON,
  payload: cctvData,
});

// 표 데이터 선택 해제 이벤트 처리
export const selectOffCctvData = (cctvId) => ({
  type: CCTV_ITEM_SELECTED_OFF,
  payload: cctvId,
});

// 표 데이터 클릭 이벤트 처리
export const clickCctvData = (clickedData) => ({
  type: CCTV_ITEM_CLICKED,
  payload: clickedData,
});

// selectedData 초기화
export const initSelectCctvData = (selectedData) => ({
  type: CCTV_ITEM_INIT_SELECTED,
  payload: selectedData,
});

/*
 * selectedData : 선택된 CCTV 데이터
 * clickedData : 클릭된 CCTV 데이터
 */
const initialState = {
  selectedData: [],
  clickedData: null,
};

export default function cctvsTableEventReducer(state = initialState, action) {
  switch (action.type) {
    case CCTV_ITEM_SELECTED_ON:
      return {
        ...state,
        selectedData: state.selectedData.concat(action.payload),
      };
    case CCTV_ITEM_SELECTED_OFF:
      return {
        ...state,
        selectedData: state.selectedData.filter(
          (data) => data.cctv_mac !== action.payload
        ),
      };
    case CCTV_ITEM_CLICKED:
      return {
        ...state,
        clickedData: action.payload,
      };
    case CCTV_ITEM_INIT_SELECTED:
      return {
        ...state,
        selectedData: action.payload,
      };
    default:
      return state;
  }
}
