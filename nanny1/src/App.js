import { useState } from "react";
import NannyHeader from "./components/NannyHeader";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [ModalState, setModalState] = useState(false);

  return (
    <div className="APP">
      <NannyHeader openModal={setModalState} />
      <div>{ModalState && <Modal closeModal={setModalState} />}</div>
    </div>
  );
}

export default App;
