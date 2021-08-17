import React, { useState } from "react";

import Switch from "@material-ui/core/Switch";

/**
 * `/settings`의 설정 on-off 용 토글 버튼
 *
 * @returns {JSX.Element} 토글 버튼 컴포넌트
 */

function ToggleBtn({ state, trigger }) {
  const [toggle, setToggle] = useState(state || false);

  const handleChange = () => {
    setToggle(!toggle);

    if (trigger) trigger();
  };

  return <Switch checked={toggle} onChange={handleChange} color="primary" />;
}

export default ToggleBtn;
