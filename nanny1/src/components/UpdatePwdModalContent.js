import React from "react";
const Updatepwd = () => {
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
            // value={emailInput}
            // onChange={(event) => setEmail(event.target.value)}
          />
        </form>
        <button id="updateBtn">Update Password</button>
      </div>
    </div>
  );
};
export default Updatepwd;
