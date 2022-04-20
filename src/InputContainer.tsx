import React, { useState } from "react";

export default function InputContainer(props:any) {
  const [type,setType] = useState<string>(props.type);
  const [value,setValue] = useState<string>(props.label)
  const [selectOption,setSelectOption] = useState<string>("")
  return (
    <>
      {props.type !== "radio" && props.type !== "multiselect" &&(<div className="flex">
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
      </div>)}
      {props.type === "radio" && (<>Radio<div className="flex">
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
        <div className="flex">
        <input
          type="text"
          className="my-2 w-full flex-1 rounded-lg border-2 border-gray-200 p-2"
          value={selectOption}
          onChange={(e) => {
            setSelectOption(e.target.value);
          }}
        /><button
        onClick={(_) => {props.updateOptionsCB(props.id,[...props.options,selectOption]);
        setSelectOption("")}}
        className="m-1 rounded-xl bg-blue-500 px-2 text-white hover:bg-blue-700"
      >
        Add Item
      </button></div>{props.options.map((option:string,optionId:number)=>{
        return (<div>{option}<button
          onClick={(e)=>{
            let neededOptions = props.options.filter((thisOption:string,id:number)=>{return optionId !== id});
            props.updateOptionsCB(props.id,[...neededOptions]);
        }}
          className="m-1 rounded-xl bg-red-500 px-2 text-white hover:bg-red-700"
        >
          Remove
        </button></div>)
      })}</>)}
      {props.type === "multiselect" && (<>Multiselect<div className="flex">
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
        <div className="flex">
        <input
          type="text"
          className="my-2 w-full flex-1 rounded-lg border-2 border-gray-200 p-2"
          value={selectOption}
          onChange={(e) => {
            setSelectOption(e.target.value);
          }}
        /><button
        onClick={(_) => {props.updateOptionsCB(props.id,[...props.options,selectOption]);
        setSelectOption("")}}
        className="m-1 rounded-xl bg-blue-500 px-2 text-white hover:bg-blue-700"
      >
        Add Item
      </button></div>{props.options.map((option:string,optionId:number)=>{
        return (<div key={optionId}>{option}<button
          onClick={(e)=>{
            let neededOptions = props.options.filter((thisOption:string,id:number)=>{return optionId !== id});
            props.updateOptionsCB(props.id,[...neededOptions]);
        }}
          className="m-1 rounded-xl bg-red-500 px-2 text-white hover:bg-red-700"
        >
          Remove
        </button></div>)
      })}</>)}
    </>
  );
}
