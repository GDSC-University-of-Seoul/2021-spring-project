const CCTV_ITEM_SELECTED_ON = "cctvsTableEvent/CCTV_ITEM_SELECTED_ON";
const CCTV_ITEM_SELECTED_OFF = "cctvsTableEvent/CCTV_ITEM_SELECTED_OFF";
const CCTV_ITEM_CLICKED = "cctvsTableEvent/CCTV_ITEM_CLICKED";

export const selectCctvData = (cctvData) => ({
  type: CCTV_ITEM_SELECTED_ON,
  payload: cctvData,
});
export const selectOffCctvData = (cctvId) => ({
  type: CCTV_ITEM_SELECTED_OFF,
  payload: cctvId,
});
export const clickCctvData = (data) => ({
  type: CCTV_ITEM_CLICKED,
  payload: data,
});

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
    default:
      return state;
  }
}
