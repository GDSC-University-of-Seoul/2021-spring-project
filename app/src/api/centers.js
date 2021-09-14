import axios from "axios";

/**
 * 시·군·구에 속한 모든 어린이집 데이터 GET
 *
 * @param {String} sggCode 시·군·구 행정구역 코드
 * @returns 어린이집 데이터
 */
export const getSggCenters = async (sggCode) => {
  try {
    const centerData = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/centers?district_code=${sggCode}`
    );

    return centerData.data;
  } catch (e) {
    throw e;
  }
};

/**
 * 어린이집에 대한 이상행동 정보 GET
 *
 * @param {String} centerId 어린이집 ID
 * @returns 어린이집 이상행동 데이터
 */
export const getCenter = async (centerId) => {
  try {
    const center = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/centers/${centerId}`
    );

    return center.data;
  } catch (e) {
    throw e;
  }
};
