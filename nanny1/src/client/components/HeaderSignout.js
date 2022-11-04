import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signOut, getCart } from "../actions/index";

import cartImg from "../img/cart.png";
import "./style/HeaderSignout.css";
const HeaderSignOut = ({
  handleLogOut = () => {},
  handleCart,
  setCartList,
  setTotalPrice,
  totalPrice,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const GetCartList = async () => {
      try {
        const cart = await getCart(dispatch)();
        setCartList(cart);
        calcTotal(cart);
      } catch (error) {}
    };
    GetCartList();
  }, []);

  const handleSignout = () => {
    signOut(dispatch)();
    handleCart(false);
    handleLogOut();
  };

  const calcTotal = (cart) => {
    let total = cart.reduce((prev, cur) => {
      return prev + cur.price * cur.num;
    }, 0);
    console.log(total);
    setTotalPrice(total);
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
