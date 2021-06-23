import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

function CctvModal({ isOpen, setIsOpen }) {
  const qualityItems = ["SD", "HD", "FHD", "QHD", "UHD"];
  const [macValid, setMacValid] = useState(true);

  const changeMacInput = (e, macAddress) => {
    const macRegex = new RegExp(`^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$`);

    macRegex.test(macAddress) ? setMacValid(true) : setMacValid(false);
  };

  const submitCctvForm = (e) => {
    e.preventDefault();

    const targets = e.target;
    let formInfo = {};

    for (let target of targets) {
      if (target.name) formInfo[target.name] = target.value;
    }
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="cctvModal">
          <form className="cctvModal-form" onSubmit={submitCctvForm}>
            <div className="cctvModal-title">어린이집 CCTV 정보 추가/변경</div>
            <TextField
              label="어린이집 명"
              name="center_name"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="어린이집 주소"
              name="center_address"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="설치 장소"
              name="cctv_name"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="MAC 주소"
              name="cctv_mac"
              required
              placeholder="예) 12-34-56-78-0A-BC"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => changeMacInput(e, e.target.value)}
            />
            {!macValid && (
              <div className="cctv_mac-alert">
                유효하지 않은 MAC 주소입니다.
              </div>
            )}
            <FormControl required>
              <InputLabel id="cctv_quality-label">화질</InputLabel>
              <Select
                labelId="cctv_quality-label"
                name="cctv_quality"
                defaultValue={"SD"}
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
            />
            <TextField
              type="date"
              label="제거 일자"
              name="uninstall_date"
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
        </div>
      )}
    </>
  );
}
export default CctvModal;
