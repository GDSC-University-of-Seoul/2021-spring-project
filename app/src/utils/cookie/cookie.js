/**
 * 쿠키 생성
 *
 * @param {String} name 쿠키 이름
 * @param {any} value 쿠키에 저장할 값
 * @param {Number} exp 만료 기간(시)
 */
export const setCookie = (name, value, exp) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
};

/**
 * 쿠키에 저장된 value 획득
 *
 * @param {String} name 쿠키 이름
 * @returns 쿠키에 저장된 value
 */
export const getCookie = (name) => {
  const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");

  return value ? value[2] : null;
};

/**
 * 쿠키 삭제
 *
 * @param {String} name 쿠키 이름
 */
export const deleteCookie = (name) => {
  let date = new Date(0);

  document.cookie = name + "=;expires=" + date.toUTCString();
};
