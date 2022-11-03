import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser, getProducts } from "./actions/index";

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

function App() {
  const [ModalState, setModalState] = useState(false);
  const [ShowSignUp, setShowSignUp] = useState(false);
  const [ShowUpdatePwd, setShowUpdatePwd] = useState(false);
  const [ShowSendUpdatePwd, SetShowSendUpdatePwd] = useState(false);
  const [isLogin, setlogin] = useState(false);

  const [showProducts, setShowProducts] = useState(true);
  const [showCreateProd, setCreateProd] = useState(false);
  const [productShowDetail, setProductShowDetail] = useState(false);
  const [productDetailObject, setProductDetail] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    const getNowUser = async () => {
      try {
        const response = await getUser(dispatch)();
        console.log("result status", response.ok);
        if (response.ok) {
          setlogin(true);
        } else {
          setlogin(false);
        }
      } catch (error) {}
    };

    getNowUser();
  }, []);

  return (
    <div className="APP">
      <NannyHeader>
        {isLogin ? (
          <HeaderSignOut handleLogOut={() => setlogin(false)} />
        ) : (
          <HeaderSignIn
            openModal={setModalState}
            closeSignUp={setShowSignUp}
            closeUpdate={setShowUpdatePwd}
            closeSendUpdate={SetShowSendUpdatePwd}
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
          />
        )}
        {showCreateProd && (
          <CreateProductContent
            handleCreateProduct={setCreateProd}
            handleProductShow={setShowProducts}
          />
        )}
        {productShowDetail && (
          <ProductDetail
            productDetailObject={productDetailObject}
            handleProductShow={setShowProducts}
            setProductShowDetail={setProductShowDetail}
          />
        )}
      </HomeModal>
      <CartModal top={<CartHeader />}></CartModal>
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
