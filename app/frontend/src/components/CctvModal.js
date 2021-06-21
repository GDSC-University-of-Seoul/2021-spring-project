import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

function CctvModal({ isOpen, setIsOpen }) {
  const qualityItems = ["SD", "HD", "FHD", "QHD", "UHD"];
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
              data-id="center_address"
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
            <FormControl required>
              <InputLabel id="cctv_quality-label">화질</InputLabel>
              <Select
                labelId="cctv_quality-label"
                data-id="cctv_quality"
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
