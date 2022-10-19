const HeaderSignIn = ({ openModal, closeSignUp, closeUpdate }) => {
  return (
    <button
      onClick={() => {
        openModal(true);
        closeSignUp(false);
        closeUpdate(false);
      }}
      id="signin-btn"
    >
      Sign in
    </button>
  );
};
export default HeaderSignIn;
