import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin = ()=>{
    return <div className="bg-slate-400 h-screen flex justify-center items-center">
        <div className="flex flex-col items-center ">
            <div className="bg-white rounded-lg w-80 p-5 h-max  px-4">
                <Heading label="Sign in"></Heading>
                <SubHeading label="Enter your creadentials to acess your account "></SubHeading>
                <InputBox title ="Email" placeholder="Johndev@gmail.com"></InputBox>
                <InputBox title ="password" placeholder="John52757"></InputBox>
                <Button label="sign up"></Button>
                <BottomWarning content="create an account by" to="/signup" buttontext="Signup"></BottomWarning>
            </div>
           
        </div>
        
    </div>
}