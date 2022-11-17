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
  handleSetCart,
  cartList,
}) => {
  const [plusState, setPlus] = useState();
  const [minusState, setMinus] = useState();
  const [numState, setNum] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleAddBtnShow = async () => {
      try {
        //const cart = await getCart(dispatch)();
        console.log("in cell", cartList);
        const item = cartList.filter((ele) => ele.id === id);
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

  const handleOnChange = async () => {
    //console.log("num state", numState);
    if (numState > 0) {
      try {
        const resp = await addCart(dispatch)(id, numState);
        handleSetCart();
      } catch (error) {
        console.log(error, "when add to cart");
      }
    } else if (numState <= 0) {
      try {
        const resp = await deleteCart(dispatch)(id);
        handleSetCart();
      } catch (error) {
        console.log(error, "delete from cart error");
      }
      setPlus(false);
      setMinus(false);
    }
  };

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
              //setNum(1);
              setPlus(true);
              setMinus(true);
              handleOnChange();
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
                //setNum(numState - 1);
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
              }}
              onBlur={() => {
                handleOnChange();
              }}
            />
            <button
              id="plus"
              onClick={() => {
                //setNum(numState + 1);
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
