import React,{useState} from "react";
import { formData } from "./Form";
export default function Preview(props:{formId:number}){
    const InitialState:()=>formData = ()=>{
        const AllForms = localStorage.getItem("savedForms");
        const persistentForms:formData[] = AllForms ? JSON.parse(AllForms) : [];
        const currentForm = persistentForms.filter((form:formData)=>{
            return form.id === props.formId;
        })
        return currentForm[0];
    }
    const [state,setState] = useState<formData>(InitialState());
    const [answer,setAnswer] = useState<string>("");
    const [i,setI]=useState<number>(0);
    const [result,setResult] = useState<string[]>([])
    return (<div>
        {i!==state.formFields.length && (<><label>{state.formFields[i].label}</label><div className="flex">
            <input
                type={state.formFields[i].type}
                className="my-2 w-full flex-1 rounded-lg border-2 border-gray-200 p-2"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)} />
            <button
                onClick={() => {setI(i+1);
                     setResult([...result,answer]); 
                     setAnswer("") } }
                className="m-2 rounded-xl bg-blue-500 px-2 text-white hover:bg-blue-700"
            >
                Next
            </button>
        </div></>)}
        {i===state.formFields.length && (<>The result is {result.map(res=>{return(<div>{res}</div>)})}</>)}
      </div>)
}