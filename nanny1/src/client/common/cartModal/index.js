import React from "react";
import "./index.css";
const CartModal = (props) => {
  return (
    <div className="cartModalContainer">
      <div className="top"> {props.top}</div>
      <div className="content">{props.children}</div>
      <div className="bottom">{props.bottom}</div>
    </div>
  );
};
export default CartModal;
