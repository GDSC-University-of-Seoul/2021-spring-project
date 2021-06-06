import ChartContainer from "../containers/ChartContainer";
import React from "react";
import SideBar from "../components/SideBar";

/**
 * `/` 페이지 렌더링
 *
 * @return {JSX.Element} `/` 페이지를 구성하는 컴포넌트
 */
function Home() {
  return (
    <>
      <SideBar />
      <section className="section home">
        <div className="container header">
          <div className="header-item">
            <div>어린이집 사건</div>
            <div>0 건</div>
          </div>
          <div className="header-item">
            <div>어린이집 안전사고</div>
            <div>0 건</div>
          </div>
          <div className="header-item">
            <div>신규 어린이집 수</div>
            <div>0 개</div>
          </div>
          <div className="header-item">
            <div>총 어린이집 수</div>
            <div>0 개</div>
          </div>
        </div>
        <div className="container chart-section">
          <div className="chart-title">
            특별시·광역시 어린이집 사건·사고 발생 건수
          </div>
          <ChartContainer sido={"시"} />
        </div>
        <div className="container chart-section">
          <div className="chart-title">도 어린이집 사건·사고 발생 건수</div>
          <ChartContainer sido={"도"} />
        </div>
        <div className="container log-section" />
      </section>
    </>
  );
}

export default Home;
