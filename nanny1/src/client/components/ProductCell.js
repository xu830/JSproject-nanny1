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
  isAdmin,
  handleCreateProduct,
  setEditProduct,
}) => {
  const [plusState, setPlus] = useState();
  const [minusState, setMinus] = useState();
  const [numState, setNum] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleAddBtnShow = async () => {
      try {
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

  const handleQuickAdd = async (addnum) => {
    if (addnum > 0) {
      try {
        const resp = await addCart(dispatch)(id, addnum);
        handleSetCart();
      } catch (error) {
        console.log(error, "when quckadd");
      }
    } else if (addnum <= 0) {
      try {
        const resp = await deleteCart(dispatch)(id);
        handleSetCart();
      } catch (error) {
        console.log(error, "delete from cart error");
      }
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
              handleQuickAdd(1);
            }}
          >
            Add
          </button>
        )}
        {plusState && minusState && (
          <div className="plusMinusCell">
            <button
              id="minusCell"
              onClick={() => {
                const afterMinus = numState - 1;

                handleQuickAdd(afterMinus);
              }}
            >
              -
            </button>
            <input
              type="number"
              id="quantityInCell"
              value={numState}
              onChange={(event) => {
                setNum(event.target.valueAsNumber);
              }}
              onBlur={() => {
                handleQuickAdd(numState);
              }}
            />
            <button
              id="plusCell"
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
            className="editBtn"
            onClick={() => {
              setEditProduct(id);
              handleCreateProduct(true);
              handleProductShow(false);
            }}
          >
            edit
          </button>
        )}
      </div>
    </div>
  );
};
export default ProductCell;
