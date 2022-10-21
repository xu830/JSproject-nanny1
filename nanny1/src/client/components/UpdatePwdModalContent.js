import React from "react";
import "./style/UpdatePwdModalContent.css";
const Updatepwd = ({ handleSendUpdatePwd, handleUpdatePwd }) => {
  return (
    <div>
      <div className="updatebody">
        <p id="instruction">
          Enter your email link, we will send you the recovery link.
        </p>
        <form>
          <label htmlFor="email" className="labels" id="updateEmailLabel">
            Email
          </label>
          <input
            type="text"
            id="updateEmailInput"
            name="email"
            // value={emailInput}
            // onChange={(event) => setEmail(event.target.value)}
          />
        </form>
        <button
          id="updateBtn"
          onClick={() => {
            handleSendUpdatePwd(true);
            handleUpdatePwd(false);
          }}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};
export default Updatepwd;
