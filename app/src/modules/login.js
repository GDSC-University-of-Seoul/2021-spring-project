import { deleteCookie, getCookie, setCookie } from "../utils/cookie";

import axios from "axios";

const LOGIN_SUCCESS = "login/LOGIN_SUCCESS";
const LOGOUT = "login/LOGOUT";
const LOGIN_ERROR = "login/LOGIN_ERROR";

/**
 * 로그인 시도
 *
 * @param {String} userId : 입력한 ID
 * @param {String} userPw : 입력한 PW
 */
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
      user_id: "123",
      user_name: "홍길동",
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

/**
 * 기존에 저장된 로그인 쿠키 정보 Fetch
 */
export const getLoginCookie = () => {
  const loginInfo = JSON.parse(getCookie("loginInfo"));
  if (loginInfo) return { type: LOGIN_SUCCESS, payload: loginInfo };

  return { type: LOGIN_ERROR, payload: null };
};

/**
 * 사용자 로그아웃
 *
 * @param {Object} history 리다이렉션을 위한 history 객체
 */
export const logOut = (history) => (dispatch) => {
  deleteCookie("loginInfo");
  dispatch({ type: LOGOUT });
  history.push("/");
};

/**
 * 사용자 정보 변경
 *
 * @param {Object} userInfo 변경할 사용자 정보 {userId, userName, password, email}
 * @returns
 */
export const loginInfoUpdate = (userInfo) => async (dispatch) => {
  try {
    // Todo : 로그인 서버 주소 지정
    //await axios.put(`${process.env.REACT_APP_API_SERVER}/`, userInfo);
  } catch (e) {
    dispatch({ type: LOGIN_ERROR, payload: e });
  }
};

/**
 * 로그인 정보 초기화
 */
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
