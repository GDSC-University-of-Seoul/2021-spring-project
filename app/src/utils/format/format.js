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

// 날짜 Formatting (yyyy-mm-dd)
export const dateFormat = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? "0" + String(month) : month}-${
    day < 10 ? "0" + String(day) : day
  }`;
};
