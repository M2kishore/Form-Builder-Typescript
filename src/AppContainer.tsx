import React from "react";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen items-center bg-gray-100">
      {props.children}
    </div>
  );
}
