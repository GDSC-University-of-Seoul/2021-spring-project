import React, { useCallback, useEffect, useState } from "react";

import useOrderArray from "../hooks/useOrderArray";

function TablePagination({
  data,
  itemId,
  categories,
  checkOpt,
  itemCheckHandler,
  itemClickHandler,
}) {
  const PAGE_DATA_CNT = 20; // 한 페이지에 보여줄 데이터 수
  const PAGE_CNT = 10; // 출력할 페이지네이션 번호 개수
  const END_PAGE_NUM = Math.ceil(data.length / PAGE_DATA_CNT); // 마지막 페이지네이션 번호

  const [pageNumArr, setPageNumArr] = useOrderArray(
    1,
    END_PAGE_NUM < PAGE_CNT ? END_PAGE_NUM : PAGE_CNT
  );
  const [currPageNum, setCurrPageNum] = useState(1); // 현재 페이지 번호
  const [pageData, setPageData] = useState(data.slice(0, PAGE_DATA_CNT)); // 페이지 번호에 대한 데이터

  // 페이지 번호 클릭
  const pageNumClick = useCallback(
    (pageNum) => {
      // 현재 페이지 번호 변경
      setCurrPageNum(pageNum);

      // 현재 페이지 번호에 따라 데이터 변경
      setPageData(
        data.slice((pageNum - 1) * PAGE_DATA_CNT, pageNum * PAGE_DATA_CNT)
      );
    },
    [data]
  );

  useEffect(() => [pageData, pageNumArr]);

  // 이전 페이지 번호(<) 클릭
  const prevPageClick = useCallback(() => {
    // 이전 페이지 번호의 첫 페이지 번호 찾기
    const pageStartNum = (parseInt(currPageNum / PAGE_CNT) - 1) * PAGE_CNT + 1;

    // 첫 페이지 번호를 벗어나면 무시
    if (pageStartNum < 0) return;

    setPageNumArr(pageStartNum, pageStartNum - 1 + PAGE_CNT);
    pageNumClick(pageStartNum);
  }, [currPageNum, pageNumClick, setPageNumArr]);

  // 다음 페이지(>) 클릭
  const nextPageClick = useCallback(() => {
    // 다음 페이지 번호의 첫 페이지 번호 찾기
    const pageStartNum =
      parseInt((currPageNum - 1) / PAGE_CNT + 1) * PAGE_CNT + 1;

    // 마지막 페이지 번호를 벗어나면 무시
    if (pageStartNum > END_PAGE_NUM) return;

    const pageEndNum = pageStartNum - 1 + PAGE_CNT;
    if (pageStartNum < END_PAGE_NUM) setPageNumArr(pageStartNum, pageEndNum);
    else setPageNumArr(pageStartNum, END_PAGE_NUM);

    pageNumClick(pageStartNum);
  }, [END_PAGE_NUM, currPageNum, pageNumClick, setPageNumArr]);

  // 첫 페이지(<<) 클릭
  const startPageClick = useCallback(() => {
    setPageNumArr(1, END_PAGE_NUM < PAGE_CNT ? END_PAGE_NUM : PAGE_CNT);
    pageNumClick(1);
  }, [setPageNumArr, END_PAGE_NUM, pageNumClick]);

  // 마지막 페이지(>>) 클릭
  const endPageClick = useCallback(() => {
    const endPageStart = parseInt((END_PAGE_NUM - 1) / PAGE_CNT) * PAGE_CNT + 1;

    setPageNumArr(endPageStart, END_PAGE_NUM);
    pageNumClick(END_PAGE_NUM);
  }, [END_PAGE_NUM, pageNumClick, setPageNumArr]);

  // 이벤트 전파로 클릭 이벤트 관리
  const clickHandler = useCallback(
    (e) => {
      const id = e.target.id;

      if (id === "startPage") startPageClick();
      else if (id === "prevPage") prevPageClick();
      else if (id === "pageNum") pageNumClick(e.target.dataset.id);
      else if (id === "nextPage") nextPageClick();
      else if (id === "endPage") endPageClick();
    },
    [startPageClick, prevPageClick, pageNumClick, nextPageClick, endPageClick]
  );

  return (
    <>
      <tbody onChange={itemCheckHandler} onClick={itemClickHandler}>
        {/* 페이지 데이터 */}
        {pageData.map((element, index) => {
          return (
            <tr key={index} data-id={element[itemId]}>
              <td onClick={(e) => e.stopPropagation()}>
                {checkOpt && <input type="checkbox" key={element[itemId]} />}
              </td>
              {Object.keys(categories).map((category, index) => (
                <td key={index}>{element[category]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
      {/* 페이지 넘버링 네비게이션 */}
      <tfoot className="tablePagination">
        <tr onClick={clickHandler}>
          <td colSpan="100%">
            <ul>
              <li id="startPage">{"<<"}</li>
              <li id="prevPage">{"<"}</li>
              {pageNumArr.map((num) => (
                <li
                  id="pageNum"
                  className={num === currPageNum ? "currentPage" : ""}
                  data-id={num}
                  key={num}
                >
                  {num}
                </li>
              ))}
              <li id="nextPage">{">"}</li>
              <li id="endPage">{">>"}</li>
            </ul>
          </td>
        </tr>
      </tfoot>
    </>
  );
}
export default TablePagination;
