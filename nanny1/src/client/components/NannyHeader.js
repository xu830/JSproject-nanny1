import "./style/NannyHeader.css";

const NannyHeader = ({ children }) => {
  return (
    <header className="flex-header">
      <h1 className="header-content">
        Management
        <span id="chuwa-header">chuwa</span>
      </h1>
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
