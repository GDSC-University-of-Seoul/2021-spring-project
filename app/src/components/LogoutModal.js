import React, { useCallback } from "react";

import Modal from "./Modal";
import { logOut } from "../modules/login";
import { useDispatch } from "react-redux";

function LogoutModal({ history, setIsLogOut }) {
  const dispatch = useDispatch();

  const logOutHandler = useCallback(() => {
    dispatch(logOut(history));
  }, [dispatch, history]);

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
