import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../components/Modal";
import ToggleBtn from "../components/ToggleBtn";
import { logOut } from "../modules/login";

/**
 * `/settings` 페이지 렌더링
 *
 * @return {JSX.Element} `/settings` 페이지를 구성하는 컴포넌트
 */
function Settings({ history }) {
  const {
    loginInfo: { userId, userName, email },
  } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  const [isLogOut, setIsLogOut] = useState(false);

  const logOutHandler = useCallback(() => {
    dispatch(logOut(history));
  }, [dispatch, history]);

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
            <button className="user-modify">사용자 정보 수정</button>
            <button className="user-logout" onClick={() => setIsLogOut(true)}>
              로그아웃
            </button>
          </div>
        </div>
        {isLogOut && (
          <Modal>
            <div className="logout-checkModal">
              ⚠️ 로그아웃 하시겠습니까?
              <div>
                <button onClick={logOutHandler} className="confirm-btn">
                  확인
                </button>
                <button
                  onClick={() => setIsLogOut(false)}
                  className="cancel-btn"
                >
                  취소
                </button>
              </div>
            </div>
          </Modal>
        )}
      </section>
    </>
  );
}
export default Settings;
