import React, { useState } from "react";
import { Form, formData, formField } from "./Form";
const initialFormFields: formField[] = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
];
export default function FormList(props: {
  closeFormListCB: () => void;
  closeFormCB: () => void;
}) {
  const InitialForms: () => formData[] = () => {
    let AllForms = localStorage.getItem("savedForms");
    const persistentForms = AllForms
      ? JSON.parse(AllForms)
      : [
          {
            id: Number(new Date()),
            title: "Untitled Form",
            formFields: initialFormFields,
          },
        ];
    console.log(persistentForms);
    return persistentForms;
  };
  const [state, setState] = useState<string>("FORM_LIST");
  const [Forms, setForms] = useState<formData[]>(InitialForms);
  const [selectedForm, setSelectedForm] = useState<formData>({
    id: Number(new Date()),
    title: "untitled",
    formFields: initialFormFields,
  });
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
            </div>
          );
        })}
      {state === "FORM" && (
        <Form closeFormCB={closeForm} id={selectedForm.id} />
      )}
      <button
        onClick={props.closeFormListCB}
        className="w-full rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
      >
        Home
      </button>
    </div>
  );
}
