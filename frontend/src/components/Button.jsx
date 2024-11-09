export const Button = ({label ,onPress }) =>{
    return <div className="flex justify-center pt-2">
        <button onClick={onPress} className="bg-black text-white rounded-lg p-2 w-full mt-4">{label}</button>
    </div>
}