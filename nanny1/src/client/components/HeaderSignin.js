import cartImg from "../img/cart.png";
const HeaderSignIn = ({
  openModal,
  closeSignUp,
  closeUpdate,
  closeSendUpdate,
  handleCart,
  totalPrice,
}) => {
  return (
    <div className="HeaderRight">
      <button
        className="cartBtn"
        onClick={() => {
          handleCart(true);
        }}
      >
        <img src={cartImg} alt="cart" className="cartBtnimg"></img>
      </button>
      <p className="priceHeader">${totalPrice}</p>
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
