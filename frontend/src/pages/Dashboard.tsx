import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { Todos } from "../components/Todos";
import { InputBoxD } from "../components/InputBoxD";
import { ButtonD } from "../components/ButtonD";

export const Dashboard = ()=>{

    const[todo, setTodo]=useState("");
    const[description, setDescription]
    =useState("");
    const userId = localStorage.getItem("id")
    const[userdata, setUserdata]=useState("");
    const id =userId?parseInt(userId,10):0
    useEffect(()=>{
        async function fetchData() {
            const response = await axios.post("http://localhost:3000/api/v1/user/getuser", {
                id
            })
            setUserdata(response.data.firstName)
        }
        fetchData()
    },[id])

    return(
        <div className="h-screen bg-brown">
            <div className="pb-4">
                <Appbar label={userdata}></Appbar>
            </div>
            <div className="pt-3 pb-4">
                <div>
                    <InputBoxD onChange={(e:any)=>{
                        setTodo(e.target.value)
                    }} placeholder="New todo" Label={"Todo"}/>
                    <InputBoxD onChange={(e:any)=>{
                        setDescription(e.target.value)
                    }} placeholder = "Description" Label={"Description"}/>
                </div>
                <div className="text-center pt-7">
                    <ButtonD onClick = {async()=>{
                        await axios.post("http://localhost:3000/api/v1/todo/add", {
                            title:todo,
                            description,
                            userId:id
                        })
                    }} Label={"ADD"} /> 
                </div>
            </div>
            
            <div className="pb-3 pt-4">
                <Todos/>
            </div> 
        </div>
        
    )
}