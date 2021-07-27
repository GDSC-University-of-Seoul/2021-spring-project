import axios from "axios";

const LOGIN_SUCCESS = "login/LOGIN_SUCCESS";
const LOGIN_ERROR = "login/LOGIN_ERROR";
const LOGIN_ERROR_INIT = "login/LOGIN_ERROR_INIT";

export const loginSubmit = (userId, userPw) => async (dispatch) => {
  try {
    // Todo : 로그인 서버 주소 지정

    await axios.post(`${process.env.REACT_APP_API_SERVER}/`, {
      userId,
      userPw,
    });

    dispatch({ type: LOGIN_SUCCESS });
  } catch (e) {
    dispatch({ type: LOGIN_ERROR, payload: e });
  }
};

export const initError = () => {
  return { type: LOGIN_ERROR_INIT };
};

const initialState = {
  loginSuccess: false,
  error: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loginSuccess: true,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        loginSuccess: false,
        error: action.payload,
      };
    case LOGIN_ERROR_INIT:
      return {
        loginSuccess: false,
        error: null,
      };
    default:
      return state;
  }
}
