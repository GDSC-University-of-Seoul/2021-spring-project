import { Button, TextField } from "@material-ui/core";

import Modal from "./Modal";
import React from "react";

function UpdateLoginForm({ loginInfo, history, setIsChanged }) {
  return (
    <Modal title="사용자 정보 변경">
      <form className="updateLogin-form">
        <TextField
          label="계정 ID"
          id="userId"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={loginInfo.userId}
          disabled
        />
        <TextField
          label="관리자"
          id="userId"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={loginInfo.userName}
        />
        <TextField
          label="변경할 비밀번호"
          id="userPw"
          type="password"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="비밀번호 확인"
          id="userPw2"
          type="password"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="관리자 이메일"
          id="userEmail"
          type="email"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={loginInfo.email}
        />
        <div className="updateUserForm-button">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            변경
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={() => setIsChanged(false)}
          >
            취소
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default UpdateLoginForm;
