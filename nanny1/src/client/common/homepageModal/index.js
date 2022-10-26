import React from "react";
import "./index.css";

const HomeModal = (props) => {
  return (
    <div className="HomeModalBackground">
      <div className="HomeModalContainer">
        <div className="Hometitle">
          <p>{props.titleText}</p>
        </div>
        {props.children}
      </div>
    </div>
  );
};
export default HomeModal;
