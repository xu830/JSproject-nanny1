import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/index";

import NannyHeader from "./components/NannyHeader";
import SignInModalContent from "./components/SignInModalContent";
import SignUpModalContent from "./components/SignUpModalContent";
import Updatepwd from "./components/UpdatePwdModalContent";
import MyModal from "./common/modal";
import HeaderSignIn from "./components/HeaderSignin";
import HeaderSignOut from "./components/HeaderSignout";
import SendUpdatePwd from "./components/SendUpdatePwd";

import { LOGIN_FORM, SIGN_UP_FORM, UPDATE_PWD_FORM } from "./constants";
import "./App.css";

function App() {
  const [ModalState, setModalState] = useState(false);
  const [ShowSignUp, setShowSignUp] = useState(false);
  const [ShowUpdatePwd, setShowUpdatePwd] = useState(false);
  const [ShowSendUpdatePwd, SetShowSendUpdatePwd] = useState(false);
  const [isLogin, setlogin] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    async function getNowUser() {
      try {
        const response = await getUser(dispatch)();
        console.log("respons status", response);
        if (response) {
          console.log("ok");
          setlogin(true);
        } else {
          console.log("404");
          setlogin(false);
        }
      } catch (error) {}
    }
    getNowUser();
  }, []);

  //const dispatch = useDispatch();

  // useEffect(() => {
  //   const result = getUser(dispatch)();
  //   console.log(result.email);
  // }, [dispatch]);

  return (
    <div className="APP">
      <NannyHeader>
        {!isLogin && (
          <HeaderSignIn
            openModal={setModalState}
            closeSignUp={setShowSignUp}
            closeUpdate={setShowUpdatePwd}
            closeSendUpdate={SetShowSendUpdatePwd}
          />
        )}
        {isLogin && <HeaderSignOut />}
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
