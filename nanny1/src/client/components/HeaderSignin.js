import cartImg from "../img/cart.png";
const HeaderSignIn = ({
  openModal,
  closeSignUp,
  closeUpdate,
  closeSendUpdate,
  handleCart,
}) => {
  return (
    <div className="SigninContext">
      <button
        className="cartBtn"
        onClick={() => {
          handleCart(true);
        }}
      >
        <img src={cartImg} alt="cart" className="cartBtnimg"></img>
      </button>
      <button
        onClick={() => {
          openModal(true);
          closeSignUp(false);
          closeUpdate(false);
          closeSendUpdate(false);
        }}
        id="signin-btn"
      >
        Sign in
      </button>
    </div>
  );
};
export default HeaderSignIn;
