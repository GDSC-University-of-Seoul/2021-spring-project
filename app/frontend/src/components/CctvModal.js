import Button from "@material-ui/core/Button";
import React from "react";
import TextField from "@material-ui/core/TextField";

function CctvModal({ isOpen, setIsOpen }) {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      {isOpen && (
        <div className="cctvModal" onClick={closeModal}>
          <form className="cctvModal-form" onClick={(e) => e.stopPropagation()}>
            <div className="cctvModal-title">어린이집 CCTV 정보 추가/변경</div>
            <TextField
              label="어린이집 명"
              data-id="center_name"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="어린이집 주소"
              data-id="address"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="설치 장소"
              data-id="cctv_name"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="MAC 주소"
              data-id="cctv_mac"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="화질"
              data-id="quality"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="date"
              label="설치 일자"
              data-id="install_date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="date"
              label="제거 일자"
              data-id="uninstall_date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className="cctvModal-button">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
              >
                확인
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={closeModal}
                disableElevation
              >
                취소
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
export default CctvModal;
