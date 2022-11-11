import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart, getCart, deleteCart } from "../actions/index";
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
  isLogin,
  GetCartList,
}) => {
  const [plusState, setPlus] = useState();
  const [minusState, setMinus] = useState();
  const [numState, setNum] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleAddBtnShow = async () => {
      console.log("rerender cell");
      try {
        const cart = await getCart(dispatch)();
        const item = cart.filter((ele) => ele.id === id);
        if (item[0]) {
          setNum(item[0].num);
          setPlus(true);
          setMinus(true);
        }
      } catch (error) {
        console.log(error, "get cart");
      }
    };
    handleAddBtnShow();
  }, [isLogin]);

  useEffect(() => {
    const handleAddtoCart = async () => {
      try {
        //console.log(productDetailObject.id, numState);
        const resp = await addCart(dispatch)(id, numState);
        //setTotalPrice(totalPrice + productDetailObject.price);
      } catch (error) {
        console.log(error, "when add to cart");
      }
    };
    const handleDeleteFromCart = async () => {
      try {
        const resp = await deleteCart(dispatch)(id);
      } catch (error) {
        console.log(error, "delete from cart error");
      }
    };
    //console.log(numState);
    if (numState > 0) {
      handleAddtoCart();
      //GetCartList();
      console.log("add before show");
    } else if (numState === 0) {
      handleDeleteFromCart();
      //GetCartList();
      setPlus(false);
      setMinus(false);
    }
  }, [numState]);

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
        {!plusState && !minusState && (
          <button
            className="quickAdd"
            onClick={() => {
              setNum(1);
              setPlus(true);
              setMinus(true);
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
        <button className="editBtn">edit</button>
      </div>
    </div>
  );
};
export default ProductCell;
