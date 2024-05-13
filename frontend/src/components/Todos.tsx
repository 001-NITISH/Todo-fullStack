import { useEffect, useState } from "react";
import { Todo } from "./Todo";
import axios from "axios";


export function Todos() {

    interface param{
        title:string,
        description:string;
        done:boolean;
    }
    const arr:param[]= [{
        title:"",
        description:"",
        done:false
    }]

    const data = localStorage.getItem("id");
    const userId = data?parseInt(data,10):1;
    const[todos, setTodos]= useState(arr)


    useEffect(()=>{
        async function fetchTodo() {
            const response = await axios.post("http://localhost:3000/api/v1/todo/gettodo",{
                userId:userId
            })
            setTodos(response.data)
        }
        fetchTodo()
    },[userId, todos])

    return (
        <div className="pt-5 pl-1 pr-1">
            {todos.map(it=>{
                return<Todo title={it.title} description={it.description} done={it.done}/>
            })}
      </div>
    )
}