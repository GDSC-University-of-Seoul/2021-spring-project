import React, { useEffect, useMemo } from "react";

import CategoryTextField from "../components/CategoryTextField";
import { FiExternalLink } from "react-icons/fi";
import { urlFormat } from "../utils/format/format";
import { useSelector } from "react-redux";

function MapBoxSelectContainer() {
  const district = useSelector((state) => state.mapboxEventReducer);
  const cdrCenter = useSelector((state) => state.cdrCenterReducer);

  const districtCategory = useMemo(
    () => ({
      sidoName: "도·광역시",
      sggName: "시·군·구",
    }),
    []
  );

  const cdrCenterCategory = useMemo(
    () => ({
      center_name: "어린이집 명",
      zip_code: "우편번호",
      address: "상세주소",
      center_phone: "전화번호",
      fax: "팩스번호",
      operation_type: "어린이집 유형",
      operation_status: "운영 현황",
    }),
    []
  );

  const anomalyCategory = useMemo(
    () => ({
      assault_count: "폭행 건수",
      fight_count: "싸움 건수",
      swoon_count: "실신 건수",
    }),
    []
  );

  useEffect(() => {
    return {
      district,
      cdrCenter,
    };
  }, [district, cdrCenter]);

  // Todo : 리팩토링
  return (
    <>
      <h1>지역 정보</h1>
      <hr />
      <div id="select-district">
        <CategoryTextField
          category={districtCategory}
          data={district.data}
          className="district-info"
        />
      </div>
      <h1>어린이집 정보</h1>
      <hr />
      <div id="select-cdrCenter">
        <CategoryTextField
          category={cdrCenterCategory}
          data={cdrCenter.data}
          className="cdrCenter-info"
        />
        <a
          className="cdrcenter-link"
          href={
            cdrCenter.data.web_page ? urlFormat(cdrCenter.data.web_page) : null
          }
          target="_blank"
          rel="noreferrer"
        >
          어린이집 홈페이지 바로가기 <FiExternalLink />
        </a>
      </div>
      <h1>이상행동 정보</h1>
      <hr />
      <div id="select-anomaly">
        <CategoryTextField
          category={anomalyCategory}
          className="anomaly-info"
        />
      </div>
    </>
  );
}
export default MapBoxSelectContainer;
