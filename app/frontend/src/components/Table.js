import React from "react";

/**
 * 데이터와 제목(카테고리)에 기반해 표 구성
 *
 * @param {Object} data: 표 데이터, categories: 표 제목, setData: 표 데이터 설정 함수
 * @returns {JSX.Element} 표 컴포넌트
 */
function Table({ data, categories, setData }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {/*표 제목*/}
          <th id="check">
            <input type="checkbox" />
          </th>
          {Object.keys(categories).map((category, index) => (
            <th key={index} id={category}>
              <div id={category}>{categories[category]}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/*표 데이터*/}
        {data.map((element, index) => {
          return (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              {Object.keys(element).map((key, index) => (
                <td key={index}>{element[key]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
