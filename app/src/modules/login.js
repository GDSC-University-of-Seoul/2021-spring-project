import { getCookie, setCookie } from "../utils/cookie/cookie";

import axios from "axios";

const LOGIN_SUCCESS = "login/LOGIN_SUCCESS";
const LOGIN_ERROR = "login/LOGIN_ERROR";
const LOGIN_ERROR_INIT = "login/LOGIN_ERROR_INIT";

export const loginSubmit = (userId, userPw) => async (dispatch) => {
  try {
    // Todo : 로그인 서버 주소 지정
    const loginInfo = await axios.post(`${process.env.REACT_APP_API_SERVER}/`, {
      userId,
      userPw,
    });

    setCookie("loginInfo", JSON.stringify(loginInfo), 1);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: loginInfo,
    });
  } catch (e) {
    dispatch({ type: LOGIN_ERROR, payload: e });
  }
};

export const getLoginCookie = () => {
  const loginInfo = JSON.parse(getCookie("loginInfo"));
  if (loginInfo) return { type: LOGIN_SUCCESS, payload: loginInfo };

  return { type: LOGIN_ERROR, payload: null };
};

export const initError = () => {
  return { type: LOGIN_ERROR_INIT };
};

const initialState = {
  loginSuccess: false,
  loginInfo: {
    userId: null,
    userName: null,
    email: null,
  },
  error: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loginSuccess: true,
        loginInfo: action.payload,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginSuccess: false,
        error: action.payload,
      };
    case LOGIN_ERROR_INIT:
      return {
        ...state,
        loginSuccess: false,
        error: null,
      };
    default:
      return state;
  }
}
