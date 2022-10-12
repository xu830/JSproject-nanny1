import React from "react";

const Modal = ({ closeModal }) => {
  return (
    <div className="ModalBackground">
      Modal
      <div className="modalContainer">
        <button onClick={() => closeModal(false)}> X </button>
        <div className="title">
          <h1>Sign in to your account</h1>
        </div>
        <div className="body">
          <p>email</p>
        </div>
        <div className="footer">
          <button>sign in</button>
          <button>sign up</button>
          <button>forget password</button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
