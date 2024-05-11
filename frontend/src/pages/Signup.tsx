import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";


export const Signup = ()=>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading Label = {"Sign up"}/>
                
            </div>
        </div>
    </div>
}