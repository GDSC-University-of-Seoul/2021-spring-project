import React, { useState } from "react";

import Switch from "@material-ui/core/Switch";

/**
 * `/settings`의 설정 on-off 용 토글 버튼
 *
 * @returns {JSX.Element} 토글 버튼 컴포넌트
 */

function ToggleBtn() {
  const [toggle, setToggle] = useState(true);

  const handleChange = () => {
    setToggle(!toggle);
  };

  return <Switch checked={toggle} onChange={handleChange} color="primary" />;
}

export default ToggleBtn;
