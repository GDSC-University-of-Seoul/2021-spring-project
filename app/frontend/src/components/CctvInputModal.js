import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "./Modal";
import React from "react";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

/**
 * CCTV 데이터 입력 모달창
 *
 * @param {Object} macValid: CCTV MAC 주소 유효성, inputData: 변경할 CCTV 데이터,
 *                 submitCctvForm: 모달창 제출 이벤트 처리함수, checkMacInput: CCTV MAC 주소 유효성 검사 함수, closeModal: 모달창 닫기 함수
 * @returns {JSX.Element} CCTV 데이터 입력 모달창
 */
function CctvInputModal({
  macValid,
  inputData,
  submitCctvForm,
  checkMacInput,
  closeModal,
}) {
  const modalTitle = "어린이집 CCTV 정보 추가/변경";
  const qualityItems = ["SD", "HD", "FHD", "QHD", "UHD"];

  return (
    <>
      <Modal title={modalTitle}>
        <form className="cctvModal-form" onSubmit={submitCctvForm}>
          <TextField
            label="어린이집 명"
            name="center_name"
            required
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={inputData ? inputData.center_name : ""}
          />
          <TextField
            label="어린이집 주소"
            name="address"
            required
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={inputData ? inputData.address : ""}
          />
          <TextField
            label="설치 장소"
            name="cctv_name"
            required
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={inputData ? inputData.cctv_name : ""}
          />
          <TextField
            label="MAC 주소"
            name="cctv_mac"
            required
            placeholder="예) 12-34-56-78-0A-BC"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => checkMacInput(e, e.target.value)}
            defaultValue={inputData ? inputData.cctv_mac : ""}
          />
          {!macValid && (
            <div className="cctv_mac-alert">유효하지 않은 MAC 주소입니다.</div>
          )}
          <FormControl required>
            <InputLabel id="cctv_quality-label">화질</InputLabel>
            <Select
              labelId="cctv_quality-label"
              name="quality"
              defaultValue={inputData ? inputData.quality : "SD"}
            >
              {qualityItems.map((item, idx) => (
                <MenuItem key={idx} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type="date"
            label="설치 일자"
            name="install_date"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={inputData ? inputData.install_date : ""}
          />
          <TextField
            type="date"
            label="제거 일자"
            name="uninstall_date"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={inputData ? inputData.uninstall_date : ""}
          />
          <div className="cctvModal-button">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              disabled={!macValid}
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
      </Modal>
    </>
  );
}
export default CctvInputModal;
