import { useState } from "react";
import "./style/ProductCell.css";
const ProductCell = ({
  id,
  productName,
  price,
  imgSrc,
  productDescription,
  category,
  inStock,
  index,
  handleProductShow,
  setProductShowDetail,
  setProductDetail,
}) => {
  return (
    <div className="itemContainer">
      <div
        className="productInfo"
        onClick={() => {
          handleProductShow(false);
          setProductShowDetail(true);
          setProductDetail({
            id: id,
            productName: productName,
            price: price,
            imgSrc: imgSrc,
            productDescription: productDescription,
            category: category,
            inStock: inStock,
          });
        }}
      >
        <img className="itemimg" src={imgSrc}></img>
        <p className="productName">{productName}</p>
        <p className="price">${price}</p>
      </div>
      <div className="productBtn">
        <button className="quickAdd">add</button>
        <button className="editBtn">edit</button>
      </div>
    </div>
  );
};
export default ProductCell;
