import React, { useState } from "react";

export default function InputContainer(props:any) {
  const [type,setType] = useState<string>(props.type);
  const [value,setValue] = useState<string>(props.label)
  return (
    <>
      <div className="flex">
        <input
          type="text"
          className="my-2 w-full flex-1 rounded-lg border-2 border-gray-200 p-2"
          defaultValue={value}
          onChange={(e) => {
            setValue(e.target.value);
            props.updateValueCB(props.id, e.target.value);
          }}
        />
        <input
          type="text"
          className="my-2 w-full flex-1 rounded-lg border-2 border-gray-200 p-2"
          value={type}
          onChange={(e) => {
            props.updateValueCB(props.id, e.target.value);
          }}
        />
        <button
          onClick={(_) => props.removeFieldCB(props.id)}
          className="m-1 rounded-xl bg-blue-500 px-2 text-white hover:bg-blue-700"
        >
          Remove
        </button>
      </div>
    </>
  );
}
