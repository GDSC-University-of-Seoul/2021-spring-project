/**
 * 범주와 관련된 state 및 동작을 관리
 */
const CONTROL_SIDO = "mapboxCategory/CONTROL_SIDO";
const CONTROL_SGG = "mapboxCategory/CONTROL_SGG";

/**
 * diff에 기반해 도·광역시 영역 색상을 설정한다.
 *
 * @param {Number} diff: 도·광역시 영역 색상 기준
 */
export const controlSido = (type, value) => (dispatch) => {
  dispatch({
    type: CONTROL_SIDO,
    payload: {
      type,
      value,
    },
  });
};

/**
 * diff에 기반해 시·군·구 영역 색상을 설정한다.
 *
 * @param {Number} diff: 시·군·구 영역 색상 기준
 */
export const controlSgg = (type, value) => (dispatch) => {
  dispatch({
    type: CONTROL_SGG,
    payload: {
      type,
      value,
    },
  });
};

const initialControl = {
  sidoControl: {
    min: 10,
    max: 100,
    step: 10,
    diff: 50,
  },
  sggControl: {
    min: 1,
    max: 10,
    step: 1,
    diff: 5,
  },
};

/**
 * 액션 타입에 따라 상태를 업데이트하는 리듀서 함수
 *
 * @param {Object} state : 변경할 상태
 * @param {Object} action : 수행할 리듀서 동작을 지정하는 액션 객체
 * @return {Object} 변경된 상태
 */
export default function mapboxCategoryReducer(state = initialControl, action) {
  let changeState = {
    ...state,
  };
  switch (action.type) {
    case CONTROL_SIDO:
      changeState.sidoControl[action.payload.type] = action.payload.value;
      return changeState;
    case CONTROL_SGG:
      changeState.sggControl[action.payload.type] = action.payload.value;
      return changeState;
    default:
      return state;
  }
}
