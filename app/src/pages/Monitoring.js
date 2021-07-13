import MapBoxContainer from "../containers/MapBoxContainer";
import MapBoxSelectContainer from "../containers/MapBoxSelectContainer";
import React from "react";

/**
 * `/monitoring` 페이지 렌더링
 *
 * @return {JSX.Element} `/monitoring` 페이지를 구성하는 컴포넌트
 */
function Monitoring() {
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
