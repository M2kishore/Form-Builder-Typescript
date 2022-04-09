import React, { useState, useEffect, useRef } from "react";
import InputContainer from "../InputContainer";

export interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}

export interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

const initialFormFields: formField[] = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
];
export function Form(props: { closeFormCB: () => void; id: number;setFormsCB: any;Forms: formData[] }) {
  const initialState: () => formData = () => {
    if(props.id === -1){
      return {
          id: Number(new Date()),
          title: "Untitled Form",
          formFields: initialFormFields,
      }
    }
    const formFieldsJSON = localStorage.getItem("savedForms");
    const persistentFormFields = formFieldsJSON
      ? JSON.parse(formFieldsJSON)
      : [
          {
            id: props.id,
            title: "Untitled Form",
            formFields: initialFormFields,
          },
        ];
    const currentForm = persistentFormFields.filter((form: formData) => {
      return form.id === props.id;
    });
    console.log(currentForm);
    return currentForm[0];
  };
  const [state, setState] = useState<formData>(initialState());
  const [newField, setNewField] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("Component was mounted");
    document.title = "Form Editor";
    titleRef.current?.focus();
    return () => {
      document.title = "React App";
    };
  }, []);
  const saveFormData = (currentState: formData) => {
    const AllForms = localStorage.getItem("savedForms");
    const persistentForms = AllForms ? JSON.parse(AllForms) : [currentState];
    const indexOfForm = persistentForms.findIndex(
      (form: formData) => form.id === currentState.id
    );
    if(indexOfForm === -1){
      props.setFormsCB([...props.Forms,state])
      addForm(state);
      return;
    }
    persistentForms[indexOfForm] = currentState;
    localStorage.setItem("savedForms", JSON.stringify(persistentForms));
  };
  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state,saveFormData]);
  const addForm = (currentState: formData) => {
    let forms = localStorage.getItem("savedForms");
    currentState.id = Number(new Date());
    let persistentForms = forms ? JSON.parse(forms) : [];
    persistentForms.push(currentState);
    localStorage.setItem("savedForms", JSON.stringify(persistentForms));
  };
  const addField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newField,
          type: "text",
          value: "",
        },
      ],
    });
    setNewField("");
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

  const updateValue = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === id) return { ...field, value: value };
        return field;
      }),
    });
  };

  return (
    <div className="flex flex-col gap-2 divide-y-2 divide-dotted p-4">
      <div>
        <input
          type="text"
          className="border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
          value={state.title}
          onChange={(e) => {
            setState({ ...state, title: e.target.value });
          }}
          ref={titleRef}
        />
      </div>
      {state.formFields.map((field: formField) => (
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
          onClick={() => saveFormData(state)}
          className="my-2 w-1/4 rounded-xl bg-blue-500 p-2  text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
