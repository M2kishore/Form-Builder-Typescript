import { Link, useQueryParams } from "raviger";
import React, { useEffect, useState } from "react";
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
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState<string>("");
  const deleteForm = (formId: number) => {
    const AllForms = localStorage.getItem("savedForms");
    let persistentForms = AllForms ? JSON.parse(AllForms) : [];
    if (persistentForms.length === 0) {
      return;
    }
    persistentForms = persistentForms.filter(
      (form: formData) => form.id !== formId
    );
    localStorage.setItem("savedForms", JSON.stringify(persistentForms));
  };
  const closeForm = () => {
    setState("FORM_LIST");
  };
  return (
    <div>
      <label>Search</label>
      <form
        action="/"
        method="GET"
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}
      >
        <input
          className="border-2 border-gray-200 w-ful`l rounded-lg p-2 my-2 flex-1"
          name="search"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          type="text"
        />
      </form>
      {state === "FORM_LIST" &&
        Forms.filter((form) =>
          form.title.toLowerCase().includes(search?.toLowerCase())
        ).map((form: formData) => {
          return (
            <div key={form.id}>
              {form.title}
              <Link
                key={form.id}
                href={`/form/${form.id}`}
                className="flex-right rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
              >
                Open
              </Link>
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
      {state === "FORM" && <Form formId={selectedForm.id} />}
      <button
        onClick={props.closeFormListCB}
        className="w-full rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
      >
        Home
      </button>
    </div>
  );
}
