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
  cartList,
  handleSetCart,
  isAdmin,
  handleCreateProduct,
  setEditProduct,
}) => {
  const [plusState, setPlus] = useState(false);
  const [minusState, setMinus] = useState(false);
  const [numState, setNum] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const handleAddBtnShow = async () => {
      try {
        const item = cartList.filter(
          (ele) => ele.id === productDetailObject.id
        );
        if (item[0]) {
          setNum(item[0].num);
          setPlus(true);
          setMinus(true);
        } else {
          setPlus(false);
          setMinus(false);
        }
      } catch (error) {
        console.log(error, "get cart");
      }
    };
    handleAddBtnShow();
  }, [cartList]);

  const handleQuickAdd = async (addnum) => {
    if (addnum > 0) {
      try {
        const resp = await addCart(dispatch)(productDetailObject.id, addnum);
        handleSetCart();
      } catch (error) {
        console.log(error, "when quckadd");
      }
    } else if (addnum <= 0) {
      try {
        const resp = await deleteCart(dispatch)(productDetailObject.id);
        handleSetCart();
      } catch (error) {
        console.log(error, "delete from cart error");
      }
    }
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
          <button
            className="addToCart"
            onClick={() => {
              handleQuickAdd(1);
            }}
          >
            Add To Cart
          </button>
        )}
        {plusState && minusState && (
          <div className="plusMinus">
            <button
              id="minus"
              onClick={() => {
                const afterMinus = numState - 1;
                handleQuickAdd(afterMinus);
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
              onBlur={() => {
                handleQuickAdd(numState);
              }}
            />
            <button
              id="plus"
              onClick={() => {
                const afterAdd = numState + 1;
                handleQuickAdd(afterAdd);
              }}
            >
              +
            </button>
          </div>
        )}
        {isAdmin && (
          <button
            className="editInDetail"
            onClick={() => {
              setEditProduct(productDetailObject.id);
              handleCreateProduct(true);
              setProductShowDetail(false);
            }}
          >
            Edit
          </button>
        )}
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
