const HeaderSignIn = ({
  openModal,
  closeSignUp,
  closeUpdate,
  closeSendUpdate,
}) => {
  return (
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
  );
};
export default HeaderSignIn;
