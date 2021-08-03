import { deleteCookie, getCookie, setCookie } from "../utils/cookie/cookie";

import axios from "axios";

const LOGIN_SUCCESS = "login/LOGIN_SUCCESS";
const LOGOUT = "login/LOGOUT";
const LOGIN_ERROR = "login/LOGIN_ERROR";

export const loginSubmit = (userId, userPw) => async (dispatch) => {
  try {
    // Todo : 로그인 서버 주소 지정
    /*
    const loginInfo = await axios.post(`${process.env.REACT_APP_API_SERVER}/`, {
      userId,
      userPw,
    });
    */
    const loginInfo = {
      userId: 123,
      userName: "홍길동",
      email: "hongildong@gmail.com",
    };

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

export const logOut = (history) => (dispatch) => {
  deleteCookie("loginInfo");
  dispatch({ type: LOGOUT });
  history.push("/");
};

export const initLogin = () => {
  return { type: LOGOUT };
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
    case LOGOUT:
      return {
        loginSuccess: false,
        loginInfo: null,
        error: null,
      };
    default:
      return state;
  }
}
