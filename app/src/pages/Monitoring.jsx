import React, { useEffect } from "react";

import MapBoxContainer from "@components/Monitoring/MapBoxContainer";
import MapBoxSelectContainer from "@components/Monitoring/MapBoxSelectContainer";
import { getLoginCookie } from "@modules/login";
import { useDispatch } from "react-redux";

/**
 * `/monitoring` 페이지 렌더링
 *
 * @return {JSX.Element} `/monitoring` 페이지를 구성하는 컴포넌트
 */
function Monitoring() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 유저 정보 확인
    dispatch(getLoginCookie());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section className="section monitoring">
        <div className="container map-section">
          <MapBoxContainer />
        </div>
        <div className="container select-section">
          <MapBoxSelectContainer />
        </div>
      </section>
    </>
  );
}
export default Monitoring;
