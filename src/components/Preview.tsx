import React, { useState } from "react";
import { formData } from "./Form";
export default function Preview(props: { formId: number }) {
    const InitialState: () => formData = () => {
        const AllForms = localStorage.getItem("savedForms");
        const persistentForms: formData[] = AllForms ? JSON.parse(AllForms) : [];
        const currentForm = persistentForms.filter((form: formData) => {
            return form.id === props.formId;
        })
        return currentForm[0];
    }
    const [state, setState] = useState<formData>(InitialState());
    const [answer, setAnswer] = useState<string>("");
    const [index, setIndex] = useState<number>(0);
    const [result, setResult] = useState<any[]>([])
    const [checkboxOptions, setCheckboxOptions] = useState<string[]>([])
    const handleInputChange = (event: any) => {
        console.log(event.target.value);
        setAnswer(event.target.value);
    };
    const handleCheckboxChange = (event: any) => {
        let newArray = [...checkboxOptions, event.target.value];
        if (checkboxOptions.includes(event.target.value)) {
            newArray = newArray.filter(day => day !== event.target.value);
        }
        setCheckboxOptions(newArray);
    };
    return (<div>
        {state.formFields.length === 0 && (<div>No fileds</div>)}
        {index !== state.formFields.length && (<div><p className="text-xs">{index + 1}/{state.formFields.length} fields</p><label>{state.formFields[index].label}</label><div className="flex">
            {state.formFields[index].type === "text" && (<div><input
                type={state.formFields[index].type}
                className="my-2 w-full flex-1 rounded-lg border-2 border-gray-200 p-2"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)} />
                <button
                    onClick={() => {
                        setIndex(index + 1);
                        setResult([...result, answer]);
                        setAnswer("")
                    }}
                    className="m-2 rounded-xl bg-blue-500 px-2 text-white hover:bg-blue-700"
                >
                    Next
                </button>
            </div>)}

            {state.formFields[index].type === "radio" && (<>{
                state.formFields[index].options.map((option: string, optionIndex: number) => {
                    return (<div>{option}<input
                        type="radio"
                        name={state.formFields[index].label}
                        className="my-2 w-full flex-1 rounded-lg border-2 border-gray-200 p-2"
                        value={option}
                        onChange={handleInputChange}
                        checked={option === answer} />
                    </div>)
                })}
                <button
                    onClick={() => {
                        setIndex(index + 1);
                        setResult([...result, answer]);
                        setAnswer("")
                    }}
                    className="m-2 rounded-xl bg-blue-500 px-2 text-white hover:bg-blue-700"
                >
                    Next
                </button>
            </>)}

            {/* {state.formFields[index].type === "multiselect" && (<>{state.formFields[index].options.map((option: string) => {
                return (<div>{option}<input
                    type="checkbox"
                    className="my-2 w-full flex-1 rounded-lg border-2 border-gray-200 p-2"
                    value={option}
                    onChange={handleCheckboxChange} />

                </div>)
            })}

                <button
                    onClick={() => {
                        setIndex(index + 1);
                        setResult([...result, checkboxOptions]);
                        setAnswer("")
                        setCheckboxOptions([]);
                    }}
                    className="m-2 rounded-xl bg-blue-500 px-2 text-white hover:bg-blue-700"
                >
                    Next
                </button>
            </>)} */}
            {state.formFields[index].type === "multiselect" && (<>
                <select
                    className="block w-full bg-slate-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none"
                    id={state.formFields[index].id.toString()}
                    name={state.formFields[index].label}
                    value="select"
                    onChange={(e) => {
                        setCheckboxOptions(
                            [...Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                            )]
                        )
                    }}
                    multiple={true}
                >
                    {state.formFields[index].options.map((option:string)=>{
                        return(<option key={option} value={option}>{option}</option>)
                    })}
                </select>
                {state.formFields[index].options.map((option: string) => {
                    return (<div></div>)
                })}

                <button
                    onClick={() => {
                        setIndex(index + 1);
                        setResult([...result, checkboxOptions]);
                        setAnswer("")
                        setCheckboxOptions([]);
                    }}
                    className="m-2 rounded-xl bg-blue-500 px-2 text-white hover:bg-blue-700"
                >
                    Next
                </button>
            </>)}
            {state.formFields[index].type === "dropdown" && (<>
                <select
                    className="block w-full bg-slate-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none"
                    id={state.formFields[index].id.toString()}
                    name={state.formFields[index].label}
                    value="select"
                    onChange={(e) => {
                        setAnswer(e.target.value)
                    }}
                    multiple
                >
                    {state.formFields[index].options.map((option:string)=>{
                        return(<option key={option} value={option}>{option}</option>)
                    })}
                </select>
                {state.formFields[index].options.map((option: string) => {
                    return (<div></div>)
                })}

                <button
                    onClick={() => {
                        setIndex(index + 1);
                        setResult([...result, answer]);
                        setAnswer("")
                        setCheckboxOptions([]);
                    }}
                    className="m-2 rounded-xl bg-blue-500 px-2 text-white hover:bg-blue-700"
                >
                    Next
                </button>
            </>)}
        </div></div>)}

        {index === state.formFields.length && (state.formFields.length !== 0) && (<>The result is
            {console.log(result)}
            {result.map((res, index) => {
                if (Array.isArray(res)) {
                    return (<div className="flex m-4">{res.map((secondResult: string, secondIndex: number) => {
                        return (<div className="mx-4">{secondResult} </div>)
                    })}</div>)
                }
                return (<div>{res}</div>)
            })}</>)}
    </div>)
} 