import React from "react";
import logo from "./logo.svg";
const FORM_ELEMENTS = [
  {
    id: 1,
    label: "First Name",
    type: "text",
  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
  },
  {
    id: 3,
    label: "Email",
    type: "email",
  },
  {
    id: 4,
    label: "Date of Birth",
    type: "date",
  },
];
export default function Header() {
  return (
    <div className="m-16 flex items-center h-screen gap-2">
      <div className="p-4 mx-auto flex-row bg-white shadow-lg rounded-xl">
        <img src={logo} className="w-20 h-20 animate-spin" alt="logo" />
        <h1 className="text-2xl">
          Welcome to Lesson 5 of $react-typescript with #tailwindcss
        </h1>
        <div>
          {FORM_ELEMENTS.map((element) => {
            return (
              <React.Fragment key={element.id}>
                <label>{element.label}</label>
                <input
                  className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                  type={element.type}
                />
              </React.Fragment>
            );
          })}
          <button className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
