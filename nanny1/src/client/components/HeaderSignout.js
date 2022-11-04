import { useDispatch } from "react-redux";
import { signOut } from "../actions/index";
import cartImg from "../img/cart.png";
import "./style/HeaderSignout.css";
const HeaderSignOut = ({ handleLogOut = () => {}, handleCart }) => {
  const dispatch = useDispatch();
  const handleSignout = () => {
    signOut(dispatch)();
    handleCart(false);
    handleLogOut();
  };
  return (
    <div>
      <button
        className="cartBtn"
        onClick={() => {
          handleCart(true);
        }}
      >
        <img src={cartImg} alt="cart" className="cartBtnimg"></img>
      </button>
      <button id="signout-btn" onClick={handleSignout}>
        Sign out
      </button>
    </div>
  );
};
export default HeaderSignOut;
