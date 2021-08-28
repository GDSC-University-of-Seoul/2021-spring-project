import { dateFormat, macApiFormat, macFormat } from "../utils/format";

import axios from "axios";

// CCTV 데이터 형식 설정 (MAC 주소, 날짜)
const cctvDataFormat = (cctvData) => {
  const installDate = new Date(cctvData.install_date);
  const uninstallDate = new Date(cctvData.uninstall_date);

  return {
    ...cctvData,
    cctv_mac: macFormat(cctvData.cctv_mac),
    install_date: dateFormat(installDate),
    uninstall_date: cctvData.uninstall_date ? dateFormat(uninstallDate) : "",
  };
};

/**
 * 주어진 페이지네이션과 검색 조건을 기반으로 모든 CCTV 데이터를 GET
 *
 * @param {Object} pagination - 현재 페이지네이션 {listSize: 페이지를 구성하는 데이터 수, range: 페이지 범위, page: range내에 속한 페이지 번호}
 * @param {Object} searchInfo - 검색 조건 {type: 검색 조건, keyword: 검색어}
 * @returns 모든 CCTV 데이터
 */
export const getCctvs = async (pagination, searchInfo) => {
  const { listSize, range, page } = pagination;
  const { type, keyword } = searchInfo;

  try {
    // CCTV 데이터 Fetch
    let cctvsData = await axios.get(
      `${
        process.env.REACT_APP_API_SERVER
      }/api/cctvs?list_size=${listSize}&range=${range}&page=${page}${
        keyword !== "" ? `&type=${type}&keyword=${keyword}` : ""
      }`
    );

    // CCTV 데이터 형식 설정
    cctvsData.data.rows = cctvsData.data.rows.map((cctvData) =>
      cctvDataFormat(cctvData)
    );

    return cctvsData.data;
  } catch (e) {
    throw e;
  }
};

/**
 * CCTV 데이터를 추가(POST), 이후 새롭게 갱신된 CCTV 데이터를 GET하여 return
 *
 * @param {Object} createInfo - 새롭게 추가할 CCTV 정보
 * @param {Object} pagination - 현재 페이지네이션 {listSize: 페이지를 구성하는 데이터 수, range: 페이지 범위, page: range내에 속한 페이지 번호}
 * @param {Object} searchInfo - 검색 조건 {type: 검색 조건, keyword: 검색어}
 * @returns 새롭게 갱신된 CCTV 데이터
 */
export const postCctv = async (createInfo, pagination, searchInfo) => {
  try {
    // CCTV 데이터 추가
    await axios.post(`${process.env.REACT_APP_API_SERVER}/api/cctvs`, {
      ...createInfo,
      cctv_mac: macApiFormat(createInfo.cctv_mac),
    });

    // 새롭게 갱신된 CCTV 데이터
    return await getCctvs(pagination, searchInfo);
  } catch (e) {
    throw e;
  }
};

/**
 * CCTV 데이터를 변경(PUT), 이후 새롭게 갱신된 CCTV 데이터를 GET하여 return
 *
 * @param {Object} updateInfo - 새롭게 변경할 CCTV 정보
 * @param {Object} pagination - 현재 페이지네이션 {listSize: 페이지를 구성하는 데이터 수, range: 페이지 범위, page: range내에 속한 페이지 번호}
 * @param {Object} searchInfo - 검색 조건 {type: 검색 조건, keyword: 검색어}
 * @returns 새롭게 갱신된 CCTV 데이터
 */
export const putCctv = async (updateInfo, pagination, searchInfo) => {
  try {
    // 기존 CCTV 데이터 변경
    await axios.put(
      `${process.env.REACT_APP_API_SERVER}/api/cctvs/${macApiFormat(
        updateInfo.cctv_mac
      )}`,
      updateInfo
    );

    // 새롭게 갱신된 CCTV 데이터
    return await getCctvs(pagination, searchInfo);
  } catch (e) {
    throw e;
  }
};

/**
 * CCTV 데이터들을 삭제(DELETE), 이후 새롭게 갱신된 CCTV 데이터를 GET하여 return
 *
 * @param {Array} deleteInfo - 삭제할 CCTV 정보
 * @param {Object} pagination - 현재 페이지네이션 {listSize: 페이지를 구성하는 데이터 수, range: 페이지 범위, page: range내에 속한 페이지 번호}
 * @param {Object} searchInfo - 검색 조건 {type: 검색 조건, keyword: 검색어}
 * @returns 새롭게 갱신된 CCTV 데이터
 */
export const deleteCctvs = async (deleteInfo, pagination, searchInfo) => {
  try {
    // CCTV 데이터들 삭제
    for (const data of deleteInfo) {
      await axios.delete(
        `${process.env.REACT_APP_API_SERVER}/api/cctvs/${macApiFormat(
          data.cctv_mac
        )}`
      );
    }

    // 새롭게 갱신된 CCTV 데이터
    return await getCctvs(pagination, searchInfo);
  } catch (e) {
    throw e;
  }
};
