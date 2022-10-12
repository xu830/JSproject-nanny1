import "./style/NannyHeader.css";

const NannyHeader = ({ openModal }) => {
  return (
    <header className="flex-header">
      <h1 className="header-content">
        Management
        <span id="chuwa-header">chuwa</span>
      </h1>
      <button onClick={() => openModal(true)} id="signin-btn">
        Sign in
      </button>
    </header>
  );
};

export default NannyHeader;
