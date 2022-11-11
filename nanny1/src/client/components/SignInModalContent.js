import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ajaxConfigHelper } from "../helper";
import "./style/SignInModalContent.css";

const SignInModalContent = ({
  handleSignUp,
  handleUpdatePwd,
  handleLogin,
  closeModal,
}) => {
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [pwdVisible, setPwdVisible] = useState("password");

  const dispatch = useDispatch();

  const ajaxHandleLogin = async () => {
    const resp = await fetch(
      "/login",
      ajaxConfigHelper({
        email: emailInput,
        password: passwordInput,
      })
    );
    const result = await resp.json();
    // console.log(result);
    // localStorage.setItem(
    //   "login",
    //   JSON.stringify({
    //     // login: true,
    //     id: result.result.id,
    //     // token: result.token,
    //   })
    // );
    dispatch({
      type: "LOGIN",
      payload: {
        email: emailInput,
        password: passwordInput,
      },
    });
    if (resp.ok) {
      handleLogin(true);
      closeModal(false);
    }
  };

  const addCredential = () => {
    const credential = {
      email: emailInput,
      password: passwordInput,
    };
    if (credential.email === "") {
      console.log("error: no email");
    } else if (credential.password === "") {
      console.log("error: no password");
    } else {
      console.log(credential.email, credential.password);
      ajaxHandleLogin();
    }
    setEmail("");
    setPassword("");
  };

  const changeVisibility = () => {
    if (pwdVisible === "password") {
      setPwdVisible("text");
    } else {
      setPwdVisible("password");
    }
  };

  return (
    <div>
      <div className="signInBody">
        <form>
          <label htmlFor="email" className="labels">
            Email
          </label>
          <input
            className="doubleInput"
            type="text"
            id="email"
            name="email"
            value={emailInput}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="pwd" className="labels">
            Password
          </label>
          <input
            className="doubleInput"
            type={pwdVisible === "text" ? "text" : "password"}
            id="pwd"
            name="pwd"
            value={passwordInput}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <p onClick={changeVisibility} id="showBtn">
            show
          </p>
        </form>

        <button onClick={addCredential} id="signinBtn">
          sign in
        </button>
      </div>

      <div className="footer">
        <p id="signUpText">Don't have an account?</p>
        <button className="blueBtn" id="signup" onClick={handleSignUp}>
          Sign up
        </button>
        <button className="blueBtn" id="forget" onClick={handleUpdatePwd}>
          Forget password
        </button>
      </div>
    </div>
  );
};
export default SignInModalContent;
