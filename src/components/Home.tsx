import React from "react";
import logo from "../logo.svg";

export function Home(props: any) {
  return (
    <div>
      <div className="flex ">
        <img className="h-48" src={logo} />
        <div className="flex flex-1 items-center justify-center">
          <p>Welcome to the Home page!</p>
        </div>
      </div>
      <button
        onClick={props.openFormCB}
        className="w-full rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
      >
        Open Form
      </button>
    </div>
  );
}
