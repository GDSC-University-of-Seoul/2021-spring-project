import React from "react";
import SideBar from "../components/SideBar";

/**
 * `/settings` 페이지 렌더링
 *
 * @return {JSX.Element} `/settings` 페이지를 구성하는 컴포넌트
 */
function Logs() {
  return (
    <>
      <SideBar />
      <section className="section">
        <div>로그 페이지</div>
      </section>
    </>
  );
}
export default Logs;
