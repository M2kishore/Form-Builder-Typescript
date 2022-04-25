import React from "react";
import logo from "../logo.svg";
import { login } from "./auth/Api";

export function Home(props: any) {
  return (
    <div>
      <div className="flex ">
        <img className="h-48" src={logo} alt="logo" />
        <div className="flex flex-1 items-center justify-center">
          <p>Welcome to the Home page!</p>
        </div>
      </div>
      <button
        onClick={props.openFormListCB}
        className="w-full rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
      >
        Open Form
      </button>
      <button
        onClick={async()=>{let result = await login("kishore","kishore7KISHORE");console.log(result);alert(result.token);}}
        className="w-full my-1 rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
      >
        Api call
      </button>
    </div>
  );
}
