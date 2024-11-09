import { Link } from "react-router-dom"
export const BottomWarning = ({content , to , buttontext }) =>{
    return <div className="flex gap-5 items-center text-center justify-center  ">
        <div className="font-semibold text-black pl-2">
            {content}
        </div>
        <Link className="pointer underline underline-offset-1 cursor-pointer " to={to}>
        {buttontext}
        </Link>
    </div>
}