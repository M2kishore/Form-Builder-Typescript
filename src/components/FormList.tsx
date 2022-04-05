import React, { useState } from "react";
import { Form, formData, formField } from "./Form";
export default function FormList(props: {
  closeFormListCB: () => void;
  closeFormCB: () => void;
}) {
  const InitialForms: () => formData[] = () => {
    let AllForms = localStorage.getItem("savedForms");
    const persistentForms = AllForms
      ? JSON.parse(AllForms)
      : [];
    console.log(persistentForms);
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
                key={form.id}
                onClick={() => {
                  setState("FORM");
                  setSelectedForm(form);
                }}
                className="flex-right rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
              >
                Open
              </button>
              <button
                key={form.id}
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
        <Form closeFormCB={closeForm} id={selectedForm.id} />
      )}
      {state === "ADD_FORM" && (<div>
        <Form closeFormCB={closeForm} id={-1} />
      </div>
      )}
      {state === "FORM_LIST" && (
        <div>

          <button
            onClick={props.closeFormListCB}
            className="rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
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
