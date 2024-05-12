import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";


export const Signup = ()=>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    return <div className="bg-cover bg-hero2 h-screen flex justify-center ">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-brown w-80 text-center p-2 h-max px-4 bg-opacity-30">
                <Heading Label={"Sign Up"}/>
                <SubHeading label={"Enter your infromation to create an account"}/>
                <InputBox onChange={(e:any) => {
                    setFirstName(e.target.value);
                }} placeholder="firstName" Label={"First Name"}/>
                <InputBox onChange={(e:any)=>{
                    setLastName(e.target.value)
                }} placeholder="lastName" Label={"Last Name"}/>
                <InputBox onChange={(e:any)=>{
                    setUsername(e.target.value)
                }} placeholder="abc@email.com" Label={"Email"}/>
                <InputBox onChange={(e:any)=>{
                    setPassword(e.target.value)
                }} placeholder="123abc" Label={"Password"}/>
                <div className="pt-4">
                    <Button onClick={async()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("id", response.data.id)
                        navigate("/dashboard")
                    }} Label={"Sign up"}/>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}