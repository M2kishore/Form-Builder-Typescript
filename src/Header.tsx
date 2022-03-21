import React from "react";
import logo from "./logo.svg";

export default function Header(props: any) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={logo}
        className="h-16 w-16 animate-spin"
        alt="logo"
        style={{ animation: "spin 2s linear inifinite" }}
      />
      <h1 className="flex-1 text-center text-xl">{props.title}</h1>
    </div>
  );
}
