import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signOut, getCart, getProductInfo } from "../actions/index";

import cartImg from "../img/cart.png";
import "./style/HeaderSignout.css";
const HeaderSignOut = ({
  handleLogOut,
  handleCart,
  setCartList,
  totalPrice,
}) => {
  const dispatch = useDispatch();

  const handleSignout = async () => {
    const result = await signOut(dispatch)();
    setCartList();
    handleCart(false);
    handleLogOut(false);
  };

  return (
    <div>
      <button
        className="cartBtn"
        onClick={() => {
          handleCart(true);
        }}
      >
        <img src={cartImg} alt="cart" className="cartBtnimg"></img>
      </button>
      <p className="priceHeader">${totalPrice}</p>
      <button id="signout-btn" onClick={handleSignout}>
        Sign out
      </button>
    </div>
  );
};
export default HeaderSignOut;
