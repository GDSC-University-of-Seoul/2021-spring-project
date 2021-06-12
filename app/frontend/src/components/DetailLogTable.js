import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import React, { useCallback, useState } from "react";

function DetailLogTable() {
  /*
   * 어린이집 사건, 사고 발생 정보 임시 데이터
   */
  const initialLogs = [
    {
      cdCenter: "가나다어린이집",
      time: "2021-06-06 12:30",
      type: "안전사고",
      sido: "서울특별시",
      sgg: "은평구",
      address: "서울특별시 은평구 가나다어린이집",
    },
    {
      cdCenter: "ABC어린이집",
      time: "2021-06-06 11:00",
      type: "폭행",
      sido: "서울특별시",
      sgg: "동대문구",
      address: "서울특별시 동대문구 ABC어린이집",
    },
    {
      cdCenter: "123어린이집",
      time: "2021-06-12 10:00",
      type: "안전사고",
      sido: "대전광역시",
      sgg: "서구",
      address: "대전광역시 서구 ABC어린이집",
    },
  ];
  const categories = {
    cdCenter: "발생 장소",
    time: "발생 시간",
    type: "의심 유형",
    sido: "도·광역시",
    sgg: "시·군·구",
    address: "상세주소",
  };

  const initialToggle = {
    cdCenter: null,
    time: null,
    type: null,
    sido: null,
    sgg: null,
    address: null,
  };
  const [logs, setLogs] = useState(initialLogs);
  const [toggle, setToggle] = useState(initialToggle);

  const sortTable = useCallback(
    (e) => {
      const standard = e.target.id;

      setToggle({
        [standard]: !toggle[standard],
      });

      switch (standard) {
        case "cdCenter":
        case "time":
        case "type":
        case "sido":
        case "sgg":
        case "address":
          setLogs(
            logs
              .slice(0)
              .sort((a, b) =>
                a[standard] > b[standard]
                  ? 1 * (toggle[standard] ? 1 : -1)
                  : a[standard] < b[standard]
                  ? -1 * (toggle[standard] ? 1 : -1)
                  : 0
              )
          );
          break;
        default:
          break;
      }
    },
    [logs, toggle]
  );

  return (
    <table className="logTable">
      <thead>
        <tr onClick={sortTable}>
          <th id="num"></th>
          {Object.keys(categories).map((category, index) => (
            <th key={index} id={category}>
              <div id={category}>
                {categories[category]}
                {toggle[category] === true && <BsArrowDown />}
                {toggle[category] === false && <BsArrowUp />}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => {
          return (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{log.cdCenter}</td>
              <td>{log.time}</td>
              <td>{log.type}</td>
              <td>{log.sido}</td>
              <td>{log.sgg}</td>
              <td>{log.address}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default DetailLogTable;
