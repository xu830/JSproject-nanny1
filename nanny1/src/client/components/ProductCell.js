import { useState } from "react";
import "./style/ProductCell.css";
const ProductCell = ({
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
    <div
      className="itemContainer"
      onClick={() => {
        handleProductShow(false);
        setProductShowDetail(true);
        setProductDetail({
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
      <button className="quickAdd">add</button>
      <button className="editBtn">edit</button>
    </div>
  );
};
export default ProductCell;
