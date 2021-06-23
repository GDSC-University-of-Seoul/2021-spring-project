import CctvTableContainer from "../containers/CctvTableContainer";
import React from "react";

/**
 * `/cctvs` 페이지 렌더링
 *
 * @return {JSX.Element} `/cctvs` 페이지를 구성하는 컴포넌트
 */

function Cctvs() {
  return (
    <>
      <section className="section cctvs">
        <div className="container cctvs-section">
          <CctvTableContainer />
        </div>
      </section>
    </>
  );
}

export default Cctvs;
