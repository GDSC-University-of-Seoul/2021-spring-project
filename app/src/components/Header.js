import { FaBell, FaUser } from "react-icons/fa";
import React, { useCallback, useEffect, useState } from "react";

/**
 * 홈페이지 헤더부 구성
 *
 * @returns {JSX.Element} 홈페이지 헤더부 컴포넌트
 */

function Header() {
  // 날짜·시간 정보 저장
  const [date, setDate] = useState(null);

  // 날짜·시간 포맷팅 (yyyy-mm-dd hh:mm:ss)
  const format = useCallback((timeInfo) => {
    Object.keys(timeInfo).forEach((key) => {
      timeInfo[key] =
        timeInfo[key] < 10
          ? "0" + String(timeInfo[key])
          : String(timeInfo[key]);
    });
    return timeInfo;
  }, []);

  //  날짜·시간 표기 함수 (1초 마다 비동기 처리)
  useEffect(() => {
    const getTime = setInterval(() => {
      const time = new Date();
      const timeInfo = {
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        day: time.getDate(),
        hours: time.getHours(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds(),
      };
      setDate(format(timeInfo));
    }, 1000);

    return () => clearInterval(getTime);
  });

  return (
    <header>
      <div className="logo" />
      <div className="info">
        <div className="center-info">
          <FaBell />
        </div>
        <div className="user-info">
          <FaUser />
        </div>
        <div className="time-info">
          <div>{date && `${date.year}-${date.month}-${date.day}`}</div>
          <div>{date && `${date.hours}:${date.minutes}:${date.seconds}`}</div>
        </div>
      </div>
    </header>
  );
}
export default Header;
