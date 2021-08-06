import { FaBell, FaUser } from "react-icons/fa";
import React, { useCallback, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import UpdateLoginForm from "./UpdateLoginForm";
import { useSelector } from "react-redux";

/**
 * 홈페이지 헤더부 구성
 *
 * @param {Object} props history: 리다이렉션을 위한 history 객체
 * @returns {JSX.Element} 홈페이지 헤더부 컴포넌트
 */

function Header({ history }) {
  // 날짜·시간 정보 저장
  const { loginInfo } = useSelector((state) => state.loginReducer);

  const [date, setDate] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false); // 사용자 헤더 메뉴 열기
  const [isChanged, setIsChanged] = useState(false); // 사용자 정보 변경
  const [isLogOut, setIsLogOut] = useState(false); // 사용자 로그아웃

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

  // 헤더 메뉴 닫기
  useEffect(() => {
    const userMenuClick = () => setUserMenuOpen(false);
    window.addEventListener("click", userMenuClick);

    return () => window.removeEventListener("click", userMenuClick);
  }, []);

  // 언마운트 시 history 객체 반환
  useEffect(() => {
    return history;
  }, [history]);

  return (
    <>
      <header>
        <div className="logo" />
        <div className="info">
          <div className="center-info">
            <FaBell className="header-icon" />
          </div>
          <div className="user-info" onClick={(e) => e.stopPropagation()}>
            <FaUser
              className="header-icon"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            />
            {/* 사용자 헤더 메뉴 */}
            {userMenuOpen && (
              <ul className="arrowbox-menu">
                <li>
                  <Link to="/settings">
                    <span>{loginInfo.userName}</span> 님
                  </Link>
                </li>
                <li onClick={() => setIsChanged(true)}>사용자 정보 변경</li>
                <li onClick={() => setIsLogOut(true)}>로그아웃</li>
              </ul>
            )}
          </div>
          <div className="time-info">
            <div>{date && `${date.year}-${date.month}-${date.day}`}</div>
            <div>{date && `${date.hours}:${date.minutes}:${date.seconds}`}</div>
          </div>
        </div>
      </header>
      {/* 사용자 정보 변경 */}
      {isChanged && (
        <UpdateLoginForm
          loginInfo={loginInfo}
          history={history}
          setIsChanged={setIsChanged}
        />
      )}
      {/* 로그아웃 창 */}
      {isLogOut && <LogoutModal history={history} setIsLogOut={setIsLogOut} />}
    </>
  );
}
export default Header;
