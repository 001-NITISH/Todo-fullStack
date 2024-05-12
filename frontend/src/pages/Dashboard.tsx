import { useState } from "react"
import { Appbar } from "../components/Appbar"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from "axios";

export const Dashboard = ()=>{

    const[todo, setTodo]=useState("");
    const[description, setDescription]
    =useState("");
    const userId = localStorage.getItem("userId", )

    return(
        <div>
            <Appbar></Appbar>
            <div className="flex justify-center">
            <InputBox onChange={(e:any)=>{
                setTodo(e.target.value)
            }} placeholder="New todo" Label={"Todo"}/>
            <InputBox onChange={(e:any)=>{
                setDescription(e.target.value)
            }} placeholder = "Description" Label={"Description"}/>
            <Button onClick={async ()=>{
               await axios.post("http://localhost:3000/api/v1/todo/add", {
                    todo,
                    description,
                    userId
                });
            }}label={"Add todo"}/>
            </div> 
        </div>
        
    )
}