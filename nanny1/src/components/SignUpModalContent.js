import React, { useState } from "react";
import "./style/SignUpModalContent.css";

const SignUpModalContent = ({ handleSignUp }) => {
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
      <div className="signUpbody">
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
