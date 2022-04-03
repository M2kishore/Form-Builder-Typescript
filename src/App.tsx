import React, { useState } from "react";
import Header from "./Header";
import AppContainer from "./AppContainer";
import { Home } from "./components/Home";
import FormList from "./components/FormList";

function App() {
  const [state, setState] = useState<string>("HOME");

  const openFormList = () => {
    setState("FORM_LIST");
  };

  const closeFormList = () => {
    setState("HOME");
  };
  const closeForm = () => {
    setState("HOME");
  };
  return (
    <div>
      {state === "HOME" ? (
        <Home openFormListCB={openFormList} />
      ) : (
        <FormList closeFormListCB={closeFormList} closeFormCB={closeForm} />
      )}
    </div>
  );
}

export default App;
