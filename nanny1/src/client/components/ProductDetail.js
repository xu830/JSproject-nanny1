import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCart, getCart, deleteCart } from "../actions/index";
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
  const [numState, setNum] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    const handleAddtoCart = async (productDetailObject) => {
      try {
        //console.log(productDetailObject.id, numState);
        const resp = await addCart(dispatch)(productDetailObject.id, numState);
        //setTotalPrice(totalPrice + productDetailObject.price);
      } catch (error) {
        console.log(error, "when add to cart");
      }
    };
    const handleDeleteFromCart = async (productDetailObject) => {
      try {
        const resp = await deleteCart(dispatch)(productDetailObject.id);
      } catch (error) {
        console.log(error, "delete from cart error");
      }
    };
    //console.log(numState);
    if (numState > 0) {
      handleAddtoCart(productDetailObject);
    } else if (numState === 0) {
      handleDeleteFromCart(productDetailObject);
      setPlus(false);
      setMinus(false);
    }
  }, [numState]);

  useEffect(() => {
    const handleAddBtnShow = async () => {
      try {
        const cart = await getCart(dispatch)();
        const item = cart.filter((ele) => ele.id === productDetailObject.id);
        if (item[0]) {
          console.log(item[0].num);
          setNum(item[0].num);
          setPlus(true);
          setMinus(true);
        }
      } catch (error) {
        console.log(error, "get cart");
      }
    };
    handleAddBtnShow();
  }, []);

  const handleAddOnClick = () => {
    setPlus(true);
    setMinus(true);
    setNum(1);
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
            <button
              id="minus"
              onClick={() => {
                setNum(numState - 1);
              }}
            >
              -
            </button>
            <input
              type="number"
              id="quantityInDetail"
              value={numState}
              onChange={(event) => {
                setNum(event.target.valueAsNumber);
                //handleAddtoCart(productDetailObject);
              }}
            />
            <button
              id="plus"
              onClick={() => {
                setNum(numState + 1);
              }}
            >
              +
            </button>
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
