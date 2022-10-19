import React, { useState } from "react";
import "./style/SignInModalContent.css";

const SignInModalContent = () => {
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [pwdVisible, setPwdVisible] = useState("password");

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
      <div className="body">
        <form>
          <label htmlFor="email" className="labels">
            Email
          </label>
          <input
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
            type={pwdVisible === "text" ? "text" : "password"}
            id="pwd"
            name="pwd"
            value={passwordInput}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <label onClick={changeVisibility} id="showBtn">
            show
          </label>
        </form>
        <button onClick={addCredential} id="signinBtn">
          sign in
        </button>
      </div>

      <div className="footer">
        <p id="signUpText">Don't have an account?</p>
        <button className="blueBtn" id="signup">
          Sign up
        </button>
        <button className="blueBtn" id="forget">
          Forget password
        </button>
      </div>
    </div>
  );
};
export default SignInModalContent;
