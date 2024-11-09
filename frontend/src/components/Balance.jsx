export const Balance = ({balance}) =>{
    return <div className="flex text-xl font-semibold gap-4 p-4">
        <div className="text-gray-600">
            Your Balance is 
        </div>
        <div>
            Rs {balance}
        </div>

    </div>
}