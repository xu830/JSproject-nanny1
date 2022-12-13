import React from "react";
import "./index.css";

const MyModal = (props) => {
  return (
    <div className="ModalBackground">
      <div className="ModalContainer">
        <div className="title">
          <button className="McloseBtn" onClick={() => props.closeModal(false)}>
            X
          </button>
          <p className="titleP">{props.titleText}</p>
        </div>
        {props.children}
      </div>
    </div>
  );
};
export default MyModal;
