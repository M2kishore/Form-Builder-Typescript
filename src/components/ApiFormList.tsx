import { navigate } from "raviger";
import React, { useState, useEffect } from "react";
import { customRequest } from "./auth/Api";
import {withFocus} from "react-keyboard-navigation";
export default function ApiFormList() {
  // const InitialForms: () => formData[] = () => {
  //   let AllForms = localStorage.getItem("savedForms");
  //   const persistentForms = AllForms
  //     ? JSON.parse(AllForms)
  //     : [];
  //   return persistentForms;
  // };
  // const reducer = (initialForms: formData[], action: any) => {
  //   const AllForms = localStorage.getItem("savedForms");
  //   let persistentForms = AllForms
  //         ? JSON.parse(AllForms)
  //         : [];
  //   switch (action.type) {
  //     case 'initialize':
  //       return persistentForms
  //     case 'delete_form':
  //       if (persistentForms.length === 0) {
  //         return;
  //       }
  //       persistentForms = persistentForms.filter(
  //         (form: formData) => form.id !== action.id
  //       );
  //       localStorage.setItem("savedForms", JSON.stringify(persistentForms));
  //       return persistentForms
  //     case "update_forms":
  //       return [...action.Forms];
  //     default:
  //       throw new Error();
  //   }
  // };
  type ApiForm = {
    id?: number,
    title: string,
    description?: string,
    is_public?: boolean,
    created_by?: number,
    created_date?: string,
    modified_date?: string
  }
  //const [Forms, dispatch] = useReducer(reducer, InitialForms());
  const [Forms, setForms] = useState<ApiForm[]>();
  //const [Forms, setForms] = useState<formData[]>(InitialForms);
  // const [selectedForm, setSelectedForm] = useState<ApiForm>({
  //   title: "untitled",
  // });
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
  const getForms = async () => {
    let response = await customRequest("forms/", "GET", {})
    await setForms(response.results);
    console.log(response);
  }
  useEffect(() => {
    getForms();
  }, []);
  return (<>
    {Forms && (Forms.map((form: ApiForm) => {
      return (<>
        <div key={form.id}>
          {form.title}
          <button onClick={() => {

          }}
            className="flex-right rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
          >Open</button>
        </div>
      </>)
    }))}
    <div className="flex">

    <button
      onClick={() => navigate("/")}
      className="m-1 rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
      >
      Home
    </button>
    <button
      onClick={() => navigate("/createapiform")}
      className="m-1 rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
      >
      Add Form
    </button>
      </div>
    {!Forms && (<div>no forms</div>)}
  </>)
}
