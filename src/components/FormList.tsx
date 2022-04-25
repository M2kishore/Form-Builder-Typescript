import React, { useState, useReducer } from "react";
import { Form, formData } from "./Form";
import FocusLock from "react-focus-lock";
import { useKey } from "react-use";
export default function FormList(props: {
  closeFormListCB: () => void;
  closeFormCB: () => void;
}) {
  useKey("Escape", props.closeFormListCB);
  const InitialForms: () => formData[] = () => {
    let AllForms = localStorage.getItem("savedForms");
    const persistentForms = AllForms
      ? JSON.parse(AllForms)
      : [];
    return persistentForms;
  };
  const reducer = (initialForms: formData[], action: any) => {
    const AllForms = localStorage.getItem("savedForms");
    let persistentForms = AllForms
          ? JSON.parse(AllForms)
          : [];
    switch (action.type) {
      case 'initialize':
        return persistentForms
      case 'delete_form':
        if (persistentForms.length === 0) {
          return;
        }
        persistentForms = persistentForms.filter(
          (form: formData) => form.id !== action.id
        );
        localStorage.setItem("savedForms", JSON.stringify(persistentForms));
        return persistentForms
      case "update_forms":
        return [...action.Forms];
      default:
        throw new Error();
    }
  };
  const [Forms, dispatch] = useReducer(reducer, InitialForms());
  const [state, setState] = useState<string>("FORM_LIST");
  //const [Forms, setForms] = useState<formData[]>(InitialForms);
  const [selectedForm, setSelectedForm] = useState<formData>({
    id: Number(new Date()),
    title: "untitled",
    formFields: [],
  });
  // const deleteForm = (id: number) => {
  //   const AllForms = localStorage.getItem("savedForms");
  //   let persistentForms = AllForms ? JSON.parse(AllForms) : [];
  //   if (persistentForms.length === 0) {
  //     return;
  //   }
  //   persistentForms = persistentForms.filter(
  //     (form: formData) => form.id !== id
  //   );
  //   localStorage.setItem("savedForms", JSON.stringify(persistentForms));
  //   setForms(persistentForms)
  // };
  const closeForm = () => {
    setState("FORM_LIST");
  };
  return (
    <FocusLock>
    <div>
      {state === "FORM_LIST" &&
        Forms.map((form: formData) => {
          return (
            <div key={form.id}>
              {form.title}
              <button
                onClick={() => {
                  setState("FORM");
                  setSelectedForm(form);
                }}
                className="m-1 flex-right rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
              >
                Open
              </button>
              <button
                onClick={() => {
                  dispatch({type:"delete_form",id:form.id});
                }}
                className="flex-right rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
              >
                Delete
              </button>
            </div>
          );
        })}
      {state === "FORM" && (
        <Form closeFormCB={closeForm} id={selectedForm.id} dispatchCB={dispatch} Forms={Forms} />
      )}
      {state === "ADD_FORM" && (<div>
        <Form closeFormCB={closeForm} id={-1} dispatchCB={dispatch} Forms={Forms} />
      </div>
      )}
      {state === "FORM_LIST" && (
        <div>

          <button
            onClick={props.closeFormListCB}
            className="m-1 rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
          >
            Home
          </button>
          <button
            onClick={() => setState("ADD_FORM")}
            className="rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
          >
            Add Form
          </button>
        </div>)}
    </div>
    </FocusLock>
  );
}
