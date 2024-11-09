export const Appbar = ({user ,})=>{
    return <div className="flex justify-between p-4">
        <div className="font-semibold text-xl">
            Payments App
        </div>
        <div className="flex gap-3 items-center ">
            <div>Hello , {user}</div>
            <div className=" flex bg-slate-400 font-md text-lg rounded-full h-10 w-10 justify-center items-center">{user[0]}</div>
        </div>

    </div>
}