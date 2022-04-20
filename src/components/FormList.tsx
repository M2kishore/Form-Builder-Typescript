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
      : [];
    return persistentForms;
  };
  const [state, setState] = useState<string>("FORM_LIST");
  const [Forms, setForms] = useState<formData[]>(InitialForms);
  const [selectedForm, setSelectedForm] = useState<formData>({
    id: Number(new Date()),
    title: "untitled",
    formFields: [],
  });
  const deleteForm = (id: number) => {
    const AllForms = localStorage.getItem("savedForms");
    let persistentForms = AllForms ? JSON.parse(AllForms) : [];
    if (persistentForms.length === 0) {
      return;
    }
    persistentForms = persistentForms.filter(
      (form: formData) => form.id !== id
    );
    localStorage.setItem("savedForms", JSON.stringify(persistentForms));
    setForms(persistentForms)
  };
  const closeForm = () => {
    setState("FORM_LIST");
  };
  return (
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
                  deleteForm(form.id);
                }}
                className="flex-right rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
              >
                Delete
              </button>
            </div>
          );
        })}
      {state === "FORM" && (
        <Form closeFormCB={closeForm} id={selectedForm.id} setFormsCB={setForms} Forms={Forms} />
      )}
      {state === "ADD_FORM" && (<div>
        <Form closeFormCB={closeForm} id={-1} setFormsCB={setForms} Forms={Forms} />
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
  );
}
