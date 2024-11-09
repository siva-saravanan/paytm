export const InputBox =({title , placeholder , onChange}) =>{
    return <div>
        <div className="font-semibold text-black pb-2">{title}</div> 
        <div className="border-black">
              <input onChange={onChange} placeholder={placeholder} className="rounded-md w-full pl-2 pb-2 border border-gray-400 shadow-sm"></input>
        </div>
    </div>
}