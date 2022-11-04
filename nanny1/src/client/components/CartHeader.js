import "./style/CartHeader.css";
const CartHeader = ({ handleCart = () => {} }) => {
  return (
    <div className="cartHeader">
      <p className="cartTitle">Cart</p>
      <p className="cartQuantity">(3)</p>
      <p className="cartCloseBtn" onClick={handleCart}>
        X
      </p>
    </div>
  );
};
export default CartHeader;
