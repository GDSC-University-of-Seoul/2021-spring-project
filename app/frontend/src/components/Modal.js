import React from "react";

function Modal({ title, children }) {
  return (
    <div className="modal">
      <div className="modal-section">
        <div className="modal-title">{title}</div>
        {children}
      </div>
    </div>
  );
}
export default Modal;
