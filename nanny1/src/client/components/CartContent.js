import "./style/CartContent.css";
import CartItemCell from "./CartItemCell";
const CartContent = ({ cartList }) => {
  const cList = cartList.map(({ productName, price, num, imgSrc }, index) => {
    return (
      <CartItemCell
        key={`${productName} - ${index}`}
        productName={productName}
        price={price}
        num={num}
        imgSrc={imgSrc}
      />
    );
  });
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
