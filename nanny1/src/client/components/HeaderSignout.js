import { useDispatch } from "react-redux";
import { signOut } from "../actions/index";
const HeaderSignOut = ({ handleLogOut = () => {} }) => {
  const dispatch = useDispatch();
  const handleSignout = () => {
    console.log("handle signout");
    signOut(dispatch)();
    handleLogOut();
  };
  return (
    <button id="signout-btn" onClick={handleSignout}>
      Sign out
    </button>
  );
};
export default HeaderSignOut;
