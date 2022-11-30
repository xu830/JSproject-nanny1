import "./style/CartItemCell.css";
import { deleteCart } from "../actions/index";
import { useDispatch } from "react-redux";
const CartItemCell = ({
  id,
  productName,
  price,
  num,
  imgSrc,
  handleSetCart,
}) => {
  const dispatch = useDispatch();
  const handleRomove = async (id) => {
    try {
      const result = await deleteCart(dispatch)(id);
      handleSetCart();
    } catch (error) {}
    console.log("onclick");
  };
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
        <p className="removeCart" onClick={() => handleRomove(id)}>
          Remove
        </p>
      </div>
    </div>
  );
};
export default CartItemCell;
