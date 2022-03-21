import React, { useState } from "react";
import Header from "./Header";
import AppContainer from "./AppContainer";
import { Home } from "./components/Home";
import { Form } from "./components/Form";

function App() {
  const [state, setState] = useState<string>("HOME");

  const openForm = () => {
    setState("FORM");
  };

  const closeForm = () => {
    setState("HOME");
  };

  return (
    <AppContainer>
      <div className="mx-auto rounded-xl bg-white p-4 shadow-lg">
        <Header title="Welcome to Lesson 5 of $react-typescript with #tailwindcss" />
        {state === "HOME" ? (
          <Home openFormCB={openForm} />
        ) : (
          <Form closeFormCB={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
