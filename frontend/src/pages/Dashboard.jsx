import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar"  ; 
import { Balance } from "../components/Balance" ; 
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard =() =>{


    return <div className="divide-y-2">
        <Appbar user = "siva"></Appbar>
        <Balance balance= {"500000"}></Balance>
        <Users ></Users>
    </div>
}