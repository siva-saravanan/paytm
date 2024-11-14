import { useState } from "react"

import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = ()=>{
    const [username , setusername ] =  useState("") ; 
    const [password , setPassword] =  useState("")  ; 
    const navigate  = useNavigate() ; 

    return <div className="bg-slate-400 h-screen flex justify-center items-center">
        <div className="flex flex-col items-center ">
            <div className="bg-white rounded-lg w-80 p-5 h-max  px-4">
                <Heading label="Sign in"></Heading>
                <SubHeading label="Enter your creadentials to acess your account "></SubHeading>
                <InputBox 
                onChange={(e)=>{
                    setusername(e.target.value) ; 
                }}
                title ="Email" placeholder="Johndev@gmail.com"></InputBox>
                <InputBox 
                 onChange={(e)=>{
                    setPassword(e.target.value) ; 
                }}
                title ="password" placeholder="John52757"></InputBox>
                <Button 
                onPress={async ()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signin" , {
                    username :username   ,
                    password : password
                }) ;
                if(localStorage.getItem("token")){
                    localStorage.removeItem(token) ; 
                }
                const token =  response.data.token  ; 
                localStorage.setItem("token" , token)  ; 
                
                navigate("/dashboard")  ;

 
                
                }}
                label="sign in"></Button>
                <BottomWarning content="create an account by" to="/signup" buttontext="Signup"></BottomWarning>
            </div>
           
        </div>
        
    </div>
}