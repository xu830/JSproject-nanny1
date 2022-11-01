import "./style/ProductCell.css";
const ProductCell = ({ productName, price, imgSrc, index }) => {
  return (
    <div className="itemContainer">
      <img className="itemimg" src={imgSrc}></img>
      <p className="productName">{productName}</p>
      <p className="price">${price}</p>
      <button className="quickAdd">add</button>
      <button className="editBtn">edit</button>
    </div>
  );
};
export default ProductCell;
