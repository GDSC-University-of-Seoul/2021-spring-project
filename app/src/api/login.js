import axios from "axios";

/**
 * POST 방식으로 사용자 입력 정보 기반 로그인 시도
 *
 * @param {String} userId 사용자가 입력한 아이디
 * @param {String} userPw 사용자가 입력한 패스워드
 * @returns {Object} {member, token} member : 회원 정보 / token : 사용자 JWT 토큰
 */
export const postLogin = async (userId, userPw) => {
  try {
    const loginResponse = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/api/auth/login`,
      {
        member_id: userId,
        password: userPw,
      },
      { withCredentials: true }
    );

    return loginResponse.data;
  } catch (e) {
    throw e;
  }
};

/**
 * 사용자 정보 변경 요청
 *
 * @param {Object} userInfo : 사용자가 변경하기 위해 입력한 정보
 * @param {String} userToken : 사용자 JWT 토큰
 */
export const putUserInfo = async (userInfo, userToken) => {
  try {
    const { userName, password, userPhone, email } = userInfo;

    await axios.put(
      `${process.env.REACT_APP_API_SERVER}/api/auth/member`,
      {
        member_name: userName,
        password: password,
        member_phone: userPhone,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};
