import React, { useState } from "react";
import InputContainer from "../InputContainer";

const formFields = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
];

export function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(formFields);
  const [newField, setNewField] = useState("");

  const addField = () => {
    setState([
      ...state,
      {
        id: Number(new Date()),
        label: newField,
        type: "text",
        value: "",
      },
    ]);
    setNewField("");
  };

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  const updateValue = (id: number, value: string) => {
    setState(
      state.map((field) => {
        if (field.id === id) return { ...field, value: value };
        return field;
      })
    );
  };

  const clearAll = () => {
    setState(
      state.map((field) => {
        return { ...field, value: "" };
      })
    );
  };

  return (
    <div className="flex flex-col gap-2 divide-y-2 divide-dotted p-4">
      <div>
        {state.map((field) => (
          <InputContainer
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            value={field.value}
            removeFieldCB={removeField}
            updateValueCB={updateValue}
          />
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newField}
          className="my-2 w-full flex-1 rounded-lg border-2 border-gray-200 p-2"
          onChange={(e) => {
            setNewField(e.target.value);
          }}
        />
        <button
          onClick={addField}
          className="m-1 rounded-xl bg-blue-500 px-2 text-white hover:bg-blue-700"
        >
          Add Field
        </button>
      </div>

      <div className="flex gap-4">
        <button
          className="my-2 w-1/4 rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
          type="submit"
        >
          Submit
        </button>
        <button
          onClick={props.closeFormCB}
          className="my-2 w-1/4 rounded-xl bg-blue-500 p-2  text-white hover:bg-blue-700"
        >
          Close Form
        </button>

        <button
          onClick={clearAll}
          className="my-2 w-1/4 rounded-xl bg-blue-500 p-2  text-white hover:bg-blue-700"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
