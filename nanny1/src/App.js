import { useState } from "react";
import NannyHeader from "./components/NannyHeader";
import SignInModalContent from "./components/SignInModalContent";
import SignUpModalContent from "./components/SignUpModalContent";
import MyModal from "./common/modal";

import { LOGIN_FORM, SIGN_UP_FORM } from "./constants";
import "./App.css";

function App() {
  const [ModalState, setModalState] = useState(false);
  return (
    <div className="APP">
      <NannyHeader openModal={setModalState} />
      {/* <div>{ModalState && <Modal closeModal={setModalState} />}</div> */}
      {ModalState && (
        <MyModal titleText={LOGIN_FORM.TITLE} closeModal={setModalState}>
          {ModalState ? <SignInModalContent /> : <SignUpModalContent />}
        </MyModal>
      )}
    </div>
  );
}

export default App;
