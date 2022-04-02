import React, { useState } from "react";
import { Form, formData } from "./Form";
export default function FormList(props: {
  closeFormListCB: () => void;
  closeFormCB: () => void;
}) {
  const InitialForms: () => formData[] = () => {
    let AllForms = localStorage.getItem("savedForms");
    const persistentForms = AllForms
      ? JSON.parse(AllForms)
      : { title: "Untitled Form", formFields: AllForms };
    return persistentForms;
  };
  const [state, setState] = useState("FORM_LIST");
  const [Forms, setForms] = useState(InitialForms);
  const [index, setIndex] = useState(0);
  const addFormData = (form: formData) => {
    setForms([...Forms, form]);
    localStorage.setItem("savedForms", JSON.stringify(Forms));
    return form;
  };
  const closeForm = () => {
    setState("FORM_LIST");
  };
  return (
    <div>
      {state === "FORM_LIST" &&
        Forms.map((form: formData) => {
          return (
            <div>
              {form.title}
              <button
                onClick={() => setState("FORM")}
                className="flex-right rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
              >
                Open
              </button>
            </div>
          );
        })}
      {state === "FORM" && <Form closeFormCB={closeForm} />}
      <button
        onClick={props.closeFormListCB}
        className="w-full rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
      >
        Home
      </button>
    </div>
  );
}
