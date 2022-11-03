import { useState } from "react";
import "./style/ProductDetail.css";
const ProductDetail = ({
  productDetailObject,
  handleProductShow,
  setProductShowDetail,
}) => {
  const [plusState, setPlus] = useState(false);
  const [minusState, setMinus] = useState(false);
  const handleAddOnClick = () => {
    setPlus(true);
    setMinus(true);
  };
  return (
    <div className="productDetailContainer">
      <img
        className="itemimgInDetail"
        src={productDetailObject.imgSrc}
        alt="Sorry, image is not available"
      ></img>
      <p className="categoryInDetail">{productDetailObject.category}</p>
      <p className="itemNameInDetail">{productDetailObject.productName}</p>
      <p className="priceInDetail">${productDetailObject.price}</p>
      <div className="oosBox">
        <p className="oosLabel">Out of stock</p>
      </div>
      <p className="descriptionInDetail">
        {productDetailObject.productDescription}
      </p>
      {!plusState && !minusState && (
        <button className="addToCart" onClick={handleAddOnClick}>
          Add To Cart
        </button>
      )}
      {plusState && minusState && (
        <>
          <button>-</button>
          <input type="text" id="quantityInDetail" value="1" />
          <button>+</button>
        </>
      )}
      <button className="editInDetail">Edit</button>
      <button
        onClick={() => {
          handleProductShow(true);
          setProductShowDetail(false);
        }}
        className="BackInDetail"
      >
        Back
      </button>
    </div>
  );
};
export default ProductDetail;
