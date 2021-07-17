// MAC 주소 Formatting (ABCD -> AB-CD)
export const macFormat = (macString) => {
  let macAddress = [];

  for (let i = 0; i < macString.length; i += 2) {
    macAddress.push(macString.substr(i, 2));
  }
  return macAddress.join("-");
};

// MAC 주소 Formatting (AB-CD -> ABCD)
export const macApiFormat = (macAddress) => macAddress.split("-").join("");

const decimalFormat = (time) => {
  return time < 10 ? "0" + String(time) : time;
};

// 날짜 Formatting (yyyy-mm-dd)
export const dateFormat = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${decimalFormat(month)}-${decimalFormat(day)}`;
};

// 시간 Formatting (hh:mm:ss)
export const timeFormat = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${decimalFormat(hours)}:${decimalFormat(minutes)}:${decimalFormat(
    seconds
  )}`;
};

// UTC 날짜 Formatting (yyyy-mm-dd)
export const dateUTCFormat = (date) => {
  const utcYear = date.getUTCFullYear();
  const utcMonth = date.getUTCMonth() + 1;
  const utcDay = date.getUTCDate();

  return `${utcYear}-${decimalFormat(utcMonth)}-${decimalFormat(utcDay)}`;
};

// UTC 시간 Formatting (hh:mm:ss)
export const timeUTCFormat = (date) => {
  const utcHours = date.getUTCHours();
  const utcMinutes = date.getUTCMinutes();
  const utcSeconds = date.getUTCSeconds();

  return `${decimalFormat(utcHours)}:${decimalFormat(
    utcMinutes
  )}:${decimalFormat(utcSeconds)}`;
};
