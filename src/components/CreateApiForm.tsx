import { navigate } from "raviger";
import { useState } from "react";
import { customRequest } from "./auth/Api";

export default function CreateApiForm(){
    const [title,setTitle] = useState<string>("");
    const [description,setDescription] = useState<string>("");
    //const [isPublic,setIsPublic] = useState<boolean>(false);
    const handleSubmit=()=>{
        customRequest("forms/","POST",{title,description}).then(response=>{
            console.log(response);
            navigate("/apiform");
        }).catch((error)=> {throw Error(error)});
    }
    return(<>
        <div className="relative z-0 mb-6 group">
        <input type="text" name="floating_title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e)=>setTitle(e.target.value)}/>
        <label htmlFor="floating_title" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
      </div>
      <div className="relative z-0 mb-6 group">
        <input type="text" name="floating_description" id="floating_description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" onChange={(e)=>setDescription(e.target.value)}/>
        <label htmlFor="floating_description" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Submit</button>
      </>)
}