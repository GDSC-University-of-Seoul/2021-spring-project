import MapBoxContainer from "../containers/MapBoxContainer";
import React from "react";
import SideBar from "../components/SideBar";

/**
 * `/monitoring` 페이지 렌더링
 *
 * @return {JSX.Element} `/monitoring` 페이지를 구성하는 컴포넌트
 */
function Monitoring() {
  return (
    <>
      <SideBar />
      <section className="section">
        <MapBoxContainer />
      </section>
    </>
  );
}
export default Monitoring;
