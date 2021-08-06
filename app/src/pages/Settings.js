import React, { useState } from "react";

import LogoutModal from "../components/LogoutModal";
import ToggleBtn from "../components/ToggleBtn";
import UpdateLoginForm from "../components/UpdateLoginForm";
import { useSelector } from "react-redux";

/**
 * `/settings` 페이지 렌더링
 *
 * @return {JSX.Element} `/settings` 페이지를 구성하는 컴포넌트
 */
function Settings({ history }) {
  const { loginInfo } = useSelector((state) => state.loginReducer);
  const { userId, userName, email } = loginInfo;

  const [isChanged, setIsChanged] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false);

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
              <input type="text" value={userName} disabled />
            </li>
            <li>
              <span>계정 ID</span> <input type="text" value={userId} disabled />
            </li>
            <li>
              <span>관리자 이메일</span>
              <input type="text" value={email} disabled />
            </li>
          </ul>
          <div className="user-control">
            <button className="user-modify" onClick={() => setIsChanged(true)}>
              사용자 정보 변경
            </button>
            <button className="user-logout" onClick={() => setIsLogOut(true)}>
              로그아웃
            </button>
          </div>
        </div>
        {isChanged && (
          <UpdateLoginForm
            loginInfo={loginInfo}
            history={history}
            setIsChanged={setIsChanged}
          />
        )}
        {isLogOut && (
          <LogoutModal history={history} setIsLogOut={setIsLogOut} />
        )}
      </section>
    </>
  );
}
export default Settings;
