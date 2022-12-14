import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser, getProducts, getCart, getProductInfo } from "./actions/index";

import NannyHeader from "./components/NannyHeader";
import SignInModalContent from "./components/SignInModalContent";
import SignUpModalContent from "./components/SignUpModalContent";
import Updatepwd from "./components/UpdatePwdModalContent";
import MyModal from "./common/modal";
import HeaderSignIn from "./components/HeaderSignin";
import HeaderSignOut from "./components/HeaderSignout";
import SendUpdatePwd from "./components/SendUpdatePwd";
import HomeModal from "./common/homepageModal";

import { LOGIN_FORM, SIGN_UP_FORM, UPDATE_PWD_FORM } from "./constants";
import "./App.css";

import ProductsContent from "./components/ProductsContent";
import CreateProductContent from "./components/CreateProductContent";
import ProductDetail from "./components/ProductDetail";
import CartModal from "./common/cartModal";
import CartHeader from "./components/CartHeader";
import CartFooter from "./components/CartFooter";
import CartContent from "./components/CartContent";

function App() {
  const [ModalState, setModalState] = useState(false);
  const [ShowSignUp, setShowSignUp] = useState(false);
  const [ShowUpdatePwd, setShowUpdatePwd] = useState(false);
  const [ShowSendUpdatePwd, SetShowSendUpdatePwd] = useState(false);
  const [isLogin, setlogin] = useState();
  const [isAdmin, setAdmin] = useState(false);

  const [showProducts, setShowProducts] = useState(true);
  const [showCreateProd, setCreateProd] = useState(false);
  const [productShowDetail, setProductShowDetail] = useState(false);
  const [productDetailObject, setProductDetail] = useState({});
  const [editProductState, setEditProduct] = useState();

  const [showCart, setShowCart] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    const getNowUser = async () => {
      try {
        const response = await getUser(dispatch)();

        if (response.user) {
          setlogin(true);
        } else {
          setlogin(false);
        }
        if (response.admin) {
          setAdmin(true);
        } else {
          console.log("sed admin to false");
          setAdmin(false);
        }
      } catch (error) {}
    };

    // GetCartList();
    getNowUser();
  }, [isLogin]);

  //when rerender
  useEffect(() => {
    handleSetCart();
  }, []);

  //when cartlist change set total will change
  useEffect(() => {
    handleSetTotal();
  }, [cartList]);

  const handleSetCart = async () => {
    try {
      const cart = await getCart(dispatch)();
      if (cart.length !== 0) {
        const cartlist = await Promise.all(
          cart.map(async (ele) => {
            const info = await getProductInfo(dispatch)(ele.id);

            const product = {
              ...ele,
              productName: info.productName,
              price: info.price,
              imgSrc: info.imgSrc,
            };

            return product;
          })
        );
        setCartList(cartlist);
      } else {
        setCartList(cart);
      }
    } catch (error) {}
  };

  const handleSetTotal = () => {
    var total = cartList.reduce((prev, cur) => {
      return prev + cur.price * cur.num;
    }, 0);
    const total_num = Math.round(total * 100) / 100;
    setTotalPrice(total_num);
  };

  return (
    <div className="APP">
      <NannyHeader>
        {isLogin ? (
          <HeaderSignOut
            handleLogOut={setlogin}
            handleCart={setShowCart}
            setCartList={handleSetCart}
            totalPrice={totalPrice}
          />
        ) : (
          <HeaderSignIn
            openModal={setModalState}
            closeSignUp={setShowSignUp}
            closeUpdate={setShowUpdatePwd}
            closeSendUpdate={SetShowSendUpdatePwd}
            handleCart={setShowCart}
            totalPrice={totalPrice}
          />
        )}
      </NannyHeader>
      <HomeModal
        titleText={
          (showProducts && "Products") ||
          (showCreateProd && "Create Product") ||
          (productShowDetail && "Product Detail")
        }
      >
        {showProducts && (
          <ProductsContent
            handleCreateProduct={setCreateProd}
            handleProductShow={setShowProducts}
            setProductShowDetail={setProductShowDetail}
            setProductDetail={setProductDetail}
            isLogin={isLogin}
            handleSetCart={handleSetCart}
            cartList={cartList}
            isAdmin={isAdmin}
            setEditProduct={setEditProduct}
          />
        )}
        {showCreateProd && (
          <CreateProductContent
            handleCreateProduct={setCreateProd}
            handleProductShow={setShowProducts}
            editProductState={editProductState}
            setEditProduct={setEditProduct}
          />
        )}
        {productShowDetail && (
          <ProductDetail
            productDetailObject={productDetailObject}
            handleProductShow={setShowProducts}
            setProductShowDetail={setProductShowDetail}
            setTotalPrice={setTotalPrice}
            totalPrice={totalPrice}
            cartList={cartList}
            handleSetCart={handleSetCart}
            isAdmin={isAdmin}
            handleCreateProduct={setCreateProd}
            setEditProduct={setEditProduct}
          />
        )}
      </HomeModal>
      {showCart && (
        <CartModal
          top={
            <CartHeader
              handleCart={() => setShowCart(false)}
              cartList={cartList}
            />
          }
          bottom={<CartFooter totalPrice={totalPrice} />}
        >
          <CartContent cartList={cartList} handleSetCart={handleSetCart} />
        </CartModal>
      )}

      {ModalState && (
        <MyModal
          titleText={
            (ShowSignUp && SIGN_UP_FORM.TITLE) ||
            (ShowUpdatePwd && UPDATE_PWD_FORM.TITLE) ||
            (ShowSendUpdatePwd && "") ||
            (!ShowSignUp &&
              !ShowUpdatePwd &&
              !ShowSendUpdatePwd &&
              LOGIN_FORM.TITLE)
          }
          closeModal={setModalState}
        >
          {ShowSignUp && (
            <SignUpModalContent handleSignUp={() => setShowSignUp(false)} />
          )}
          {!ShowSignUp && !ShowUpdatePwd && !ShowSendUpdatePwd && (
            <SignInModalContent
              handleSignUp={() => setShowSignUp(true)}
              handleUpdatePwd={() => setShowUpdatePwd(true)}
              handleLogin={setlogin}
              closeModal={setModalState}
              handleSetCart={handleSetCart}
            />
          )}
          {ShowUpdatePwd && (
            <Updatepwd
              handleSendUpdatePwd={SetShowSendUpdatePwd}
              handleUpdatePwd={setShowUpdatePwd}
            />
          )}
          {ShowSendUpdatePwd && <SendUpdatePwd />}
        </MyModal>
      )}
    </div>
  );
}

export default App;
