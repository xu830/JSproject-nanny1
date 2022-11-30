import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./style/CartContent.css";
import CartItemCell from "./CartItemCell";
import { getCart, getProductInfo } from "../actions/index";

const CartContent = ({ cartList, handleSetCart }) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const GetCartList = async () => {
  //     try {
  //       const cart = await getCart(dispatch)();
  //       const cartlist = await Promise.all(
  //         cart.map(async (ele) => {
  //           const info = await getProductInfo(dispatch)(ele.id);
  //           // console.log("info", info);
  //           const product = {
  //             ...ele,
  //             productName: info.productName,
  //             price: info.price,
  //             imgSrc: info.imgSrc,
  //           };
  //           return product;
  //         })
  //       );
  //       setCartList(cartlist);
  //     } catch (error) {}
  //   };
  //   GetCartList();
  // }, []);

  const cList = cartList.map(
    ({ id, productName, price, num, imgSrc }, index) => {
      return (
        <CartItemCell
          key={`${productName} - ${index}`}
          productName={productName}
          price={price}
          num={num}
          imgSrc={imgSrc}
          id={id}
          handleSetCart={handleSetCart}
        />
      );
    }
  );
  return (
    <div>
      <div className="scroll">{cList}</div>
      <div className="couponSection">
        <p id="couponLabel">Apply Discount Code</p>
        <input id="couponInput"></input>
        <button id="applyBtn">Apply</button>
      </div>
    </div>
  );
};
export default CartContent;
