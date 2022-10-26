import { useDispatch } from "react-redux";
import "./style/ProductCell.css";
const ProductCell = ({
  productName,
  productDescription,
  category,
  price,
  inStock,
  imgSrc,
  index,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="itemContainer" id={`${productName}-${index}`}>
      <img className="itemimg" src={imgSrc}></img>
      <p className="productName">{productName}</p>
      <p className="price">{price}</p>
      <button className="editBtn">edit</button>
    </div>
  );
};
export default ProductCell;
