import React from "react";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="grid place-items-center h-screen bg-gray-100">
      {props.children}
    </div>
  );
}
