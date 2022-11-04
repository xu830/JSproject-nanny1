import "./style/CartHeader.css";
const CartHeader = () => {
  return (
    <div className="cartHeader">
      <p className="cartTitle">Cart</p>
      <p className="cartQuantity">(3)</p>
      <p className="cartCloseBtn">X</p>
    </div>
  );
};
export default CartHeader;
