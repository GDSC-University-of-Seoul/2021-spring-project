import React from "react";
import SideBar from "../components/SideBar";

/**
 * `/settings` 페이지 렌더링
 *
 * @return {JSX.Element} `/settings` 페이지를 구성하는 컴포넌트
 */
function Settings() {
  return (
    <>
      <SideBar />
      <section className="section">
        <div>설정 페이지</div>
      </section>
    </>
  );
}
export default Settings;
