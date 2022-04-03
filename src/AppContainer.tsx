import React from "react";
import Header from "./Header";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen items-center bg-gray-100">
      <div className="mx-auto rounded-xl bg-white p-4 shadow-lg">
        <Header title="Welcome to Lesson 5 of $react-typescript with #tailwindcss" />
        {props.children}
      </div>
    </div>
  );
}
