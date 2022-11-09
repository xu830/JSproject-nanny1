import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../actions/index";
import "./style/ProductDetail.css";
const ProductDetail = ({
  productDetailObject,
  handleProductShow,
  setProductShowDetail,
  setTotalPrice,
  totalPrice,
}) => {
  const [plusState, setPlus] = useState(false);
  const [minusState, setMinus] = useState(false);
  const [numState, setNum] = useState(1);

  const dispatch = useDispatch();

  const handleAddtoCart = async (productDetailObject) => {
    try {
      console.log(
        productDetailObject.id,
        productDetailObject.productName,
        productDetailObject.price,
        numState,
        productDetailObject.imgSrc
      );
      const resp = await addCart(dispatch)(
        productDetailObject.id,
        productDetailObject.productName,
        productDetailObject.price,
        numState,
        productDetailObject.imgSrc
      );
    } catch (error) {
      console.log(error, "when add to cart");
    }
  };

  const handleAddOnClick = () => {
    setPlus(true);
    setMinus(true);
    setTotalPrice(totalPrice + productDetailObject.price);
    handleAddtoCart(productDetailObject);
  };
  const oosFlag = () => {
    if (productDetailObject.inStock > 0) {
      return false;
    } else {
      return true;
    }
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
        {oosFlag() && (
          <div className="oosBox">
            <p className="oosLabel">Out of stock</p>
          </div>
        )}
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
              value={numState}
              onChange={(event) => {
                setNum(event.target.value);
                handleAddtoCart(productDetailObject);
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
