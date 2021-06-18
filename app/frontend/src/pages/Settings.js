import React, { useState } from "react";

import ToggleBtn from "../components/ToggleBtn";

/**
 * `/settings` 페이지 렌더링
 *
 * @return {JSX.Element} `/settings` 페이지를 구성하는 컴포넌트
 */
function Settings() {
  /* 
    Todo : - DB에서 사용자 정보 Fetch
           - Redux에서 관리
  */
  const fetchUser = {
    admin: "이태희",
    userId: "leetaehee0205",
    permission: "시·군·구",
  };
  const [userInfo] = useState(fetchUser);

  return (
    <>
      <section className="section settings">
        <div className="container settings-section">
          <div className="settings-title">모니터링 설정</div>
          <hr />
          <div className="message-control">
            <span className="label">알림 메세지 설정</span>
            <ToggleBtn />
          </div>
          <div className="alarm-control">
            <span className="label">경고음 설정</span>
            <ToggleBtn />
          </div>
        </div>
        <div className="container user-section">
          <div className="settings-title">사용자 설정</div>
          <hr />
          <ul className="userInfo">
            <li>
              <span>관리자</span>
              <input type="text" value={userInfo.admin} disabled />
            </li>
            <li>
              <span>계정명</span>{" "}
              <input type="text" value={userInfo.userId} disabled />
            </li>
            <li>
              <span>사용자 권한</span>
              <input type="text" value={userInfo.permission} disabled />
            </li>
          </ul>
          <div className="user-control">
            <button className="user-modify">사용자 정보 수정</button>
            <button className="user-logout">로그아웃</button>
          </div>
        </div>
      </section>
    </>
  );
}
export default Settings;
