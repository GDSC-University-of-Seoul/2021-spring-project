import React from "react";
import TablePagination from "./TablePagination";

/**
 * 데이터와 제목(카테고리)에 기반해 표 구성
 *
 * @param {Object} data: 표 데이터, categories: 표 제목, itemId: 표의 기준 속성
 *                 itemCheckHandler: 표 데이터 체크 이벤트 함수, itemClickhandler: 표 데이터 클릭 이벤트 함수
 * @returns {JSX.Element} 표 컴포넌트
 */
function Table({
  data,
  categories,
  itemId,
  itemCheckHandler,
  itemClickHandler,
  checkOpt = true,
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
        data={data}
        categories={categories}
        itemId={itemId}
        checkOpt={checkOpt}
        itemCheckHandler={itemCheckHandler}
        itemClickHandler={itemClickHandler}
      />
    </table>
  );
}
export default Table;
