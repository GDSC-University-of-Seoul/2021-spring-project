import React from "react";

function LogTable() {
  /*
   * 어린이집 사건, 사고 발생 정보 임시 데이터
   */
  const logs = [
    {
      space: "가나다어린이집",
      time: "2021-06-06",
      type: "폭행",
      address: "서울특별시 은평구 가나다어린이집",
    },
    {
      space: "ABC어린이집",
      time: "2021-06-06",
      type: "안전사고",
      address: "서울특별시 동대문구 ABC어린이집",
    },
  ];

  return (
    <table className="logTable">
      <thead>
        <tr>
          <th>장소</th>
          <th>시간</th>
          <th>의심 유형</th>
          <th>주소</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => {
          return (
            <tr key={index}>
              <td>{log.space}</td>
              <td>{log.time}</td>
              <td>{log.type}</td>
              <td>{log.address}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default LogTable;
