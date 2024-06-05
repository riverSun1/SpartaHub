import React, { useState } from 'react'
import supabase from '../../supabaseClient'
const FecthData = () => {
    const [userDate, setUserDate] = useState([])
    const fetchData = async()=>{
        const {data, error} = await supabase.from("noticeboard").select("*")
        if(error){
            console.log("select_error", error)
        }else{
            alert("select정상")
            setUserDate(data)
            console.log(userDate)

        }
    }
    return fetchData();
    }


export default FecthData
