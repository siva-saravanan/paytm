import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const Balance = () =>{

    const [balance , setbalance ] = useState(0) ;  
    const navigate =useNavigate() ;
    useEffect(()=>{
            const balancefetcher  = async()=>{
                const response = await axios.get( "http://localhost:3000/api/v1/account/balance", 
                    {
                       headers : {
                        Authorization : "Bearer "+localStorage.getItem("token")
                }})
                console.log(response.data);
                setbalance(response.data.balance.toFixed(2)) ; 
            }
            balancefetcher() ;
        
      
           
        
         
    },[])
    return <div className="flex text-xl font-semibold gap-4 p-4">
        <div className="text-gray-600">
            Your Balance is 
        </div>
        <div>
            Rs {balance}
        </div>

    </div>
}