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
  return <div className="scroll">{cList}</div>;
};
export default CartContent;
