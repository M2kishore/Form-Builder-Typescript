import React, { useState } from "react";
import Header from "./Header";
import AppContainer from "./AppContainer";
import { Home } from "./components/Home";
import { Form } from "./components/Form";
import FormList from "./components/FormList";

function App() {
  const [state, setState] = useState<string>("HOME");

  const openFormList = () => {
    setState("FORM_LIST");
  };

  const closeFormList = () => {
    setState("HOME");
  };

  const openForm = () => {
    setState("FORM_LIST");
  };

  const closeForm = () => {
    setState("FORM_LIST");
  };

  return (
    <AppContainer>
      <div className="mx-auto rounded-xl bg-white p-4 shadow-lg">
        <Header title="Welcome to Lesson 5 of $react-typescript with #tailwindcss" />
        {state === "HOME" ? (
          <Home openFormListCB={openFormList} />
        ) : state === "FORM_LIST" ? (
          <FormList closeFormListCB={closeFormList} />
        ) : (
          <Form closeFormCB={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
