import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const Appbar = ()=>{
    const [user, setuser ]  =useState("siva") ; 

    const navigate =  useNavigate()  ; 
    useEffect(()=>{
        const userfunction = async()=>{
            const response = await axios.get("http://localhost:3000/api/v1/user/me" ,  
            {
                headers : { 
                    Authorization : "Bearer " + localStorage.getItem("token")
                }

            })
            setuser(response.data.firstName) ; 
        }
        userfunction() ;  
    } , [])
    return <div className="flex justify-between p-4">
        <div className="font-semibold text-xl">
            Payments App
        </div>
        <div className="flex gap-3 items-center ">
            <div>Hello , {user}</div>
            <div className=" flex bg-slate-400 font-semibold text-lg rounded-full h-9 w-9 justify-center items-center">{user[0].toUpperCase()}</div>
            <button onClick={()=>{
                localStorage.removeItem("token"); 
                navigate("/signin") ;


            }}>
                <div className="flex items-center justify-center gap-2 bg-slate-400 rounded-md p-1 px-2 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg> 
                    <div>
                        Log Out
                    </div>

                </div>
            </button>
            
        </div>

    </div>
}