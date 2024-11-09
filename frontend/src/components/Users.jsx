import axios from "axios"
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const Users = ()=>{
    const [users ,setUsers] =  useState([]) ; 
    const [filter , setFilter] = useState("") ; 
   const token = localStorage.getItem("token") ; 
    useEffect(()=>{
        const fetchdata = async()=>{
        const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter ,{
            headers:{
                Authorization :`Bearer ${token}`
            }
        }) ;
        setUsers(response.data.User) ; 
        }

        fetchdata() ;

        
    } ,[filter]) ; 






    return <div className="flex flex-col gap-4 p-4">
     
        <div className="font-semibold ">
            Users
        </div>
        <input onChange={(e)=>{
            setFilter(e.target.value) ; 
        }} placeholder="search users..."  className="w-full p-2 pl-4 border border-gray-300 shadow-sm"></input>
        <div className="flex flex-col gap-3">
        {users.map((user)=>{
           
           return<User user={user}></User>

            
        })}
        </div>
        
    </div>

}


function User ({user}){
    const navigate = useNavigate() ; 
    return (<div className="flex justify-between">
                <div className="flex gap-3 justify-center items-center font-semibold text-lg" >
                    <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-200 ">
                    {user.firstName ? user.firstName[0].toUpperCase() : "?"}
                    </div>
                    <div >
                        {user.firstName}
                    </div>

                </div>
                <div>
                    <button onClick={()=>{
                            navigate("/sendmoney?id="+user.id+ "&name=" + user.firstName)
                    }} className="bg-black p-2 rounded-md text-white text-sm font-normal ">Send Money</button>
                </div>
            </div>);
}