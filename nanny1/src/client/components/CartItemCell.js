import "./style/CartItemCell.css";
const CartItemCell = ({ productName, price, num, imgSrc }) => {
  const handleRomove = () => {};
  return (
    <div className="cartCell">
      <div className="leftC">
        <img className="cartImg" src={imgSrc} alt="image not availabe"></img>
      </div>
      <div className="centerC">
        <p className="pNameCart">{productName}</p>
        <p className="pNumCart">{num}</p>
      </div>
      <div className="rightC">
        <p className="pPriceCart">${price}</p>
        <p className="removeCart" onClick={handleRomove}>
          Remove
        </p>
      </div>
    </div>
  );
};
export default CartItemCell;
