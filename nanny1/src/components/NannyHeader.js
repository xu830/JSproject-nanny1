import "./style/NannyHeader.css";
const NannyHeader = () => {
  const popSignIn = () => {
    console.log("click sign in");
  };

  return (
    <header className="flex-header">
      <h1 className="header-content">
        Management
        <span id="chuwa-header">chuwa</span>
      </h1>
      <button onClick={popSignIn} id="signin-btn">
        Sign in
      </button>
    </header>
  );
};

export default NannyHeader;
