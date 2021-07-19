import React, { useEffect, useMemo } from "react";

import { FiExternalLink } from "react-icons/fi";
import TextField from "@material-ui/core/TextField";
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

  useEffect(() => {
    return {
      district,
      cdrCenter,
    };
  }, [district, cdrCenter]);

  return (
    <>
      <h1>지역 정보</h1>
      <hr />
      <div id="select-district">
        {Object.keys(districtCategory).map((key, index) => {
          return (
            <TextField
              key={index}
              className="district-info"
              label={districtCategory[key]}
              value={district.data[key] || ""}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            />
          );
        })}
      </div>
      <h1>어린이집 정보</h1>
      <hr />
      <div id="select-cdrCenter">
        {Object.keys(cdrCenterCategory).map((key, index) => {
          return (
            <TextField
              key={index}
              className="cdrCenter-info"
              label={cdrCenterCategory[key]}
              value={cdrCenter.data[key] || ""}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              disabled
            />
          );
        })}
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
    </>
  );
}
export default MapBoxSelectContainer;
