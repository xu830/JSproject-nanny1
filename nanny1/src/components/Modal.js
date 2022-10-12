import React, { useState } from "react";
import "./style/Modal.css";

const Modal = ({ closeModal }) => {
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const addCredential = () => {
    const credential = {
      email: emailInput,
      password: passwordInput,
    };
    console.log(credential.email, credential.password);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="ModalBackground">
      <div className="ModalContainer">
        <button id="closeBtn" onClick={() => closeModal(false)}>
          X
        </button>
        <div className="title">
          <p>Sign in to your account</p>
        </div>

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
              type="text"
              id="pwd"
              name="pwd"
              value={passwordInput}
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
        </div>
        <div className="footer">
          <button onClick={addCredential}>sign in</button>
          <button>sign up</button>
          <button>forget password</button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
