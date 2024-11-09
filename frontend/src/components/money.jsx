import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

export const Money = ()=>{
    const [searchParams] =useSearchParams();
    const name  = searchParams.get("name") ; 
    const id = searchParams.get("id");
    const [amount ,setAmount] = useState("") ;
    const token  = localStorage.getItem("token") ; 
    const navigate  = useNavigate() ; 
    return <>
        <div className="bg-white flex flex-col gap-2 w-80 rounded-md p-6 shadow-xl">
                    <div className="font-bold text-2xl text-center pb-6">
                        Send Money 
                    </div>
                    <div className="flex items-center gap-4 pt-3
                    ">
                        <div className="flex items-center font-semibold justify-center w-10 h-10 rounded-full bg-green-500 text-white">
                            {name[0].toUpperCase()}
                        </div>
                        <div className="font-bold text-lg">
                            {name.toUpperCase()}
                        </div>

                    </div>
                    <div className="font-semibold text-xs">
                        Amount (in Rs)
                    </div>
                    <input onChange={(e)=>{
                        setAmount(e.target.value) ;
                    }}className="w-full p-1 border border-gray-200 "   placeholder="Enter amount">
                    </input>
                    <button onClick={async()=>{
                        await axios.post("http://localhost:3000/api/v1/account/transfer" ,{
                            to:id,
                            amount : amount

                        } ,{
                            headers : {
                                Authorization : "Bearer "+token   
                            }
                        })

                        navigate("/dashboard") ;



                    }} className="bg-green-500 rounded-md  p-1 text-white text-md">Intiate Transfer </button>
                </div>
    </>
}