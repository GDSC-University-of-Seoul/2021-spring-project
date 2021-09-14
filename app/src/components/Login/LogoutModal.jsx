import React, { useCallback } from "react";

import Modal from "@components/Modal";
import { logOut } from "@modules/login";
import { useDispatch } from "react-redux";

/**
 * 로그아웃 알림 모달창
 *
 * @param {Object} props setIsLogOut: 모달창을 닫기 위한 useState의 상태 변경 callback
 * @returns {HTMLElement} 로그아웃 알림 모달창
 */
function LogoutModal({ setIsLogOut }) {
  const dispatch = useDispatch();

  // 로그아웃
  const logOutHandler = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  return (
    <Modal>
      <div className="logout-checkModal">
        ⚠️ 로그아웃 하시겠습니까?
        <div>
          <button onClick={logOutHandler} className="confirm-btn">
            확인
          </button>
          <button onClick={() => setIsLogOut(false)} className="cancel-btn">
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}
export default LogoutModal;
