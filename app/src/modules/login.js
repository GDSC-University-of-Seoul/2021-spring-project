import {
  deleteCookie,
  getCookie,
  setCookie,
  updateCookie,
} from "../utils/cookie";

import axios from "axios";
import { getCheckJWTValid } from "../api/userInfo";

const LOGIN_SUCCESS = "login/LOGIN_SUCCESS";
const LOGOUT = "login/LOGOUT";
const LOGIN_ERROR = "login/LOGIN_ERROR";
const CHECK_LOGIN_ERROR = "login/CHECK_LOGIN_ERROR";

/**
 * 로그인 시도
 *
 * @param {String} userId : 입력한 ID
 * @param {String} userPw : 입력한 PW
 */
export const loginSubmit = (userId, userPw) => async (dispatch) => {
  try {
    const loginResponse = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/api/auth/login`,
      {
        member_id: userId,
        password: userPw,
      },
      { withCredentials: true }
    );

    const { member, token } = loginResponse.data;

    const loginInfo = {
      userId: member.member_id,
      userName: member.member_name,
      email: member.email,
      userToken: token,
    };

    setCookie("loginInfo", JSON.stringify(loginInfo), 10);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: loginInfo,
    });
  } catch (e) {
    if (e.response.status === 401)
      dispatch({ type: LOGIN_ERROR, payload: "⚠️ 로그인에 실패하였습니다" });
  }
};

/**
 * 기존에 저장된 로그인 쿠키 정보 Fetch, 이후 토큰 유효성 검사로 로그인 여부 결정
 */
export const getLoginCookie = () => async (dispatch) => {
  try {
    // loginInfo 쿠키 존재 여부 확인
    const loginInfo = JSON.parse(getCookie("loginInfo"));

    // 기존에 쿠키가 없거나 만료되어 사라지면 로그아웃 처리
    if (!loginInfo || !loginInfo.userToken) {
      dispatch({ type: LOGOUT });
      return;
    }

    // 사용자 토큰 유효성 검사
    await getCheckJWTValid(loginInfo.userToken);

    dispatch({ type: LOGIN_SUCCESS, payload: loginInfo });
  } catch (e) {
    dispatch({
      type: LOGIN_ERROR,
      payload: "⚠️ 사용자 정보를 가져올 수 없습니다.",
    });
  }
};

/**
 * 사용자 로그아웃
 *
 * @param {Object} history 리다이렉션을 위한 history 객체
 */
export const logOut = (history) => async (dispatch) => {
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
export const loginInfoUpdate = (userInfo, userToken) => async (dispatch) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_API_SERVER}/api/auth/member`,
      {
        member_name: userInfo.userName,
        password: userInfo.password,
        email: userInfo.email,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
  } catch (e) {
    dispatch({ type: LOGIN_ERROR, payload: e });
  }
};

// 로그인 정보 초기화
export const initLogin = () => {
  return { type: LOGOUT };
};

// 로그인 에러 확인
export const checkLoginError = () => ({ type: CHECK_LOGIN_ERROR });

const initialState = {
  loginSuccess: false,
  loginInfo: {
    userId: null,
    userName: null,
    email: null,
    userToken: null,
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
    case CHECK_LOGIN_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
