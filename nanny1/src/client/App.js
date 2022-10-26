import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser, allProducts } from "./actions/index";

import NannyHeader from "./components/NannyHeader";
import SignInModalContent from "./components/SignInModalContent";
import SignUpModalContent from "./components/SignUpModalContent";
import Updatepwd from "./components/UpdatePwdModalContent";
import MyModal from "./common/modal";
import HeaderSignIn from "./components/HeaderSignin";
import HeaderSignOut from "./components/HeaderSignout";
import SendUpdatePwd from "./components/SendUpdatePwd";
import HomeModal from "./common/homepageModal";
import ProductsContent from "./components/ProductsContent";

import { LOGIN_FORM, SIGN_UP_FORM, UPDATE_PWD_FORM } from "./constants";
import "./App.css";

function App() {
  const [ModalState, setModalState] = useState(false);
  const [ShowSignUp, setShowSignUp] = useState(false);
  const [ShowUpdatePwd, setShowUpdatePwd] = useState(false);
  const [ShowSendUpdatePwd, SetShowSendUpdatePwd] = useState(false);
  const [isLogin, setlogin] = useState(false);

  const [showProducts, setShowProducts] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    async function getNowUser() {
      try {
        const response = await getUser(dispatch)();
        if (response.ok) {
          setlogin(true);
        } else {
          setlogin(false);
        }
      } catch (error) {}
    }
    getNowUser();
  }, []);

  // useEffect(() => {
  //   allProducts(dispatch)();
  //   // console.log("all p", response);
  // }, [dispatch]);

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
      <HomeModal titleText={showProducts && "Products"}>
        <ProductsContent />
      </HomeModal>
    </div>
  );
}

export default App;
