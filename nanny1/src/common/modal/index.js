import React, { useState } from "react";
import index from "./index.css";

const MyModal = (props) => {
  return (
    <div className="ModalBackground">
      <div className="ModalContainer">
        <div className="title">
          <button id="closeBtn" onClick={() => props.closeModal(false)}>
            X
          </button>
          <p>{props.titleText}</p>
        </div>
        {props.children}
      </div>
    </div>
  );
};
export default MyModal;
