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
  const num = 1;
  return (
    <div className="productDetailContainer">
      <div className="Dleft">
        <img
          className="itemimgInDetail"
          src={productDetailObject.imgSrc}
          alt="Sorry, image is not available"
        ></img>
      </div>

      <div className="Dright">
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
          <div className="plusMinus">
            <button id="minus">-</button>
            <input
              type="text"
              id="quantityInDetail"
              value={num}
              onChange={(event) => {
                num = event.target.value;
              }}
            />
            <button id="plus">+</button>
          </div>
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
    </div>
  );
};
export default ProductDetail;
