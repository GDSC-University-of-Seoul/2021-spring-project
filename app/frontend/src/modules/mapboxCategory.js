/**
 * 범주와 관련된 state 및 동작을 관리
 */
const CONTROL_SIDO_DIFF = "mapboxCategory/CONTROL_SIDO_DIFF";
const CONTROL_SGG_DIFF = "mapboxCategory/CONTROL_SGG_DIFF";

/**
 * diff에 기반해 도·광역시 영역 색상을 설정한다.
 *
 * @param {Number} diff: 도·광역시 영역 색상 기준
 */
export const controlSidoDiff = (diff) => (dispatch) => {
  dispatch({
    type: CONTROL_SIDO_DIFF,
    payload: diff,
  });
};

/**
 * diff에 기반해 시·군·구 영역 색상을 설정한다.
 *
 * @param {Number} diff: 시·군·구 영역 색상 기준
 */
export const controlSggDiff = (diff) => (dispatch) => {
  dispatch({
    type: CONTROL_SGG_DIFF,
    payload: diff,
  });
};

const initialControl = {
  sidoDiff: 50,
  sggDiff: 5,
};

/**
 * 액션 타입에 따라 상태를 업데이트하는 리듀서 함수
 *
 * @param {Object} state : 변경할 상태
 * @param {Object} action : 수행할 리듀서 동작을 지정하는 액션 객체
 * @return {Object} 변경된 상태
 */
export default function mapboxCategoryReducer(state = initialControl, action) {
  switch (action.type) {
    case CONTROL_SIDO_DIFF:
      return {
        ...state,
        sidoDiff: action.payload,
      };
    case CONTROL_SGG_DIFF:
      return {
        ...state,
        sggDiff: action.payload,
      };
    default:
      return state;
  }
}
