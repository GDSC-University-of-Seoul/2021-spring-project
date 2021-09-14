import axios from "axios";

// 모든 행정 구역 geojson 데이터 GET
export const getDistrictsGeojson = async () => {
  try {
    const dGeojson = await axios.get("/src/assets/data/KoreaDistrict.geojson");

    return dGeojson.data;
  } catch (e) {
    throw e;
  }
};

// 도·광역시 행정 구역에 대한 데이터 GET
export const getSidoData = async () => {
  try {
    const sidoData = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/districts`
    );

    return sidoData.data;
  } catch (e) {
    throw e;
  }
};

/**
 * 도·광역시 행정 구역에 속해있는 시·군·구 행정 구역에 대한 데이터 GET
 *
 * @param {String} sidoCode 도·광역시 행정 구역 코드
 * @returns 시·군·구 행정 구역에 대한 데이터
 */
export const getSggData = async (sidoCode) => {
  try {
    const sggData = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/api/districts?parent_code=${sidoCode}`
    );

    return sggData.data;
  } catch (e) {
    throw e;
  }
};
