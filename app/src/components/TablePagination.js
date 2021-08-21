import React, { useCallback, useState } from "react";

function TablePagination({
  pagination,
  data,
  count,
  itemId,
  categories,
  checkOpt,
  setPagination,
  fetchData,
  itemCheckHandler,
  itemClickHandler,
}) {
  /**
   * listSize : 렌더링할 데이터 개수
   * range : 페이지네이션 번호
   * page : range 내의 순서
   * pageCount : 마지막 페이지네이션 번호
   */
  const { listSize, range, page } = pagination;
  const { pageCount } = count;
  const PAGINATION_SIZE = 10;

  // 페이지네이션 순서 배열 생성
  const [pageNumArr] = useState(() => {
    const start = (range - 1) * PAGINATION_SIZE + 1;
    const end = range * PAGINATION_SIZE;
    const maxVal = pageCount;

    const orderArr = [];
    for (let i = start; i <= Math.min(end, maxVal); i++) orderArr.push(i);

    return orderArr;
  });

  // 페이지 번호 클릭
  const pageNumClick = useCallback(
    (pageNum) => {
      const newPagination = {
        listSize,
        range,
        page: pageNum,
      };

      setPagination(newPagination);
      fetchData(newPagination);
    },
    [fetchData, listSize, range, setPagination]
  );

  // 이전 페이지 번호(<) 클릭
  const prevPageClick = useCallback(() => {
    if (range === 1) return;

    const newPagination = {
      listSize,
      range: range - 1,
      page: 1,
    };

    setPagination(newPagination);
    fetchData(newPagination);
  }, [fetchData, listSize, range, setPagination]);

  // 다음 페이지(>) 클릭
  const nextPageClick = useCallback(() => {
    if (range === parseInt(pageCount / PAGINATION_SIZE) + 1) return;

    const newPagination = {
      listSize,
      range: range + 1,
      page: 1,
    };

    setPagination(newPagination);
    fetchData(newPagination);
  }, [fetchData, listSize, pageCount, range, setPagination]);

  // 첫 페이지(<<) 클릭
  const startPageClick = useCallback(() => {
    const newPagination = {
      listSize,
      range: 1,
      page: 1,
    };

    setPagination(newPagination);
    fetchData(newPagination);
  }, [fetchData, listSize, setPagination]);

  // 마지막 페이지(>>) 클릭
  const endPageClick = useCallback(() => {
    const newPagination = {
      listSize,
      range: parseInt(pageCount / PAGINATION_SIZE) + 1,
      page: pageCount % PAGINATION_SIZE,
    };

    setPagination(newPagination);
    fetchData(newPagination);
  }, [fetchData, listSize, pageCount, setPagination]);

  // 이벤트 전파로 클릭 이벤트 관리
  const clickHandler = useCallback(
    (e) => {
      const id = e.target.id;

      if (id === "startPage") startPageClick();
      else if (id === "prevPage") prevPageClick();
      else if (id === "pageNum") pageNumClick(parseInt(e.target.dataset.id));
      else if (id === "nextPage") nextPageClick();
      else if (id === "endPage") endPageClick();
    },
    [startPageClick, prevPageClick, pageNumClick, nextPageClick, endPageClick]
  );

  return (
    <>
      <tbody onChange={itemCheckHandler} onClick={itemClickHandler}>
        {/* 페이지 데이터 */}
        {data.map((element, index) => {
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
              {pageNumArr.map((num, idx) => (
                <li
                  id="pageNum"
                  data-id={idx + 1}
                  className={idx + 1 === page ? "currentPage" : null}
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
