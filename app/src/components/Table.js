import React from "react";
import TablePagination from "./TablePagination";

/**
 * 데이터와 제목(카테고리)에 기반해 표 구성
 *
 * @param {Object} - pagination: 현재 페이지네이션 정보, data: 표 데이터, count: 전체 페이지네이션 정보, categories: 표 범주,
 *                   itemId: 표의 기준 속성, searchInfo : 검색 옵션 checkOpt : 체크박스 표현 옵션,
 *                   setPagination: 페이지네이션 설정 함수, fetchData: 페이지네이션 기반 데이터 Fetch 함수,
 *                   itemCheckHandler: 표 데이터 체크 이벤트 함수, itemClickhandler: 표 데이터 클릭 이벤트 함수,
 *
 * @returns {JSX.Element} 표 컴포넌트
 */
function Table({
  pagination,
  data,
  count,
  categories,
  itemId,
  searchInfo,
  checkOpt = true,
  setPagination,
  fetchData,
  itemCheckHandler,
  itemClickHandler,
}) {
  return (
    <table className="table">
      <thead>
        <tr>
          {/*표 제목*/}
          <th id="check"></th>
          {Object.keys(categories).map((category, index) => (
            <th key={index} id={category}>
              <div id={category}>{categories[category]}</div>
            </th>
          ))}
        </tr>
      </thead>

      {/*표 데이터*/}
      <TablePagination
        pagination={pagination}
        data={data}
        count={count}
        categories={categories}
        itemId={itemId}
        searchInfo={searchInfo}
        checkOpt={checkOpt}
        setPagination={setPagination}
        fetchData={fetchData}
        itemCheckHandler={itemCheckHandler}
        itemClickHandler={itemClickHandler}
      />
    </table>
  );
}
export default Table;
