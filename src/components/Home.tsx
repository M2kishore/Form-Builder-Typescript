import React from "react";
import logo from "../logo.svg";
import { login } from "./auth/Api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "raviger";

export function Home(props: any) {
  const notify = () => toast("Wow so easy!");
  return (
    <>
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
      <Link href="/apiform">
      <button
        // onClick={async () => { let result = await login("kishore", "kishore7KISHORE"); console.log(result); alert(result.token); } }
        className="w-full my-1 rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
        >
        Api Form
      </button></Link><button
        onClick={notify}
        className="w-full my-1 rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-700"
      >
        Toast message from npm package
      </button><ToastContainer /></>
  );
}
