import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ajaxConfigHelper } from "../helper";
import "./style/SignUpModalContent.css";

const SignUpModalContent = ({ handleSignUp }) => {
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [pwdVisible, setPwdVisible] = useState("password");
  const [error, seterror] = useState(null);
  const dispatch = useDispatch();

  const ajaxHandleSignUp = async () => {
    const resp = await fetch(
      "/signUp",
      ajaxConfigHelper({
        email: emailInput,
        password: passwordInput,
      })
    );
    const result = await resp.json();
    console.log("sign up result", result);
    if (result.error) {
      seterror(result.error);
      return;
    } else {
      seterror(null);
    }
    dispatch({
      type: "ADD",
      payload: {
        email: emailInput,
        password: passwordInput,
      },
    });
  };

  const addCredential = () => {
    const credential = {
      email: emailInput,
      password: passwordInput,
    };
    if (credential.password === "") {
      console.log("error: no password");
    } else {
      ajaxHandleSignUp();
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

  const isEmail = (str) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(str);
  };
  return (
    <div>
      <div className="signUpbody">
        {error && <p className="signError">{error}</p>}
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
            onBlur={() => {
              if (!isEmail(emailInput)) {
                seterror("please enter a valid email");
              } else {
                seterror(null);
              }
            }}
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
        <button onClick={addCredential} id="createAccountBtn">
          Create account
        </button>
      </div>

      <div className="footer">
        <p id="signInText">Already have an account?</p>
        <button className="blueBtn" id="signin" onClick={handleSignUp}>
          Sign In
        </button>
      </div>
    </div>
  );
};
export default SignUpModalContent;
