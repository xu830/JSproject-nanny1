import "./style/CartHeader.css";
const CartHeader = ({ handleCart = () => {}, cartList }) => {
  const calcCartNum = () => {
    const num = cartList.reduce((prev, cur) => {
      return Number(prev) + Number(cur.num);
    }, 0);
    console.log(num);
    return num;
  };
  return (
    <div className="cartHeader">
      <p className="cartTitle">Cart</p>
      <p className="cartQuantity">({calcCartNum()})</p>
      <p className="cartCloseBtn" onClick={handleCart}>
        X
      </p>
    </div>
  );
};
export default CartHeader;
