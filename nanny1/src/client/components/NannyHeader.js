import "./style/NannyHeader.css";

const NannyHeader = ({ children }) => {
  return (
    <header className="flex-header">
      <p className="header-content">
        Management
        <span id="chuwa-header">chuwa</span>
      </p>
      {/* <button
        onClick={() => {
          openModal(true);
          closeSignUp(false);
          closeUpdate(false);
        }}
        id="signin-btn"
      >
        Sign in
      </button> */}
      {children}
    </header>
  );
};

export default NannyHeader;
