import React from "react";
import { formData } from "./Form";
const getForms = () => {
  let AllForms = localStorage.getItem("savedForms");
  const persistentFormFields: formData[] = AllForms ? JSON.parse(AllForms) : [];
  return persistentFormFields;
};
export default function FormList(props: { closeFormListCB: () => void }) {
  const AllForms: formData[] = getForms();
  return (
    <div>
      {AllForms.map((form: formData) => {
        return (
          <div>
            {form.title}
            <button
              onClick={props.closeFormListCB}
              className="flex-right rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
            >
              Open
            </button>
          </div>
        );
      })}
      <button
        onClick={props.closeFormListCB}
        className="w-full rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
      >
        Home
      </button>
    </div>
  );
}
