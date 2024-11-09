import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = ()=>{
const [firstName , SetFirstName] = useState("") ;
const [lastName , SetLastName] = useState("") ;
const [username , setusername] = useState("") ;
const [password , setPassword] = useState("") ;
const token  = localStorage.getItem("token") ; 
const navigate  = useNavigate() ; 
    return <div className="bg-slate-400 h-screen flex justify-center items-center">
        <div className="flex flex-col items-center ">
            <div className="bg-white rounded-lg w-80 p-5 h-max  px-4">
                <Heading label="Sign up"></Heading>
                <SubHeading label="Enter your account information"></SubHeading>
                <InputBox title ="First name " placeholder="John" onChange={e=>{
                    SetFirstName(e.target.value)
                }} ></InputBox>
                <InputBox title ="Last name " placeholder="Doe" onChange={e=>{
                    SetLastName(e.target.value)
                }}></InputBox>
                <InputBox title ="username" placeholder={"Johndev@gmail.com"} onChange={e=>{
                    setusername(e.target.value)
                }}></InputBox>
                <InputBox title ="password" placeholder={"John52757"} 
                onChange={e=>{
                    setPassword(e.target.value)
                }}></InputBox>
                <Button onPress = { async()=>{
                        const response =  await axios.post("http://localhost:3000/api/v1/user/signup" ,{
                            firstName ,
                            lastName ,
                            username ,
                            password
    
                        })
                        
                        if(token){
                            localStorage.removeItem(token) ; 
                        }
                        localStorage.setItem("token" , response.data.token) ; 
                        navigate("/dashboard")  ;
                        
                    }
                }
                     label="sign up"></Button>
                <BottomWarning content="already have an account ?" to="/signin" buttontext="Signin"></BottomWarning>
            </div>
           
        </div>
        
    </div>
}